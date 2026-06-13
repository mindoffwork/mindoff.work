"""
Submit new or changed sitemap URLs to Google Indexing API and IndexNow.

Reads:  SITEMAP_URL, SNAPSHOT_PATH, SITE_URL, INDEXING_API_URL, INDEXNOW_API_URL,
        MAX_URLS_PER_RUN, GOOGLE_INDEXING_SA_KEY (JSON string), INDEXNOW_KEY
Writes: SNAPSHOT_PATH (updated snapshot committed by the workflow step)
"""

import json
import os
import sys
import xml.etree.ElementTree as ET

import requests

# ---------------------------------------------------------------------------
# Config from environment
# ---------------------------------------------------------------------------
SITEMAP_URL = os.environ["SITEMAP_URL"]
SNAPSHOT_PATH = os.environ["SNAPSHOT_PATH"]
SITE_URL = os.environ["SITE_URL"].rstrip("/")
INDEXING_API_URL = os.environ["INDEXING_API_URL"]
INDEXNOW_API_URL = os.environ["INDEXNOW_API_URL"]
MAX_URLS = int(os.environ.get("MAX_URLS_PER_RUN", "200"))
SA_KEY_JSON = os.environ.get("GOOGLE_INDEXING_SA_KEY", "")
INDEXNOW_KEY = os.environ.get("INDEXNOW_KEY", "")

SITEMAP_NS = "http://www.sitemaps.org/schemas/sitemap/0.9"


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def fetch_sitemap(url: str) -> dict[str, str]:
    """Return {loc: lastmod} from the sitemap; lastmod is '' when absent."""
    print(f"Fetching sitemap: {url}")
    resp = requests.get(url, timeout=30)
    resp.raise_for_status()
    root = ET.fromstring(resp.text)
    entries: dict[str, str] = {}
    for url_el in root.findall(f"{{{SITEMAP_NS}}}url"):
        loc_el = url_el.find(f"{{{SITEMAP_NS}}}loc")
        mod_el = url_el.find(f"{{{SITEMAP_NS}}}lastmod")
        if loc_el is not None and loc_el.text:
            entries[loc_el.text.strip()] = (mod_el.text or "").strip() if mod_el is not None else ""
    print(f"  Found {len(entries)} URL(s) in sitemap.")
    return entries


def load_snapshot(path: str) -> dict[str, str]:
    if not os.path.exists(path):
        print("No existing snapshot — treating all URLs as new.")
        return {}
    with open(path, encoding="utf-8") as fh:
        return json.load(fh)


def save_snapshot(path: str, data: dict[str, str]) -> None:
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as fh:
        json.dump(data, fh, indent=2, sort_keys=True)
    print(f"Snapshot saved to {path}.")


def diff_urls(current: dict[str, str], snapshot: dict[str, str]) -> list[str]:
    changed = [
        loc for loc, mod in current.items()
        if snapshot.get(loc) != mod
    ]
    print(f"  {len(changed)} URL(s) changed or new since last snapshot.")
    return changed


# ---------------------------------------------------------------------------
# Google Indexing API
# ---------------------------------------------------------------------------

def google_access_token(sa_key_json: str) -> str | None:
    if not sa_key_json:
        print("WARNING: GOOGLE_INDEXING_SA_KEY is not set — skipping Google Indexing API.")
        return None
    try:
        import google.oauth2.service_account as sa
        import google.auth.transport.requests as ga_requests

        info = json.loads(sa_key_json)
        scopes = ["https://www.googleapis.com/auth/indexing"]
        creds = sa.Credentials.from_service_account_info(info, scopes=scopes)
        creds.refresh(ga_requests.Request())
        return creds.token
    except Exception as exc:
        print(f"WARNING: Could not obtain Google access token: {exc}")
        return None


def submit_google(urls: list[str], token: str) -> None:
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json",
    }
    for url in urls:
        payload = {"url": url, "type": "URL_UPDATED"}
        try:
            resp = requests.post(INDEXING_API_URL, json=payload, headers=headers, timeout=15)
            print(f"  [Google] {url} → {resp.status_code} {resp.text[:120]}")
        except Exception as exc:
            print(f"  [Google] {url} → ERROR: {exc}")


# ---------------------------------------------------------------------------
# IndexNow
# ---------------------------------------------------------------------------

def submit_indexnow(urls: list[str], key: str) -> None:
    if not key:
        print("WARNING: INDEXNOW_KEY is not set — skipping IndexNow.")
        return

    host = SITE_URL.removeprefix("https://").removeprefix("http://")
    payload = {
        "host": host,
        "key": key,
        "keyLocation": f"https://{host}/{key}.txt",
        "urlList": urls,
    }
    try:
        resp = requests.post(
            INDEXNOW_API_URL,
            json=payload,
            headers={"Content-Type": "application/json"},
            timeout=30,
        )
        print(f"  [IndexNow] batch of {len(urls)} URL(s) → {resp.status_code} {resp.text[:200]}")
    except Exception as exc:
        print(f"  [IndexNow] ERROR: {exc}")


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main() -> None:
    current = fetch_sitemap(SITEMAP_URL)
    snapshot = load_snapshot(SNAPSHOT_PATH)
    changed = diff_urls(current, snapshot)

    if not changed:
        print("Nothing to index — all URLs are up to date.")
        save_snapshot(SNAPSHOT_PATH, current)
        return

    if len(changed) > MAX_URLS:
        print(
            f"WARNING: {len(changed)} changed URLs exceed the cap of {MAX_URLS}. "
            f"Submitting first {MAX_URLS} only."
        )
        changed = changed[:MAX_URLS]

    # Google Indexing API
    token = google_access_token(SA_KEY_JSON)
    if token:
        print(f"Submitting {len(changed)} URL(s) to Google Indexing API…")
        submit_google(changed, token)

    # IndexNow
    print(f"Submitting {len(changed)} URL(s) to IndexNow…")
    submit_indexnow(changed, INDEXNOW_KEY)

    # Persist updated snapshot (includes ALL current URLs, not just changed ones)
    save_snapshot(SNAPSHOT_PATH, current)


if __name__ == "__main__":
    main()

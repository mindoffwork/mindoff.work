import { getAllNotes, getAllProjects } from "@/lib/content";
import { absolutePageUrl, siteDescription, siteUrl } from "@/lib/metadata";

export const dynamic = "force-static";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function getPostUrl(post: ReturnType<typeof getAllProjects>[number] | ReturnType<typeof getAllNotes>[number]) {
  const collection = "status" in post ? "projects" : "notes";

  return absolutePageUrl(`/${collection}/${post.slug}`);
}

export function GET() {
  const posts = [...getAllProjects(), ...getAllNotes()].sort(
    (first, second) =>
      new Date(second.date).getTime() - new Date(first.date).getTime(),
  );
  const items = posts
    .map((post) => {
      const url = getPostUrl(post);
      const categories = post.tags
        .map((tag) => `<category>${escapeXml(tag)}</category>`)
        .join("");

      return [
        "<item>",
        `<title>${escapeXml(post.title)}</title>`,
        `<link>${escapeXml(url)}</link>`,
        `<guid isPermaLink="true">${escapeXml(url)}</guid>`,
        `<pubDate>${new Date(post.date).toUTCString()}</pubDate>`,
        `<description>${escapeXml(post.summary)}</description>`,
        categories,
        "</item>",
      ].join("");
    })
    .join("");
  const feed = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>mindoff.work</title><link>${siteUrl}</link><description>${escapeXml(siteDescription)}</description><language>en</language>${items}</channel></rss>`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}

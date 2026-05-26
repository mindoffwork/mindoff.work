import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t-normal border-rule text-subtle">
      <div className="mx-auto flex w-full max-w-shell flex-col items-start justify-between gap-4 px-4 py-8 sm:flex-row sm:items-center sm:px-6">
        <p className="text-size-sm">&copy; {year} mindoff.work</p>
        <Link
          className="rounded-sm text-size-sm transition-colors duration-fast ease-standard hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rule"
          href="/rss.xml"
        >
          RSS
        </Link>
      </div>
    </footer>
  );
}

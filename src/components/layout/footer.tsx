import Image from "next/image";
import { SiteLink } from "@/components/ui/site-link";

const footerLinkClassName =
  "rounded-sm underline decoration-rule underline-offset-4 transition-colors duration-fast ease-standard hover:bg-nav-selection hover:text-ink focus-visible:bg-nav-selection focus-visible:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rule";
const githubUrl = "https://github.com/mindoffwork";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t-normal border-rule font-heading text-muted">
      <div className="mx-auto flex w-full max-w-shell flex-col gap-8 px-8 py-10 sm:px-6 sm:py-12">
        <SiteLink
          aria-label="mindoff.work home"
          className="mx-auto inline-flex rounded-sm opacity-50 transition-opacity duration-fast ease-standard hover:opacity-75 focus-visible:opacity-75 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rule"
          href="/"
        >
          <Image
            alt=""
            className="h-auto w-28 object-contain grayscale [[data-theme=dark]_&]:invert sm:w-32"
            height={731}
            loading="eager"
            sizes="(min-width: 640px) 8rem, 7rem"
            src="/images/brand/MindOff_Logo_Full.png"
            unoptimized
            width={1921}
          />
        </SiteLink>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-size-xs font-medium uppercase tracking-kicker">
          <p>&copy; {year} mindoff.work</p>
          <nav aria-label="Site information" className="contents">
            <SiteLink
              className={footerLinkClassName}
              href="/policy"
            >
              Terms &amp; Privacy
            </SiteLink>
            <a
              className={footerLinkClassName}
              href="/rss.xml"
            >
              RSS
            </a>
            <a
              className={footerLinkClassName}
              href={githubUrl}
              rel="noreferrer"
              target="_blank"
            >
              GitHub
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}

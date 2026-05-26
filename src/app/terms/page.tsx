import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";

export function generateMetadata(): Metadata {
  return createPageMetadata({
    title: "Terms | mindoff.work",
    description: "Terms for mindoff.work.",
    path: "/terms",
  });
}

export default function TermsPage() {
  return (
    <div className="mx-auto flex w-full max-w-shell flex-col gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
      <header className="flex max-w-reading flex-col gap-6">
        <p className="font-heading text-size-xs font-semibold uppercase tracking-kicker text-subtle">
          Terms
        </p>
        <h1 className="font-heading text-size-4xl font-semibold tracking-title">
          Simple terms for a simple site.
        </h1>
      </header>
      <div className="max-w-reading">
        <p className="text-size-base text-muted">
          This is placeholder terms content for mindoff.work. The site is
          published as a static personal archive and may change as the project
          matures.
        </p>
      </div>
    </div>
  );
}

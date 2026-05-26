import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";

export function generateMetadata(): Metadata {
  return createPageMetadata({
    title: "About | mindoff.work",
    description: "About mindoff.work.",
    path: "/about",
  });
}

export default function AboutPage() {
  return (
    <div className="mx-auto flex w-full max-w-shell flex-col gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
      <header className="flex max-w-reading flex-col gap-6">
        <p className="font-heading text-size-xs font-semibold uppercase tracking-kicker text-subtle">
          About
        </p>
        <h1 className="font-heading text-size-4xl font-semibold tracking-title">
          A small personal collection of projects on the web.
        </h1>
      </header>
      <div className="max-w-reading">
        <p className="text-size-base text-muted">
          mindoff.work is a quiet place for project notes, essays, snapshots,
          and working records. This page is a placeholder while the site takes
          shape.
        </p>
      </div>
    </div>
  );
}

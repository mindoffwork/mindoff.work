import type { Metadata } from "next";
import Link from "next/link";
import { PostCard } from "@/components/ui/post-card";
import { getAllNotes, getAllWorkshops } from "@/lib/content";
import { createPageMetadata } from "@/lib/metadata";

export function generateMetadata(): Metadata {
  return createPageMetadata({
    title: "mindoff.work",
    description: "Workshop notes, essays, and snapshots from mindoff.work.",
    path: "/",
  });
}

export default function Home() {
  const workshops = getAllWorkshops().slice(0, 3);
  const notes = getAllNotes().slice(0, 3);

  return (
    <div className="mx-auto flex w-full max-w-shell flex-col gap-16 px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
      <section
        className="flex max-w-reading flex-col gap-6"
        aria-labelledby="home-title"
      >
        <p className="font-heading text-size-xs font-semibold uppercase tracking-kicker text-subtle">
          mindoff.work
        </p>
        <h1
          className="font-heading text-size-4xl font-semibold tracking-title text-ink"
          id="home-title"
        >
          Workshop notes, essays, and small observations.
        </h1>
        <p className="font-heading text-size-lg text-muted">
          A personal index of things made, noticed, refined, and occasionally
          abandoned with notes still attached.
        </p>
      </section>

      <section className="flex flex-col gap-6" aria-labelledby="latest-workshop">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-heading text-size-2xl font-semibold tracking-title" id="latest-workshop">
            Latest Workshop
          </h2>
          <Link
            className="rounded-sm text-size-sm text-muted transition-colors duration-fast ease-standard hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rule"
            href="/workshop"
          >
            View all
          </Link>
        </div>
        <div className="divide-y-normal divide-rule border-t-normal border-rule">
          {workshops.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-6" aria-labelledby="latest-notes">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-heading text-size-2xl font-semibold tracking-title" id="latest-notes">
            Latest Notes
          </h2>
          <Link
            className="rounded-sm text-size-sm text-muted transition-colors duration-fast ease-standard hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rule"
            href="/notes"
          >
            View all
          </Link>
        </div>
        <div className="divide-y-normal divide-rule border-t-normal border-rule">
          {notes.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}

import type { Metadata } from "next";
import { PostCard } from "@/components/ui/post-card";
import { getAllNotes } from "@/lib/content";
import { createPageMetadata } from "@/lib/metadata";

export function generateMetadata(): Metadata {
  return createPageMetadata({
    title: "Notes | mindoff.work",
    description: "Essays and snapshots from mindoff.work.",
    path: "/notes",
  });
}

export default function NotesPage() {
  const posts = getAllNotes();

  return (
    <div className="mx-auto flex w-full max-w-shell flex-col gap-12 px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
      <header className="flex max-w-reading flex-col gap-6">
        <p className="font-heading text-size-xs font-semibold uppercase tracking-kicker text-subtle">
          Notes
        </p>
        <h1 className="font-heading text-size-4xl font-semibold tracking-title">
          Essays and snapshots.
        </h1>
        <p className="font-heading text-size-lg text-muted">
          Short records of process, place, attention, and useful friction.
        </p>
      </header>
      <div className="divide-y-normal divide-rule border-t-normal border-rule">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}

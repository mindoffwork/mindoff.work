import type { Metadata } from "next";
import { NoteCard } from "@/components/ui/note-card";
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
    <div className="flex flex-col gap-16 px-4 py-12 sm:px-6 sm:py-16 lg:gap-24 lg:py-28">
      <header className="mx-auto flex w-full max-w-4xl flex-col items-start gap-8 lg:flex-row">
        <h1 className="font-body text-size-2xl font-bold tracking-title text-ink sm:text-size-3xl lg:w-1/3 lg:shrink-0">
          Notes
        </h1>
        <p className="max-w-reading font-heading text-size-base font-light text-ink sm:text-size-lg lg:flex-1">
          Knowledge and wisdom on craft, attention, and creative process.
          Written for those who find meaning in focus and purpose.
        </p>
      </header>
      <section
        aria-label="Notes"
        className="mx-auto grid w-full max-w-6xl auto-rows-fr grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {posts.map((post) => (
          <NoteCard key={post.slug} post={post} />
        ))}
      </section>
    </div>
  );
}

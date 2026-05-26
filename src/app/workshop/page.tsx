import type { Metadata } from "next";
import { PostCard } from "@/components/ui/post-card";
import { getAllWorkshops } from "@/lib/content";
import { createPageMetadata } from "@/lib/metadata";

export function generateMetadata(): Metadata {
  return createPageMetadata({
    title: "Workshop | mindoff.work",
    description: "Software and hardware projects from mindoff.work.",
    path: "/workshop",
  });
}

export default function WorkshopPage() {
  const posts = getAllWorkshops();

  return (
    <div className="mx-auto flex w-full max-w-shell flex-col gap-12 px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
      <header className="flex max-w-reading flex-col gap-6">
        <p className="font-heading text-size-xs font-semibold uppercase tracking-kicker text-subtle">
          Workshop
        </p>
        <h1 className="font-heading text-size-4xl font-semibold tracking-title">
          Projects and build notes.
        </h1>
        <p className="font-heading text-size-lg text-muted">
          Software, hardware, experiments, and the decisions that shaped them.
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

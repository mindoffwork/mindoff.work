import type { Metadata } from "next";
import { PostCard } from "@/components/ui/post-card";
import { getAllNotes, getAllProjects, getAllTags } from "@/lib/content";
import { createPageMetadata, siteTitle } from "@/lib/metadata";

type TagPageProps = {
  params: Promise<{
    tag: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllTags().map((tag) => ({
    tag: encodeURIComponent(tag),
  }));
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);

  return createPageMetadata({
    title: `${decodedTag} | ${siteTitle}`,
    description: `Posts tagged ${decodedTag} on mindoff.work.`,
    path: `/tags/${encodeURIComponent(decodedTag)}`,
  });
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const posts = [...getAllProjects(), ...getAllNotes()]
    .filter((post) => post.tags.includes(decodedTag))
    .sort(
      (first, second) =>
        new Date(second.date).getTime() - new Date(first.date).getTime(),
  );

  return (
    <div className="mx-auto flex w-full max-w-shell flex-col gap-12 px-8 py-12 sm:px-6 sm:py-16 lg:py-20">
      <header className="flex max-w-reading flex-col gap-6">
        <p className="font-heading text-size-xs font-semibold uppercase tracking-kicker text-subtle">
          Tag
        </p>
        <h1 className="font-heading text-size-4xl font-semibold tracking-title">
          {decodedTag}
        </h1>
        <p className="font-heading text-size-lg text-muted">Posts collected under this tag.</p>
      </header>
      <div className="divide-y-normal divide-rule border-t-normal border-rule">
        {posts.map((post, index) => (
          <PostCard
            eager={index === 0}
            key={`${post.slug}-${post.type}`}
            post={post}
          />
        ))}
      </div>
    </div>
  );
}

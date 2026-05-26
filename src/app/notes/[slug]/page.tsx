import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXContent } from "@/components/ui/mdx-content";
import { Tag } from "@/components/ui/tag";
import { getAllNotes, getNote } from "@/lib/content";
import { createPageMetadata, getPostOgImage } from "@/lib/metadata";

type NotePostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllNotes().map((post) => ({
    slug: post.slug,
  }));
}

function formatPublishedDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

function getReadingMinutes(content: string) {
  const words = content.match(/\b[\w'-]+\b/g)?.length ?? 0;

  return Math.max(1, Math.ceil(words / 220));
}

export async function generateMetadata({
  params,
}: NotePostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getNote(slug);

  if (!post) {
    return {};
  }

  return createPageMetadata({
    title: `${post.title} | mindoff.work`,
    description: post.summary,
    path: `/notes/${post.slug}`,
    image: getPostOgImage(post.cover),
  });
}

export default async function NotePostPage({ params }: NotePostPageProps) {
  const { slug } = await params;
  const post = getNote(slug);

  if (!post) {
    notFound();
  }

  const publishedDate = formatPublishedDate(post.date);
  const readingMinutes = getReadingMinutes(post.content);

  return (
    <article className="mx-auto flex w-full max-w-shell flex-col gap-12 px-4 py-10 sm:px-6 sm:py-16 lg:gap-16 lg:py-20">
      <header className="mx-auto flex w-full max-w-media flex-col gap-6 border-b-normal border-rule pb-10 sm:pb-12">
        <Link
          className="w-fit rounded-sm font-heading text-size-xs font-semibold uppercase tracking-kicker text-subtle transition-colors duration-fast ease-standard hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rule"
          href="/notes"
        >
          Notes / {post.type}
        </Link>
        <h1 className="max-w-reading font-heading text-size-4xl font-semibold tracking-title text-ink">
          {post.title}
        </h1>
        <p className="max-w-reading font-heading text-size-lg text-muted">{post.summary}</p>
        <div className="flex flex-wrap items-center gap-3 border-t-normal border-rule pt-5 text-size-sm text-subtle">
          <time dateTime={post.date}>{publishedDate}</time>
          <span aria-hidden="true">/</span>
          <span>{readingMinutes} min read</span>
          <span aria-hidden="true">/</span>
          <span className="capitalize">{post.type}</span>
        </div>
        <div className="flex flex-wrap gap-2" aria-label="Note tags">
          {post.tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>
      </header>
      {post.cover ? (
        <figure className="mx-auto flex w-full max-w-media flex-col gap-3">
          <Image
            alt={`${post.title} note cover`}
            className="aspect-cover h-auto w-full rounded-lg border-normal border-rule object-cover"
            height={675}
            priority
            src={post.cover}
            unoptimized
            width={1200}
          />
          <figcaption className="text-size-sm text-subtle">
            {post.title} / field note.
          </figcaption>
        </figure>
      ) : null}
      <div className="mx-auto w-full max-w-reading">
        <MDXContent source={post.content} />
      </div>
    </article>
  );
}

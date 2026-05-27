import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LoadingImage } from "@/components/ui/loading-image";
import { MDXContent } from "@/components/ui/mdx-content";
import { SiteLink } from "@/components/ui/site-link";
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
    day: "2-digit",
    month: "short",
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
  const noteSurfaceClassName = post.color
    ? "bg-[attr(data-color_type(<color>))] [[data-theme=dark]_&]:bg-[color-mix(in_oklch,attr(data-color_type(<color>))_var(--surface-tint-dark-weight),var(--color-background))]"
    : "bg-panel";

  return (
    <article className="flex w-full flex-col">
      <header className="flex justify-center px-4 py-12 sm:px-6 sm:py-16 lg:pt-24 lg:pb-20">
        <div className="flex w-full max-w-reading flex-col gap-8">
          <div className="flex flex-wrap items-center gap-3 font-heading text-size-sm text-subtle">
            <SiteLink
              className="rounded-sm underline decoration-rule underline-offset-4 transition-colors duration-fast ease-standard hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rule"
              href="/notes"
            >
              Notes
            </SiteLink>
            <span aria-hidden="true">/</span>
            <time dateTime={post.date}>{publishedDate}</time>
            <span aria-hidden="true">/</span>
            <span>{readingMinutes} min read</span>
          </div>
          <h1 className="font-heading text-size-5xl font-black tracking-title text-ink">
            {post.title}
          </h1>
        </div>
      </header>
      {post.cover ? (
        <figure
          className={`flex justify-center border-t-normal border-b-normal border-rule px-4 py-12 sm:px-6 sm:py-16 lg:py-20 ${noteSurfaceClassName}`}
          data-color={post.color}
        >
          <LoadingImage
            alt=""
            height={1024}
            imageClassName="h-auto w-full max-w-media object-contain"
            priority
            placeholderClassName="mx-auto max-w-media"
            sizes="(max-width: 639px) calc(100vw - 2rem), 52rem"
            src={post.cover}
            unoptimized
            width={1536}
            wrapperClassName="w-full max-w-media"
          />
        </figure>
      ) : null}
      <div className="mx-auto w-full max-w-reading px-4 py-12 sm:px-6 sm:py-16 lg:py-20 [&>p:first-child]:mt-0 [&>p:first-child]:mb-12 [&>p:first-child]:font-heading [&>p:first-child]:text-size-lg [&>p:first-child]:font-light">
        <MDXContent source={post.content} />
        <footer className="mt-12 flex flex-col gap-4 pt-6">
          <p className="font-heading text-size-xs font-semibold uppercase tracking-kicker text-subtle">
            Topics Covered
          </p>
          <div className="flex flex-wrap gap-2" aria-label="Note tags">
            {post.tags.map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </div>
        </footer>
      </div>
    </article>
  );
}

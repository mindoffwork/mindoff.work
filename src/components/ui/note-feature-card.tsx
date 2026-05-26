import Image from "next/image";
import Link from "next/link";
import type { NotePost } from "@/lib/types";

type NoteFeatureCardProps = {
  post: NotePost;
};

function formatPublishedDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

export function NoteFeatureCard({ post }: NoteFeatureCardProps) {
  const hasCover = Boolean(post.cover);
  const noteSurfaceClassName = post.color
    ? "bg-[attr(data-color_type(<color>))] [[data-theme=dark]_&]:bg-[color-mix(in_oklch,attr(data-color_type(<color>))_var(--surface-tint-dark-weight),var(--color-background))]"
    : "bg-panel";

  return (
    <Link
      aria-label={`Read ${post.title}`}
      className="group relative block h-full overflow-hidden rounded-2xl border-normal border-rule focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rule"
      href={`/notes/${post.slug}`}
    >
      <article className={`flex h-full flex-col ${noteSurfaceClassName}`} data-color={post.color}>
        {post.cover ? (
          <div className="aspect-note-cover overflow-hidden px-4 pt-4 sm:px-6 sm:pt-6">
            <Image
              alt=""
              className="h-full w-full rounded-lg object-contain transition-opacity duration-fast ease-standard group-hover:opacity-90"
              height={1024}
              sizes="(max-width: 639px) calc(100vw - 2rem), (max-width: 1023px) calc((100vw - 3rem) / 2), calc((100vw - 7rem) / 3)"
              src={post.cover}
              unoptimized
              width={1536}
            />
          </div>
        ) : null}
        <div
          className={`flex flex-1 flex-col gap-8 p-6 sm:p-8 ${
            hasCover ? "justify-end" : "min-h-80 justify-between"
          }`}
        >
          <div className="flex flex-col gap-4">
            <h2 className="font-heading text-size-lg font-extrabold leading-tight tracking-title text-ink">
              {post.title}
            </h2>
            <time className="font-heading text-size-sm text-muted" dateTime={post.date}>
              {formatPublishedDate(post.date)}
            </time>
          </div>
          {!hasCover ? (
            <span
              aria-hidden="true"
              className="material-symbols-outlined text-size-2xl leading-none text-ink transition-transform duration-fast ease-standard group-hover:translate-x-2"
            >
              arrow_right_alt
            </span>
          ) : null}
        </div>
      </article>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[color-mix(in_srgb,var(--color-ink)_6%,transparent)] opacity-0 transition-opacity duration-fast ease-standard group-hover:opacity-100"
      />
    </Link>
  );
}

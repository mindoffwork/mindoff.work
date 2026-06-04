import type { CSSProperties } from "react";
import { LoadingImage } from "@/components/ui/loading-image";
import { SiteLink } from "@/components/ui/site-link";
import type { NotePost } from "@/lib/types";

type NoteCardProps = {
  eager?: boolean;
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

export function NoteCard({ eager = false, post }: NoteCardProps) {
  const hasCover = Boolean(post.cover);
  const noteSurfaceClassName = post.color
    ? "bg-[var(--post-color)] [[data-theme=dark]_&]:bg-[color-mix(in_oklch,var(--post-color)_var(--surface-tint-dark-weight),var(--color-background))]"
    : "bg-panel";

  return (
    <SiteLink
      aria-label={`Read ${post.title}`}
      className="group relative block h-full overflow-hidden rounded-2xl border-normal border-rule focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rule"
      href={`/notes/${post.slug}`}
    >
      <article className={`flex h-full flex-col ${noteSurfaceClassName}`} style={post.color ? { '--post-color': post.color } as CSSProperties : undefined}>
        {post.cover ? (
          <div className="px-4 pt-4 sm:px-6 sm:pt-6">
            <LoadingImage
              alt=""
              height={1024}
              imageClassName="block h-auto w-full rounded-lg group-hover:opacity-90"
              loading={eager ? "eager" : "lazy"}
              placeholderClassName="rounded-lg"
              sizes="(max-width: 639px) calc(100vw - 2rem), (max-width: 1023px) calc((100vw - 3rem) / 2), calc((100vw - 7rem) / 3)"
              src={post.cover}
              unoptimized
              width={1536}
              wrapperClassName="w-full rounded-lg"
            />
          </div>
        ) : null}
        <div
          className={`flex flex-col gap-8 p-6 sm:p-8 ${
            hasCover ? "" : "flex-1 min-h-80 justify-between"
          }`}
        >
          <div className="flex flex-col gap-4">
            <h2 className="font-heading text-size-base sm:text-size-lg font-bold sm:font-extrabold leading-tight tracking-title text-ink">
              {post.title}
            </h2>
            <time className="font-heading text-size-sm text-muted" dateTime={post.date}>
              {formatPublishedDate(post.date)}
            </time>
            {!hasCover ? (
              <p className="line-clamp-5 font-body text-size-base text-ink">
                {post.summary}
              </p>
            ) : null}
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
    </SiteLink>
  );
}

import Image from "next/image";
import Link from "next/link";
import type { ProjectPost } from "@/lib/types";

type ProjectFeatureCardProps = {
  post: ProjectPost;
};

export function ProjectFeatureCard({ post }: ProjectFeatureCardProps) {
  const cover = post.covers?.[0];
  const projectSurfaceClassName = post.color
    ? "bg-[attr(data-color_type(<color>))] [[data-theme=dark]_&]:bg-[color-mix(in_oklch,attr(data-color_type(<color>))_var(--surface-tint-dark-weight),var(--color-background))]"
    : "bg-panel";

  return (
    <Link
      aria-label={`View ${post.title}`}
      className="group relative block overflow-hidden rounded-2xl border-normal border-rule focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rule"
      href={`/projects/${post.slug}`}
    >
      <article className="flex flex-col lg:flex-row">
        {cover ? (
          <div className="relative aspect-cover overflow-hidden bg-panel lg:w-2/3 lg:shrink-0">
            <Image
              alt=""
              className="object-cover transition-opacity duration-fast ease-standard group-hover:opacity-90"
              fill
              sizes="(max-width: 1023px) calc(100vw - 2rem), 48rem"
              src={cover}
              unoptimized
            />
          </div>
        ) : null}
        <div
          className={`flex min-h-full flex-col justify-between gap-12 p-10 sm:p-12 lg:p-14 ${projectSurfaceClassName} ${cover ? "lg:flex-1" : "w-full"}`}
          data-color={post.color}
        >
          <div className="flex flex-col gap-2">
            <h2 className="font-heading text-size-2xl font-black tracking-title text-ink">
              {post.title}
            </h2>
            <p className="font-body text-size-base text-ink">
              {post.tags.join(", ")}
            </p>
          </div>
          <span
            aria-hidden="true"
            className="material-symbols-outlined leading-none text-ink transition-transform duration-fast ease-standard group-hover:translate-x-2"
            style={{ fontSize: "var(--font-size-2xl)" }}
          >
            arrow_right_alt
          </span>
        </div>
      </article>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[color-mix(in_srgb,var(--color-ink)_6%,transparent)] opacity-0 transition-opacity duration-fast ease-standard group-hover:opacity-100"
      />
    </Link>
  );
}

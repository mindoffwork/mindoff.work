import { LoadingImage } from "@/components/ui/loading-image";
import { SiteLink } from "@/components/ui/site-link";
import type { ProjectPost } from "@/lib/types";

type ProjectCardProps = {
  eager?: boolean;
  imageFirst?: boolean;
  post: ProjectPost;
};

export function ProjectCard({
  eager = false,
  imageFirst = true,
  post,
}: ProjectCardProps) {
  const cover = post.covers?.[0];
  const projectSurfaceClassName = post.color
    ? "bg-[attr(data-color_type(<color>))] [[data-theme=dark]_&]:bg-[color-mix(in_oklch,attr(data-color_type(<color>))_var(--surface-tint-dark-weight),var(--color-background))]"
    : "bg-panel";

  return (
    <SiteLink
      aria-label={`View ${post.title}`}
      className="group relative block overflow-hidden rounded-2xl border-normal border-rule focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rule"
      href={`/projects/${post.slug}`}
    >
      <article
        className={`flex flex-col lg:flex-row ${imageFirst ? "" : "lg:flex-row-reverse"} ${projectSurfaceClassName}`}
        data-color={post.color}
      >
        {cover ? (
          <div className="relative aspect-cover w-full overflow-hidden lg:w-1/2 lg:shrink-0">
            <LoadingImage
              alt=""
              fill
              imageClassName="object-cover group-hover:opacity-90"
              loading={eager ? "eager" : "lazy"}
              placeholderClassName="rounded-none"
              sizes="(max-width: 639px) calc(100vw - 2rem), (max-width: 1023px) calc(100vw - 3rem), 32rem"
              src={cover}
              unoptimized
              wrapperClassName="h-full w-full"
            />
          </div>
        ) : null}
        <div
          className={`flex min-h-full flex-col justify-between gap-6 p-5 sm:gap-8 sm:p-8 lg:gap-10 lg:p-10 xl:p-12 ${cover ? "lg:flex-1" : "w-full"}`}
        >
          <div className="flex flex-col gap-2">
            <h2 className="font-heading text-size-lg font-black tracking-title text-ink sm:text-size-xl lg:text-size-2xl">
              {post.title}
            </h2>
            <p className="font-body text-size-sm text-ink lg:text-size-base">
              {post.tags.join(", ")}
            </p>
          </div>
          <span
            aria-hidden="true"
            className="material-symbols-outlined text-size-xl leading-none text-ink transition-transform duration-fast ease-standard group-hover:translate-x-2 sm:text-size-2xl"
          >
            arrow_right_alt
          </span>
        </div>
      </article>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[color-mix(in_srgb,var(--color-ink)_6%,transparent)] opacity-0 transition-opacity duration-fast ease-standard group-hover:opacity-100"
      />
    </SiteLink>
  );
}

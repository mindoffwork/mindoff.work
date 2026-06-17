import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { getActionButtonClassName } from "@/components/ui/action-button";
import { ExpandableImage } from "@/components/ui/expandable-image";
import { LoadingImage } from "@/components/ui/loading-image";
import { SiteLink } from "@/components/ui/site-link";
import {
  createPageMetadata,
  siteDescription,
  siteTitle,
} from "@/lib/metadata";
import { getAllProjects, getAllNotes } from "@/lib/content";
import type { ProjectPost, NotePost } from "@/lib/types";

export function generateMetadata(): Metadata {
  return createPageMetadata({
    title: siteTitle,
    description: siteDescription,
    path: "/",
  });
}

function formatNoteDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

function ProjectTextCard({ post }: { post: ProjectPost }) {
  const surfaceClassName = post.color
    ? "bg-[var(--post-color)] [[data-theme=dark]_&]:bg-[color-mix(in_oklch,var(--post-color)_var(--surface-tint-dark-weight),var(--color-background))]"
    : "bg-panel";

  return (
    <SiteLink
      aria-label={`View project: ${post.title}`}
      className="group relative flex h-full overflow-hidden rounded-lg border-normal border-rule focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rule"
      href={`/projects/${post.slug}`}
    >
      <article
        className={`flex w-full min-h-64 flex-col justify-between gap-10 p-7 sm:min-h-72 sm:p-10 ${surfaceClassName}`}
        style={post.color ? { '--post-color': post.color } as CSSProperties : undefined}
      >
        <div className="flex w-full flex-col gap-5">
          <p className="max-w-xl font-body text-size-sm leading-relaxed text-ink">
            {post.summary}
          </p>
        </div>
        <div className="flex items-end justify-between gap-8">
          <h3 className="font-heading text-size-base font-extrabold leading-snug tracking-title text-ink">
            {post.title}
          </h3>
          <span
            aria-hidden="true"
            className="material-symbols-outlined text-size-2xl leading-none text-ink transition-transform duration-fast ease-standard group-hover:translate-x-2"
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

function ProjectImageCard({
  eager = false,
  post,
}: {
  eager?: boolean;
  post: ProjectPost;
}) {
  const cover = post.covers?.[0];

  if (!cover) {
    return <ProjectTextCard post={post} />;
  }

  const plateClassName = post.color
    ? "bg-[var(--post-color)] in-data-[theme=dark]:bg-[color-mix(in_oklch,var(--post-color)_var(--surface-tint-dark-weight),var(--color-background))]"
    : "bg-canvas";

  return (
    <div className="relative h-full min-h-64 overflow-hidden rounded-lg border-normal border-transparent focus-within:outline-2 focus-within:outline-offset-4 focus-within:outline-rule sm:min-h-72">
      <ExpandableImage
        alt={`Project preview for ${post.title}`}
        buttonLabel={`Expand project image for ${post.title}`}
        dialogImageClassName="object-contain [[data-theme=dark]_&]:brightness-[0.88] [[data-theme=dark]_&]:saturate-[0.92]"
        fill={false}
        height={720}
        loading={eager ? "eager" : "lazy"}
        renderTrigger={
          <div
            className={`flex h-full items-center justify-center ${plateClassName}`}
            style={post.color ? { '--post-color': post.color } as CSSProperties : undefined}
          >
            <LoadingImage
              alt=""
              height={720}
              imageClassName="h-auto w-full transition-transform duration-fast ease-standard [[data-theme=dark]_&]:brightness-[0.88] [[data-theme=dark]_&]:saturate-[0.92] group-hover:scale-[1.015]"
              loading={eager ? "eager" : "lazy"}
              placeholderClassName="rounded-lg"
              sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1023px) calc(100vw - 3rem), 34rem"
              src={cover}
              unoptimized
              width={1280}
              wrapperClassName="w-full"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[color-mix(in_srgb,var(--color-ink)_6%,transparent)] opacity-0 transition-opacity duration-fast ease-standard group-hover:opacity-100"
            />
          </div>
        }
        sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1023px) calc(100vw - 3rem), 34rem"
        src={cover}
        width={1280}
        wrapperClassName="absolute! inset-0 my-0!"
      />
    </div>
  );
}

function ProjectFeatureRow({
  imageFirst = true,
  post,
}: {
  imageFirst?: boolean;
  post: ProjectPost;
}) {
  return (
    <div
      className={`grid gap-5 sm:gap-6 ${imageFirst ? "md:grid-cols-[7fr_3fr]" : "md:grid-cols-[3fr_7fr]"}`}
    >
      <div className={imageFirst ? "" : "md:order-2"}>
        <ProjectImageCard eager={imageFirst} post={post} />
      </div>
      <div className={imageFirst ? "" : "md:order-1"}>
        <ProjectTextCard post={post} />
      </div>
    </div>
  );
}

function IndexLink({ href, label }: { href: string; label: string }) {
  return (
    <SiteLink
      className={`${getActionButtonClassName("secondary")} group flex w-full items-center justify-between gap-4`}
      href={href}
    >
      <span>{label}</span>
      <span
        aria-hidden="true"
        className="material-symbols-outlined text-size-2xl leading-none transition-transform duration-fast ease-standard group-hover:translate-x-2"
      >
        arrow_right_alt
      </span>
    </SiteLink>
  );
}

function NoteFeatureRow({
  eager = false,
  post,
}: {
  eager?: boolean;
  post: NotePost;
}) {
  const surfaceClassName = post.color
    ? "bg-[var(--post-color)] [[data-theme=dark]_&]:bg-[color-mix(in_oklch,var(--post-color)_var(--surface-tint-dark-weight),var(--color-background))]"
    : "bg-panel";
  return (
    <SiteLink
      aria-label={`Read note: ${post.title}`}
      className="group relative block overflow-hidden rounded-lg border-normal border-rule focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rule"
      href={`/notes/${post.slug}`}
    >
      <article
        className={`flex flex-col gap-5 p-6 sm:grid sm:min-h-44 sm:items-center sm:gap-x-10 sm:gap-y-5 sm:p-8 ${
          post.cover
            ? "sm:grid-cols-[15rem_minmax(0,1fr)_auto]"
            : "sm:grid-cols-[minmax(0,1fr)_auto] lg:min-h-56 lg:px-10 lg:py-10"
        } ${surfaceClassName}`}
        style={post.color ? { '--post-color': post.color } as CSSProperties : undefined}
      >
        {post.cover ? (
          <LoadingImage
            alt=""
            height={240}
            imageClassName="w-full rounded-lg object-cover sm:h-60 sm:w-60"
            loading={eager ? "eager" : "lazy"}
            placeholderClassName="rounded-lg"
            sizes="(max-width: 639px) calc(100vw - 3rem), 15rem"
            src={post.cover}
            unoptimized
            width={240}
            wrapperClassName="w-full rounded-lg sm:h-60 sm:w-60 sm:shrink-0"
          />
        ) : null}
        <div className={`min-w-0 self-center ${post.cover ? "" : "lg:mx-auto lg:max-w-2xl"}`}>
          <div className="flex min-w-0 flex-col gap-3 sm:gap-4">
            <h3 className="font-heading text-size-base sm:text-size-lg font-bold leading-snug tracking-title text-ink">
              {post.title}
            </h3>
            <p className="line-clamp-2 max-w-2xl font-body text-size-sm leading-relaxed text-ink/80">
              {post.summary}
            </p>
            <div className="flex items-center gap-4 pt-1 font-heading text-size-xs text-muted">
              <span className="capitalize">{post.type}</span>
              <time dateTime={post.date}>{formatNoteDate(post.date)}</time>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end pt-1 sm:self-center sm:pt-0">
          <span
            aria-hidden="true"
            className="material-symbols-outlined text-size-2xl leading-none transition-transform duration-fast ease-standard group-hover:translate-x-2"
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

export default function Home() {
  const featuredProjects = getAllProjects().slice(0, 2);
  const recentNotes = getAllNotes().slice(0, 6);

  return (
    <div className="flex flex-col">
      <header className="relative border-b-normal border-rule px-8 pt-20 pb-32 sm:px-6 lg:py-44">
        <div className="mx-auto grid w-full max-w-media gap-x-3 gap-y-1 md:grid-cols-[0.85fr_1.35fr] md:grid-rows-[auto_auto]">
          <p className="max-w-sm self-end text-balance text-left font-body text-size-2xl leading-snug text-ink md:justify-self-end md:pb-[0.32em] md:text-right">
            Crafting tools and writings to streamline and lighten up work
          </p>
          <h1
            className="font-heading text-size-display font-black leading-18 sm:leading-24 tracking-tighter text-ink md:row-span-2 md:col-start-2"
            id="home-title"
          >
            <span className="block">mind</span>
            <span className="inline-flex items-baseline">
              <span className="bg-brand px-2 text-brand-ink sm:px-3">off</span>
              <span>.work</span>
            </span>
          </h1>
        </div>
      </header>

      <section
        aria-labelledby="featured-projects-title"
        className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-8 py-16 sm:px-6 lg:py-24"
      >
        <h2 className="max-w-4xl font-heading text-size-xl font-light tracking-wide leading-relaxed text-ink sm:text-size-2xl">
          Open-source products to simplify complex work and automate boring
          workflows.
        </h2>
        <p
          className="mt-6 font-heading font-medium tracking-wide text-size-base text-muted"
          id="featured-projects-title"
        >
          Featured Projects
        </p>
        <div className="flex flex-col gap-4">
          {featuredProjects.map((project, index) => (
            <ProjectFeatureRow
              imageFirst={index % 2 === 0}
              key={project.slug}
              post={project}
            />
          ))}
          <IndexLink href="/projects" label="See All Projects" />
        </div>
      </section>

      <section
        aria-labelledby="recent-notes-title"
        className="w-full border-t-normal border-rule"
      >
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-8 py-16 sm:px-6 lg:py-24">
          <h2 className="max-w-4xl font-heading text-size-xl font-light tracking-wide leading-relaxed text-ink sm:text-size-2xl">
            Explore minimalism at research, design, software development, and Hardware builds.
          </h2>
          <p
            className="mt-6 font-heading font-medium tracking-wide text-size-base text-muted"
            id="recent-notes-title"
          >
            Recent Notes
          </p>
          <div className="flex w-full flex-col gap-4">
            {recentNotes.map((note, index) => (
              <NoteFeatureRow eager={index === 0} key={note.slug} post={note} />
            ))}
            <IndexLink href="/notes" label="See All Notes" />
          </div>
        </div>
      </section>
    </div>
  );
}

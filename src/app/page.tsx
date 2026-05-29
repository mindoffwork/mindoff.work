import type { Metadata } from "next";
import { getActionButtonClassName } from "@/components/ui/action-button";
import { LoadingImage } from "@/components/ui/loading-image";
import { SiteLink } from "@/components/ui/site-link";
import { createPageMetadata } from "@/lib/metadata";
import { getAllProjects, getAllNotes } from "@/lib/content";
import type { ProjectPost, NotePost } from "@/lib/types";

const githubUrl = "https://github.com/mindoffwork";

export function generateMetadata(): Metadata {
  return createPageMetadata({
    title: "Mind Off Work",
    description:
      "Tools, writings, and product experiments exploring quieter ways to design, build, automate, and think through work.",
    path: "/",
  });
}

function GitHubIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-6"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 2C6.48 2 2 6.59 2 12.25c0 4.52 2.87 8.35 6.84 9.71.5.09.68-.22.68-.49v-1.9c-2.78.62-3.37-1.22-3.37-1.22-.45-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.35 1.12 2.92.85.09-.67.35-1.12.63-1.38-2.22-.26-4.55-1.14-4.55-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.35 9.35 0 0 1 12 6.94c.85 0 1.7.12 2.5.34 1.9-1.33 2.74-1.05 2.74-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.94.68 1.9v2.83c0 .27.18.58.69.48A10.08 10.08 0 0 0 22 12.25C22 6.59 17.52 2 12 2Z" />
    </svg>
  );
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
    ? "bg-[attr(data-color_type(<color>))] [[data-theme=dark]_&]:bg-[color-mix(in_oklch,attr(data-color_type(<color>))_var(--surface-tint-dark-weight),var(--color-background))]"
    : "bg-panel";

  return (
    <SiteLink
      aria-label={`View project: ${post.title}`}
      className="group relative flex overflow-hidden rounded-lg border-normal border-rule focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rule sm:min-h-60"
      href={`/projects/${post.slug}`}
    >
      <article
        className={`flex w-full flex-col justify-between gap-8 p-6 sm:p-8 ${surfaceClassName}`}
        data-color={post.color}
      >
        <div className="flex w-full flex-col gap-4">
          <p className="font-heading text-size-xs tracking-wide font-light italic text-muted">
            {post.tags.join(", ")}
          </p>
          <p className="font-body text-size-base text-size leading-relaxed text-ink">
            {post.summary}
          </p>
        </div>
        <div className="flex items-center justify-between gap-6">
          <h3 className="font-heading text-size-base font-extrabold tracking-title text-ink">
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

  return (
    <a
      aria-label={`Open full-size project image for ${post.title}`}
      className="group relative block overflow-hidden rounded-lg border-normal border-transparent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rule"
      href={cover}
      rel="noreferrer"
      target="_blank"
    >
      <div className="relative aspect-cover overflow-hidden rounded-lg sm:min-h-56">
        <LoadingImage
          alt=""
          fill
          imageClassName="object-cover transition-transform duration-fast ease-standard group-hover:scale-[1.015]"
          loading={eager ? "eager" : "lazy"}
          placeholderClassName="rounded-lg"
          sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1023px) calc(100vw - 3rem), 34rem"
          src={cover}
          unoptimized
          wrapperClassName="absolute! inset-0 rounded-lg"
        />
      </div>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-lg bg-[color-mix(in_srgb,var(--color-ink)_6%,transparent)] opacity-0 transition-opacity duration-fast ease-standard group-hover:opacity-100"
      />
    </a>
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
    <div className="grid gap-4 md:grid-cols-[1.2fr_1fr]">
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

function NoteFeatureRow({ post }: { post: NotePost }) {
  const surfaceClassName = post.color
    ? "bg-[attr(data-color_type(<color>))] [[data-theme=dark]_&]:bg-[color-mix(in_oklch,attr(data-color_type(<color>))_var(--surface-tint-dark-weight),var(--color-background))]"
    : "bg-panel";

  return (
    <SiteLink
      aria-label={`Read note: ${post.title}`}
      className="group relative block overflow-hidden rounded-lg border-normal border-rule focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rule"
      href={`/notes/${post.slug}`}
    >
      <article
        className={`flex flex-col gap-4 p-5 sm:grid sm:min-h-32 sm:grid-cols-[7rem_1fr_auto] sm:items-center sm:gap-8 sm:p-6 ${surfaceClassName}`}
        data-color={post.color}
      >
        <div className="flex items-start gap-4 sm:contents">
          {post.cover ? (
            <LoadingImage
              alt=""
              height={112}
              imageClassName="size-16 rounded-lg object-cover sm:size-24"
              placeholderClassName="rounded-lg"
              sizes="(max-width: 639px) 4rem, 6rem"
              src={post.cover}
              unoptimized
              width={112}
              wrapperClassName="size-16 shrink-0 rounded-lg sm:size-24"
            />
          ) : (
            <span aria-hidden="true" className="hidden sm:block" />
          )}
          <h3 className="font-heading text-size-base sm:text-size-lg font-bold leading-tight tracking-title text-ink">
            {post.title}
          </h3>
        </div>
        <div className="flex items-center justify-between gap-5 font-body text-size-sm text-ink sm:justify-end">
          <span className="capitalize">{post.type}</span>
          <time dateTime={post.date}>{formatNoteDate(post.date)}</time>
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
  const recentNotes = getAllNotes().slice(0, 2);

  return (
    <div className="flex flex-col">
      <header className="relative border-b-normal border-rule px-8 py-12 sm:px-6 sm:py-20 lg:py-44">
        <div className="mx-auto grid w-full max-w-shell gap-x-3 gap-y-1 md:grid-cols-[0.85fr_1.35fr] md:grid-rows-[auto_auto]">
          <p className="max-w-sm self-end text-balance text-left font-body text-size-base sm:text-size-xl leading-snug text-ink md:justify-self-end md:pb-[0.32em] md:text-right">
            Tools and writings to streamline and lighten up
          </p>
          <h1
            className="font-heading text-size-4xl sm:text-size-display font-black sm:leading-24 tracking-tighter text-ink md:row-span-2 md:col-start-2"
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
            {recentNotes.map((note) => (
              <NoteFeatureRow key={note.slug} post={note} />
            ))}
            <IndexLink href="/notes" label="See All Notes" />
          </div>
        </div>
      </section>
    </div>
  );
}

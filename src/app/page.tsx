import type { Metadata } from "next";
import Link from "next/link";
import { createPageMetadata } from "@/lib/metadata";
import { getAllProjects, getAllNotes } from "@/lib/content";
import type { ProjectPost, NotePost } from "@/lib/types";

export function generateMetadata(): Metadata {
  return createPageMetadata({
    title: "mindoff.work",
    description:
      "A quiet digital workshop for thoughtful products, observations, and ideas made useful.",
    path: "/",
  });
}

function FeaturedProjectCard({ post }: { post: ProjectPost }) {
  const surfaceClass = post.color
    ? "bg-[attr(data-color_type(<color>))] [[data-theme=dark]_&]:bg-[color-mix(in_oklch,attr(data-color_type(<color>))_var(--surface-tint-dark-weight),var(--color-background))]"
    : "bg-panel";

  return (
    <Link
      aria-label={`View project: ${post.title}`}
      className="group relative block overflow-hidden rounded-2xl border-normal border-rule focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rule"
      href={`/projects/${post.slug}`}
    >
      <div
        className={`flex flex-col justify-between gap-20 p-10 sm:p-12 lg:p-16 ${surfaceClass}`}
        data-color={post.color}
      >
        <span className="font-heading text-size-xs font-semibold uppercase tracking-kicker text-muted">
          {post.type}
        </span>
        <div className="flex items-end justify-between gap-8">
          <div className="flex flex-col gap-4">
            <h2 className="font-heading text-size-4xl font-black tracking-title text-ink lg:text-size-5xl">
              {post.title}
            </h2>
            <p className="max-w-sm font-body text-size-base text-ink">
              {post.summary}
            </p>
          </div>
          <span
            aria-hidden="true"
            className="material-symbols-outlined shrink-0 text-size-2xl leading-none text-ink transition-transform duration-fast ease-standard group-hover:translate-x-2"
          >
            arrow_right_alt
          </span>
        </div>
      </div>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[color-mix(in_srgb,var(--color-ink)_6%,transparent)] opacity-0 transition-opacity duration-fast ease-standard group-hover:opacity-100"
      />
    </Link>
  );
}

function NoteRow({ post }: { post: NotePost }) {
  const date = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${post.date}T00:00:00Z`));

  return (
    <Link
      aria-label={`Read note: ${post.title}`}
      className="group flex items-baseline justify-between gap-6 border-b-normal border-rule py-5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rule"
      href={`/notes/${post.slug}`}
    >
      <h3 className="font-heading text-size-xl font-semibold tracking-title text-ink transition-colors duration-fast ease-standard group-hover:text-muted">
        {post.title}
      </h3>
      <div className="flex shrink-0 items-center gap-5 font-heading text-size-sm text-muted">
        <span className="hidden sm:block">{post.type}</span>
        <time dateTime={post.date}>{date}</time>
        <span
          aria-hidden="true"
          className="material-symbols-outlined text-size-lg leading-none transition-transform duration-fast ease-standard group-hover:translate-x-1"
        >
          arrow_right_alt
        </span>
      </div>
    </Link>
  );
}

export default function Home() {
  const latestProject = getAllProjects()[0];
  const latestNotes = getAllNotes().slice(0, 3);

  return (
    <div className="flex flex-col gap-24 lg:gap-32">
      {/* Welcome */}
      <div className="mx-auto w-full max-w-6xl px-4 pt-16 sm:px-6 sm:pt-20 lg:pt-28">
        <div className="flex flex-col gap-10">
          <h1
            className="font-heading text-size-display font-black tracking-title text-ink"
            id="home-title"
          >
            <span className="block">mind</span>
            <span className="inline-flex items-baseline">
              <span className="bg-brand px-2 text-brand-ink sm:px-3">off</span>
              <span>.work</span>
            </span>
          </h1>

          <div className="flex max-w-reading flex-col gap-6">
            <p className="font-body text-size-xl text-ink">
              Considered work and writing, made in the open.
            </p>
          </div>
        </div>
      </div>

      {/* Latest project */}
      {latestProject ? (
        <section
          aria-label="Latest project"
          className="mx-auto w-full max-w-6xl px-4 sm:px-6"
        >
          <div className="flex flex-col gap-6">
            <p className="font-heading text-size-xs font-semibold uppercase tracking-kicker text-muted">
              Latest project
            </p>
            <FeaturedProjectCard post={latestProject} />
          </div>
        </section>
      ) : null}

      {/* Recent notes */}
      {latestNotes.length > 0 ? (
        <section
          aria-label="Recent notes"
          className="mx-auto w-full max-w-6xl px-4 pb-24 sm:px-6 lg:pb-32"
        >
          <div className="flex flex-col gap-2">
            <p className="mb-4 font-heading text-size-xs font-semibold uppercase tracking-kicker text-muted">
              Recent notes
            </p>
            <div className="flex flex-col border-t-normal border-rule">
              {latestNotes.map((note) => (
                <NoteRow key={note.slug} post={note} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}

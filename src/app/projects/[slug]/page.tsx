import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MDXContent } from "@/components/ui/mdx-content";
import { Tag } from "@/components/ui/tag";
import { getAllProjects, getProject } from "@/lib/content";
import { createPageMetadata, getPostOgImage } from "@/lib/metadata";

type ProjectPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllProjects().map((post) => ({
    slug: post.slug,
  }));
}

function formatProjectDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

export async function generateMetadata({
  params,
}: ProjectPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getProject(slug);

  if (!post) {
    return {};
  }

  return createPageMetadata({
    title: `${post.title} | Mindoff`,
    description: post.summary,
    path: `/projects/${post.slug}`,
    image: getPostOgImage(post.covers?.[0]),
  });
}

export default async function ProjectPostPage({
  params,
}: ProjectPostPageProps) {
  const { slug } = await params;
  const post = getProject(slug);

  if (!post) {
    notFound();
  }

  const projectDate = formatProjectDate(post.date);
  const covers = post.covers ?? [];
  const projectSurfaceClassName = post.color
    ? "bg-[attr(data-color_type(<color>))] [[data-theme=dark]_&]:bg-[color-mix(in_oklch,attr(data-color_type(<color>))_var(--surface-tint-dark-weight),var(--color-background))]"
    : "bg-panel";
  const projectLinkClassName =
    "rounded-full border-normal border-rule px-5 py-3 font-heading text-size-sm font-semibold text-ink transition-[box-shadow] duration-fast ease-standard hover:shadow-[inset_0_0_0_9999px_color-mix(in_srgb,var(--color-ink)_6%,transparent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rule";

  return (
    <article className="flex w-full flex-col">
      <header className="flex justify-center py-10 lg:pt-28 lg:pb-24">
        <div className="flex max-w-reading flex-col items-center gap-6 text-center">
          <h1 className="font-heading text-size-5xl font-black tracking-title text-ink">
            {post.title}
          </h1>
          <p className="font-heading text-size-lg font-light">{post.summary}</p>
          {post.productUrl || post.github ? (
            <div className="flex flex-wrap justify-center gap-3" aria-label="Project links">
              {post.productUrl ? (
                <a
                  className={`${projectLinkClassName} ${projectSurfaceClassName}`}
                  href={post.productUrl}
                  data-color={post.color}
                >
                  View product
                </a>
              ) : null}
              {post.github ? (
                <a
                  className={`${projectLinkClassName} bg-panel`}
                  href={post.github}
                >
                  Source code
                </a>
              ) : null}
            </div>
          ) : null}
        </div>
      </header>
      {covers.length ? (
        <figure
          className={`flex flex-col gap-3 border-t-normal border-b-normal border-rule ${projectSurfaceClassName}`}
          data-color={post.color}
        >
          <div className="flex flex-wrap gap-3 p-3">
            {covers.map((cover, index) => {
              const isLeadImage =
                index === 0 && (covers.length === 1 || covers.length % 2 === 1);

              return (
                <Image
                  alt={`${post.title} project view ${index + 1}`}
                  className={
                    isLeadImage
                      ? "aspect-cover h-auto w-full rounded-lg object-cover"
                      : "aspect-cover h-auto w-full rounded-lg object-cover sm:w-[calc(50%-(var(--spacing)*1.5))]"
                  }
                  height={675}
                  key={`${cover}-${index}`}
                  priority={index === 0}
                  sizes={isLeadImage ? "100vw" : "(max-width: 639px) 100vw, 50vw"}
                  src={cover}
                  unoptimized
                  width={1200}
                />
              );
            })}
          </div>
          <figcaption className="pb-5 text-center text-size-sm text-subtle">
            {post.title} / project study.
          </figcaption>
        </figure>
      ) : null}
      <section
        aria-labelledby="project-purpose"
        className="mx-auto flex w-full max-w-reading flex-col gap-8 px-4 py-16 sm:px-6 sm:py-20"
      >
        <h2
          className="font-heading text-size-xl font-bold tracking-title text-ink"
          id="project-purpose"
        >
          Purpose
        </h2>
        <p className="font-body text-size-base leading-relaxed text-ink">
          {post.purpose}
        </p>
        <div className="flex flex-wrap gap-2" aria-label="Project tags">
          {post.tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>
      </section>
      <section
        aria-label="Project statistics"
        className={`border-t-normal border-b-normal border-rule ${projectSurfaceClassName}`}
        data-color={post.color}
      >
        <dl className="mx-auto flex w-full max-w-media flex-col gap-10 px-4 py-12 sm:flex-row sm:px-6 sm:py-12">
          <div className="text-center sm:flex-1">
            <dt className="font-heading text-size-xs font-semibold uppercase tracking-kicker text-subtle">
              Built
            </dt>
            <dd className="mt-1 text-size-base font-bold tracking-title text-ink">
              <time dateTime={post.date}>{projectDate}</time>
            </dd>
          </div>
          <div className="text-center sm:flex-1">
            <dt className="font-heading text-size-xs font-semibold uppercase tracking-kicker text-subtle">
              Form
            </dt>
            <dd className="mt-1 text-size-base font-bold capitalize tracking-title text-ink">
              {post.type}
            </dd>
          </div>
          <div className="text-center sm:flex-1">
            <dt className="font-heading text-size-xs font-semibold uppercase tracking-kicker text-subtle">
              State
            </dt>
            <dd className="mt-1 text-size-base font-bold capitalize tracking-title text-ink">
              {post.status}
            </dd>
          </div>
        </dl>
      </section>
      <div className="mx-auto w-full max-w-reading px-4 py-12 sm:px-6 sm:py-12">
        <MDXContent source={post.content} />
      </div>
    </article>
  );
}

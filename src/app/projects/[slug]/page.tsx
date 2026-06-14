import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getActionButtonClassName } from "@/components/ui/action-button";
import { JsonLd } from "@/components/analytics/json-ld";
import { LoadingImage } from "@/components/ui/loading-image";
import { MDXContent } from "@/components/ui/mdx-content";
import { SiteLink } from "@/components/ui/site-link";
import { Tag } from "@/components/ui/tag";
import { getAllProjects, getProject } from "@/lib/content";
import {
  absoluteUrl,
  absolutePageUrl,
  createPageMetadata,
  getPostOgImage,
  organizationId,
  siteTitle,
} from "@/lib/metadata";

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

function getProjectJsonLd(post: NonNullable<ReturnType<typeof getProject>>) {
  const projectUrl = absolutePageUrl(`/projects/${post.slug}`);
  const projectImage = absoluteUrl(getPostOgImage(post.covers?.[0]));
  const baseSchema = {
    "@context": "https://schema.org",
    name: post.title,
    description: post.summary,
    url: projectUrl,
    datePublished: post.date,
    dateModified: post.date,
    image: projectImage,
    keywords: post.tags.join(", "),
    creator: {
      "@id": organizationId,
    },
    publisher: {
      "@id": organizationId,
    },
  };

  if (post.type === "python package" && post.github) {
    return {
      ...baseSchema,
      "@type": "SoftwareSourceCode",
      codeRepository: post.github,
      programmingLanguage: "Python",
      runtimePlatform: "Python",
      ...(post.productUrl ? { sameAs: [post.productUrl] } : {}),
    };
  }

  if (post.type === "python package" && post.productUrl) {
    return {
      ...baseSchema,
      "@type": "SoftwareApplication",
      applicationCategory: "DeveloperApplication",
      downloadUrl: post.productUrl,
    };
  }

  return {
    ...baseSchema,
    "@type": "CreativeWork",
  };
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
    title: `${post.title} | ${siteTitle}`,
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
  const projectUrl = absolutePageUrl(`/projects/${post.slug}`);
  const projectJsonLd = getProjectJsonLd(post);
  const projectBreadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absolutePageUrl("/") },
      { "@type": "ListItem", position: 2, name: "Projects", item: absolutePageUrl("/projects") },
      { "@type": "ListItem", position: 3, name: post.title, item: projectUrl },
    ],
  };
  const projectSurfaceClassName = post.color
    ? "bg-[var(--post-color)] [[data-theme=dark]_&]:bg-[color-mix(in_oklch,var(--post-color)_var(--surface-tint-dark-weight),var(--color-background))]"
    : "bg-panel";
  const primaryActionClassName = post.color
    ? `${getActionButtonClassName("tinted-primary")} ${projectSurfaceClassName}`
    : getActionButtonClassName("primary");
  return (
    <article className="flex w-full flex-col">
      <JsonLd data={projectBreadcrumbJsonLd} />
      <JsonLd data={projectJsonLd} />
      <header className="flex justify-center px-8 py-10 sm:px-6 lg:pt-28 lg:pb-24">
        <div className="flex max-w-reading flex-col items-center gap-6 text-center">
          <SiteLink
            className="rounded-sm font-heading text-size-sm text-subtle underline decoration-rule underline-offset-4 transition-colors duration-fast ease-standard hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rule"
            href="/projects"
          >
            Projects
          </SiteLink>
          <h1 className="font-heading text-size-5xl font-black tracking-title text-ink">
            {post.title}
          </h1>
          <p className="font-heading text-size-lg font-light">{post.summary}</p>
          {post.productUrl || post.github ? (
            <div className="flex flex-wrap justify-center gap-3" aria-label="Project links">
              {post.productUrl ? (
                <a
                  className={primaryActionClassName}
                  style={post.color ? { '--post-color': post.color } as CSSProperties : undefined}
                  href={post.productUrl}
                >
                  View product
                </a>
              ) : null}
              {post.github ? (
                <a
                  className={getActionButtonClassName("secondary")}
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
          style={post.color ? { '--post-color': post.color } as CSSProperties : undefined}
        >
          <div className="flex flex-wrap gap-3 p-3">
            {covers.map((cover, index) => {
              const isLeadImage =
                index === 0 && (covers.length === 1 || covers.length % 2 === 1);

              return (
                <LoadingImage
                  alt={`${post.title} project view ${index + 1}`}
                  imageClassName="w-full h-auto rounded-lg"
                  height={675}
                  key={`${cover}-${index}`}
                  loading={index === 0 ? "eager" : "lazy"}
                  placeholderClassName="rounded-lg aspect-cover"
                  sizes={isLeadImage ? "100vw" : "(max-width: 639px) 100vw, 50vw"}
                  src={cover}
                  unoptimized
                  width={1200}
                  wrapperClassName={
                    isLeadImage
                      ? "w-full rounded-lg"
                      : "w-full rounded-lg sm:w-[calc(50%-(var(--spacing)*1.5))]"
                  }
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
        className="mx-auto flex w-full max-w-reading flex-col gap-8 px-8 py-16 sm:px-6 sm:py-20"
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
        style={post.color ? { '--post-color': post.color } as CSSProperties : undefined}
      >
        <dl className="mx-auto flex w-full max-w-media flex-col gap-10 px-8 py-12 sm:flex-row sm:px-6 sm:py-12">
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
      <div className="mx-auto w-full max-w-reading px-8 py-12 sm:px-6 sm:py-12">
        <MDXContent source={post.content} />
      </div>
    </article>
  );
}

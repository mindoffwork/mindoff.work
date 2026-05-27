import type { Metadata } from "next";
import { ProjectCard } from "@/components/ui/project-card";
import { getAllProjects } from "@/lib/content";
import { createPageMetadata } from "@/lib/metadata";

export function generateMetadata(): Metadata {
  return createPageMetadata({
    title: "Projects | mindoff.work",
    description: "Software and hardware projects from mindoff.work.",
    path: "/projects",
  });
}

export default function ProjectsPage() {
  const posts = getAllProjects();

  return (
    <div className="flex flex-col gap-12 px-4 py-8 sm:gap-16 sm:px-6 sm:py-16 lg:gap-24 lg:py-28">
      <header className="mx-auto flex w-full max-w-4xl flex-col items-start gap-8 lg:flex-row">
        <h1 className="font-body text-size-2xl font-bold tracking-title text-ink sm:text-size-3xl lg:w-1/3 lg:shrink-0">
          Projects
        </h1>
        <p className="max-w-reading font-heading text-size-base font-light text-ink sm:text-size-lg lg:flex-1">
          Software, hardware, experiments, and the decisions that shaped them.
        </p>
      </header>
      <section aria-label="Projects" className="mx-auto flex w-full max-w-5xl flex-col gap-6 sm:gap-8">
        {posts.map((post, index) => (
          <ProjectCard imageFirst={index % 2 === 0} key={post.slug} post={post} />
        ))}
      </section>
    </div>
  );
}

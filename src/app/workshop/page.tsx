import type { Metadata } from "next";
import { WorkshopFeatureCard } from "@/components/ui/workshop-feature-card";
import { getAllWorkshops } from "@/lib/content";
import { createPageMetadata } from "@/lib/metadata";

export function generateMetadata(): Metadata {
  return createPageMetadata({
    title: "Workshop | mindoff.work",
    description: "Software and hardware projects from mindoff.work.",
    path: "/workshop",
  });
}

export default function WorkshopPage() {
  const posts = getAllWorkshops();

  return (
    <div className="flex flex-col gap-16 px-4 py-12 sm:px-6 sm:py-16 lg:gap-24 lg:py-28">
      <header className="mx-auto flex  w-full max-w-4xl flex-col items-start gap-8 lg:flex-row">
        <h1 className="font-body text-size-3xl font-bold tracking-title text-ink lg:w-1/3 lg:shrink-0">
          Projects
        </h1>
        <p className="max-w-reading font-heading text-size-lg font-light text-ink sm:text-size-lg lg:flex-1">
          Software, hardware, experiments, and the decisions that shaped them.
        </p>
      </header>
      <section aria-label="Projects" className="mx-auto flex flex-col gap-8 w-full max-w-5xl">
        {posts.map((post) => (
          <WorkshopFeatureCard key={post.slug} post={post} />
        ))}
      </section>
    </div>
  );
}

import type { MetadataRoute } from "next";
import { getAllNotes, getAllProjects, getAllTags } from "@/lib/content";
import { absolutePageUrl } from "@/lib/metadata";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/projects", "/notes", "/about", "/policy"].map(
    (route) => ({
      url: absolutePageUrl(route),
    }),
  );
  const projectRoutes = getAllProjects().map((post) => ({
    url: absolutePageUrl(`/projects/${post.slug}`),
    lastModified: post.date,
  }));
  const noteRoutes = getAllNotes().map((post) => ({
    url: absolutePageUrl(`/notes/${post.slug}`),
    lastModified: post.date,
  }));
  const tagRoutes = getAllTags().map((tag) => ({
    url: absolutePageUrl(`/tags/${encodeURIComponent(tag)}`),
  }));

  return [...staticRoutes, ...projectRoutes, ...noteRoutes, ...tagRoutes];
}

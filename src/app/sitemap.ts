import type { MetadataRoute } from "next";
import { getAllNotes, getAllProjects, getAllTags } from "@/lib/content";
import { siteUrl } from "@/lib/metadata";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/projects", "/notes", "/about", "/policy"].map(
    (route) => ({
      url: `${siteUrl}${route}`,
    }),
  );
  const projectRoutes = getAllProjects().map((post) => ({
    url: `${siteUrl}/projects/${post.slug}`,
    lastModified: post.date,
  }));
  const noteRoutes = getAllNotes().map((post) => ({
    url: `${siteUrl}/notes/${post.slug}`,
    lastModified: post.date,
  }));
  const tagRoutes = getAllTags().map((tag) => ({
    url: `${siteUrl}/tags/${encodeURIComponent(tag)}`,
  }));

  return [...staticRoutes, ...projectRoutes, ...noteRoutes, ...tagRoutes];
}

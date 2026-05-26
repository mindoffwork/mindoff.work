import type { MetadataRoute } from "next";
import { getAllNotes, getAllTags, getAllWorkshops } from "@/lib/content";
import { siteUrl } from "@/lib/metadata";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/workshop", "/notes", "/about", "/terms"].map(
    (route) => ({
      url: `${siteUrl}${route}`,
    }),
  );
  const workshopRoutes = getAllWorkshops().map((post) => ({
    url: `${siteUrl}/workshop/${post.slug}`,
    lastModified: post.date,
  }));
  const noteRoutes = getAllNotes().map((post) => ({
    url: `${siteUrl}/notes/${post.slug}`,
    lastModified: post.date,
  }));
  const tagRoutes = getAllTags().map((tag) => ({
    url: `${siteUrl}/tags/${encodeURIComponent(tag)}`,
  }));

  return [...staticRoutes, ...workshopRoutes, ...noteRoutes, ...tagRoutes];
}

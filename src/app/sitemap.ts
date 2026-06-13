import type { MetadataRoute } from "next";
import { getAllNotes, getAllProjects } from "@/lib/content";
import { absolutePageUrl } from "@/lib/metadata";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const projects = getAllProjects();
  const notes = getAllNotes();

  const mostRecentProject = projects[0]?.date;
  const mostRecentNote = notes[0]?.date;
  const mostRecent =
    mostRecentProject && mostRecentNote
      ? new Date(mostRecentProject) > new Date(mostRecentNote)
        ? mostRecentProject
        : mostRecentNote
      : (mostRecentProject ?? mostRecentNote);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absolutePageUrl(""), lastModified: mostRecent },
    { url: absolutePageUrl("/projects"), lastModified: mostRecentProject },
    { url: absolutePageUrl("/notes"), lastModified: mostRecentNote },
    { url: absolutePageUrl("/about") },
  ];

  const projectRoutes = projects.map((post) => ({
    url: absolutePageUrl(`/projects/${post.slug}`),
    lastModified: post.date,
  }));
  const noteRoutes = notes.map((post) => ({
    url: absolutePageUrl(`/notes/${post.slug}`),
    lastModified: post.date,
  }));

  return [...staticRoutes, ...projectRoutes, ...noteRoutes];
}

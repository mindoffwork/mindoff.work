import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

import type {
  NotePost,
  NoteType,
  ProjectPost,
  ProjectStatus,
  ProjectType,
} from "./types";

const contentDirectory = path.join(process.cwd(), "src", "content");
const projectsDirectory = path.join(contentDirectory, "projects");
const notesDirectory = path.join(contentDirectory, "notes");

type ContentKind = "project" | "note";
type ContentPost = ProjectPost | NotePost;

const projectTypes = new Set<ProjectType>(["software", "hardware"]);
const projectStatuses = new Set<ProjectStatus>(["active", "archived"]);
const noteTypes = new Set<NoteType>(["essay", "snap"]);

function getMdxFiles(directory: string) {
  if (!fs.existsSync(directory)) {
    return [];
  }

  return fs
    .readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
    .map((entry) => entry.name);
}

function getSlugFromFilename(filename: string) {
  return filename.replace(/\.mdx$/, "");
}

function sortByDateDesc<T extends { date: string }>(posts: T[]) {
  return posts.sort(
    (first, second) =>
      new Date(second.date).getTime() - new Date(first.date).getTime(),
  );
}

function requireString(
  data: Record<string, unknown>,
  field: string,
  filepath: string,
) {
  const value = data[field];

  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`Missing required string frontmatter "${field}" in ${filepath}`);
  }

  return value;
}

function requireDateString(
  data: Record<string, unknown>,
  field: string,
  filepath: string,
) {
  const value = data[field];

  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }

  return requireString(data, field, filepath);
}

function optionalString(
  data: Record<string, unknown>,
  field: string,
  filepath: string,
) {
  const value = data[field];

  if (value === undefined) {
    return undefined;
  }

  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`Invalid optional string frontmatter "${field}" in ${filepath}`);
  }

  return value;
}

function optionalHexColor(data: Record<string, unknown>, filepath: string) {
  const value = data.color;

  if (value === undefined) {
    return undefined;
  }

  if (
    typeof value !== "string" ||
    !/^#(?:[\da-f]{3}|[\da-f]{4}|[\da-f]{6}|[\da-f]{8})$/i.test(value)
  ) {
    throw new Error(
      `Invalid optional hex frontmatter "color" in ${filepath}`,
    );
  }

  return value;
}

function optionalStringArray(
  data: Record<string, unknown>,
  field: string,
  maxItems: number,
  filepath: string,
) {
  const value = data[field];

  if (value === undefined) {
    return undefined;
  }

  if (
    !Array.isArray(value) ||
    value.length === 0 ||
    value.length > maxItems ||
    !value.every((item) => typeof item === "string" && item.trim() !== "")
  ) {
    throw new Error(
      `Invalid optional ${field}[] frontmatter (maximum ${maxItems}) in ${filepath}`,
    );
  }

  return value;
}

function requireTags(data: Record<string, unknown>, filepath: string) {
  const value = data.tags;

  if (
    !Array.isArray(value) ||
    value.length === 0 ||
    !value.every((tag) => typeof tag === "string" && tag.trim() !== "")
  ) {
    throw new Error(`Missing required tags[] frontmatter in ${filepath}`);
  }

  return value;
}

function requireUnion<T extends string>(
  data: Record<string, unknown>,
  field: string,
  allowed: Set<T>,
  filepath: string,
) {
  const value = data[field];

  if (typeof value !== "string" || !allowed.has(value as T)) {
    throw new Error(`Invalid frontmatter "${field}" in ${filepath}`);
  }

  return value as T;
}

function readContentFile<T extends ContentPost>(
  directory: string,
  slug: string,
  kind: ContentKind,
) {
  const filepath = path.join(directory, `${slug}.mdx`);

  if (!fs.existsSync(filepath)) {
    return undefined;
  }

  const source = fs.readFileSync(filepath, "utf8");
  const { content, data } = matter(source);
  const frontmatter = data as Record<string, unknown>;
  const basePost = {
    slug,
    title: requireString(frontmatter, "title", filepath),
    date: requireDateString(frontmatter, "date", filepath),
    tags: requireTags(frontmatter, filepath),
    summary: requireString(frontmatter, "summary", filepath),
    color: optionalHexColor(frontmatter, filepath),
    content,
  };

  if (kind === "project") {
    return {
      ...basePost,
      type: requireUnion(frontmatter, "type", projectTypes, filepath),
      purpose: requireString(frontmatter, "purpose", filepath),
      covers: optionalStringArray(frontmatter, "covers", 5, filepath),
      github: optionalString(frontmatter, "github", filepath),
      productUrl: optionalString(frontmatter, "productUrl", filepath),
      status: requireUnion(frontmatter, "status", projectStatuses, filepath),
    } as T;
  }

  return {
    ...basePost,
    type: requireUnion(frontmatter, "type", noteTypes, filepath),
    cover: optionalString(frontmatter, "cover", filepath),
  } as T;
}

function getAllFromDirectory<T extends ContentPost>(
  directory: string,
  kind: ContentKind,
) {
  const posts = getMdxFiles(directory)
    .map((filename) =>
      readContentFile<T>(directory, getSlugFromFilename(filename), kind),
    )
    .filter((post): post is T => post !== undefined);

  return sortByDateDesc(posts);
}

export function getAllProjects() {
  return getAllFromDirectory<ProjectPost>(projectsDirectory, "project");
}

export function getAllNotes() {
  return getAllFromDirectory<NotePost>(notesDirectory, "note");
}

export function getProject(slug: string) {
  return readContentFile<ProjectPost>(projectsDirectory, slug, "project");
}

export function getNote(slug: string) {
  return readContentFile<NotePost>(notesDirectory, slug, "note");
}

export function getAllTags() {
  const latestTags = new Map<string, number>();

  for (const post of sortByDateDesc([...getAllProjects(), ...getAllNotes()])) {
    const timestamp = new Date(post.date).getTime();

    for (const tag of post.tags) {
      latestTags.set(tag, Math.max(latestTags.get(tag) ?? 0, timestamp));
    }
  }

  return [...latestTags.entries()]
    .sort(([firstTag, firstDate], [secondTag, secondDate]) => {
      if (secondDate !== firstDate) {
        return secondDate - firstDate;
      }

      return firstTag.localeCompare(secondTag);
    })
    .map(([tag]) => tag);
}

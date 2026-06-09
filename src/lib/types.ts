export const projectTypes = ["python package", "hardware"] as const;
export const projectStatuses = ["active", "archived"] as const;
export const noteTypes = ["field note", "story", "guide", "snap"] as const;

export type ProjectType = (typeof projectTypes)[number];
export type ProjectStatus = (typeof projectStatuses)[number];

export type ProjectPost = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  type: ProjectType;
  summary: string;
  purpose: string;
  color?: string;
  covers?: string[];
  github?: string;
  productUrl?: string;
  status: ProjectStatus;
  content: string;
};

export type NoteType = (typeof noteTypes)[number];

export type NotePost = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  type: NoteType;
  summary: string;
  color?: string;
  cover?: string;
  content: string;
};

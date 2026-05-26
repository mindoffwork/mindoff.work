export type ProjectType = "software" | "hardware";
export type ProjectStatus = "active" | "archived";

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

export type NoteType = "essay" | "snap";

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

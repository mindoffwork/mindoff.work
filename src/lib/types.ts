export type WorkshopType = "software" | "hardware";
export type WorkshopStatus = "active" | "archived";

export type WorkshopPost = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  type: WorkshopType;
  summary: string;
  purpose: string;
  color?: string;
  covers?: string[];
  github?: string;
  productUrl?: string;
  status: WorkshopStatus;
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

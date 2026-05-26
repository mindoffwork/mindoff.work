import Image from "next/image";
import Link from "next/link";
import type { NotePost, ProjectPost } from "@/lib/types";
import { Tag } from "./tag";

type PostCardProps = {
  post: ProjectPost | NotePost;
};

function isProjectPost(post: ProjectPost | NotePost): post is ProjectPost {
  return "status" in post;
}

function getPostHref(post: ProjectPost | NotePost) {
  return isProjectPost(post)
    ? `/projects/${post.slug}`
    : `/notes/${post.slug}`;
}

export function PostCard({ post }: PostCardProps) {
  const cover = isProjectPost(post) ? post.covers?.[0] : post.cover;

  return (
    <Link
      aria-label={`Read ${post.title}`}
      className="group block rounded-sm py-6 transition-colors duration-fast ease-standard focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rule"
      href={getPostHref(post)}
    >
      <article className="flex flex-col-reverse gap-5 sm:flex-row sm:justify-between">
        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2 text-size-sm text-subtle">
            <time dateTime={post.date}>{post.date}</time>
            <span aria-hidden="true">/</span>
            <span className="capitalize">{post.type}</span>
          </div>
          <h2 className="font-heading text-size-xl font-semibold tracking-title text-ink transition-colors duration-fast ease-standard group-hover:text-muted">
            {post.title}
          </h2>
          <p className="max-w-reading text-size-base text-muted">{post.summary}</p>
          <div aria-label="Post tags" className="mt-1 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </div>
        </div>
        {cover ? (
          <div className="relative aspect-cover w-full shrink-0 overflow-hidden rounded-md bg-panel sm:w-40">
            <Image
              alt=""
              className="object-cover transition duration-fast ease-standard group-hover:opacity-90"
              fill
              sizes="(max-width: 639px) 100vw, 160px"
              src={cover}
              unoptimized
            />
          </div>
        ) : null}
      </article>
    </Link>
  );
}

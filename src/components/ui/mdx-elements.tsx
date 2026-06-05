import type { MDXComponents } from "mdx/types";
import { Children, isValidElement } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { CodeCopyButton } from "./code-copy-button";
import { MDXImage } from "./mdx-image";

type CodeFigureProps = ComponentPropsWithoutRef<"figure"> & {
  "data-rehype-pretty-code-figure"?: string;
};

type CodePreProps = ComponentPropsWithoutRef<"pre"> & {
  "data-language"?: string;
};

type HighlightedElementProps = {
  "data-language"?: string;
};

function getTextContent(children: ReactNode): string {
  return Children.toArray(children)
    .map((child) => {
      if (typeof child === "string" || typeof child === "number") {
        return String(child);
      }

      if (isValidElement<{ children?: ReactNode }>(child)) {
        return getTextContent(child.props.children);
      }

      return "";
    })
    .join("");
}

function getCodeLanguage(children: ReactNode): string {
  for (const child of Children.toArray(children)) {
    if (isValidElement<HighlightedElementProps>(child)) {
      const language = child.props["data-language"];

      if (language) {
        return language;
      }
    }
  }

  return "text";
}

function CodeFigure({
  children,
  "data-rehype-pretty-code-figure": highlighted,
  ...props
}: CodeFigureProps) {
  if (highlighted === undefined) {
    return <figure {...props}>{children}</figure>;
  }

  const language = getCodeLanguage(children);
  const code = getTextContent(children)
    .replace(/^[ \t]+$/gm, "")
    .replace(/\n$/, "");

  return (
    <figure
      {...props}
      className="my-8 overflow-hidden rounded-md border-normal border-rule bg-panel"
      data-rehype-pretty-code-figure=""
    >
      <div className="flex items-center justify-between border-b-normal border-rule bg-code px-3 py-2">
        <span className="font-heading text-size-xs font-semibold uppercase tracking-kicker text-subtle">
          {language}
        </span>
        <CodeCopyButton code={code} />
      </div>
      {children}
    </figure>
  );
}

function CodePre({ children, "data-language": language, ...props }: CodePreProps) {
  if (language) {
    return (
      <pre
        {...props}
        data-language={language}
        className="overflow-x-auto bg-panel p-4 text-size-sm text-ink [&_span]:text-[var(--shiki-light)] [[data-theme=dark]_&_span]:text-[var(--shiki-dark)]"
      >
        {children}
      </pre>
    );
  }

  return (
    <pre
      {...props}
      className="my-8 overflow-x-auto rounded-md border-normal border-rule bg-code p-4 text-size-sm text-ink [&_code]:block [&_code]:rounded-none [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-inherit"
    >
      {children}
    </pre>
  );
}

export const mdxComponents: MDXComponents = {
  h1: (props) => (
    <h1
      {...props}
      className="mb-5 mt-10 font-heading text-size-3xl font-extrabold tracking-title text-ink"
    />
  ),
  h2: (props) => (
    <h2
      {...props}
      className="mb-4 mt-10 font-heading text-size-xl font-extrabold tracking-title text-ink"
    />
  ),
  h3: (props) => (
    <h3
      {...props}
      className="mb-3 mt-8 font-heading text-size-lg font-bold tracking-title text-ink"
    />
  ),
  p: (props) => (
    <p {...props} className="my-4 text-size-base text-ink" />
  ),
  strong: (props) => (
    <strong {...props} className="font-bold text-ink" />
  ),
  ul: (props) => (
    <ul
      {...props}
      className="my-5 flex list-disc flex-col gap-2 pl-5 text-size-base text-ink"
    />
  ),
  ol: (props) => (
    <ol
      {...props}
      className="my-5 flex list-decimal flex-col gap-2 pl-5 text-size-base text-ink"
    />
  ),
  li: (props) => <li {...props} className="pl-1" />,
  blockquote: (props) => (
    <blockquote
      {...props}
      className="my-8 border-l-normal border-rule pl-5 text-size-lg text-ink [&_p]:my-0 [&_p]:text-ink"
    />
  ),
  a: (props) => (
    <a
      {...props}
      className="rounded-sm text-ink underline decoration-rule underline-offset-4 transition-colors duration-fast ease-standard hover:text-muted focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rule"
    />
  ),
  code: ({ className, ...props }) =>
    "data-language" in props ? (
      <code {...props} className={className} />
    ) : (
      <code
        {...props}
        className="rounded-sm bg-code px-1 py-0.5 text-size-sm text-ink"
      />
    ),
  pre: CodePre,
  figure: CodeFigure,
  img: ({ alt, src, ...props }) => {
    const imageProps = props as Omit<ComponentPropsWithoutRef<typeof MDXImage>, "alt" | "src">;

    return (
      <MDXImage
        {...imageProps}
        alt={alt ?? ""}
        height={675}
        sizes="100vw"
        src={typeof src === "string" ? src : ""}
        width={1200}
      />
    );
  },
};

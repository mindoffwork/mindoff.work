"use client";

import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";

type HashLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "onClick"
> & {
  children: ReactNode;
  href: `#${string}`;
};

export function HashLink({ children, href, ...props }: HashLinkProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    const target = document.getElementById(decodeURIComponent(href.slice(1)));

    if (!target) {
      return;
    }

    event.preventDefault();
    window.history.pushState(null, "", href);
    target.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
  }

  return (
    <a {...props} href={href} onClick={handleClick}>
      {children}
    </a>
  );
}

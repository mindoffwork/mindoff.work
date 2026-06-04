"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type MouseEvent,
} from "react";
import { normalizeInternalPath, startNavigation } from "@/lib/route-transition";

type SiteLinkProps = ComponentPropsWithoutRef<typeof NextLink>;

function resolveHref(href: SiteLinkProps["href"]) {
  if (typeof href === "string") {
    return href;
  }

  if (href instanceof URL) {
    return href.toString();
  }

  const pathname = href.pathname ?? "";
  const search =
    typeof href.query === "string" && href.query.length > 0
      ? `?${href.query}`
      : "";
  const hash = href.hash ?? "";

  return `${pathname}${search}${hash}`;
}

export const SiteLink = forwardRef<HTMLAnchorElement, SiteLinkProps>(
  function SiteLink(
    { href, onClick, prefetch, target, download, rel, ...props },
    ref,
  ) {
    const pathname = usePathname();

    function handleClick(event: MouseEvent<HTMLAnchorElement>) {
      onClick?.(event);

      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        download !== undefined ||
        (target !== undefined && target !== "_self")
      ) {
        return;
      }

      const resolvedHref = resolveHref(href);
      const nextPath = normalizeInternalPath(resolvedHref);

      if (
        !nextPath ||
        nextPath === pathname ||
        nextPath === "/rss.xml" ||
        rel === "external"
      ) {
        return;
      }

      startNavigation(resolvedHref);
    }

    return (
      <NextLink
        {...props}
        download={download}
        href={href}
        onClick={handleClick}
        prefetch={prefetch ?? false}
        ref={ref}
        rel={rel}
        target={target}
      />
    );
  },
);

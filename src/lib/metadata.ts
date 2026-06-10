import type { Metadata } from "next";

export const siteUrl = "https://mindoff.work";
export const siteTitle = "Mind Off Work";
export const defaultOgImage = "/images/og-default.png";
export const organizationId = `${siteUrl}#organization`;
export const websiteId = `${siteUrl}#website`;
export const siteDescription =
  "Open-source tools, research notes, and product experiments for designing quieter, lighter, more useful ways to work.";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
};

export function normalizePagePath(pathname: string) {
  if (!pathname.startsWith("/")) {
    pathname = `/${pathname}`;
  }

  if (pathname === "/") {
    return pathname;
  }

  const [pathWithoutHash, hash = ""] = pathname.split("#", 2);
  const [pathWithoutQuery, query = ""] = pathWithoutHash.split("?", 2);
  const lastSegment = pathWithoutQuery.split("/").filter(Boolean).at(-1) ?? "";
  const hasFileExtension = /\.[a-z0-9]+$/iu.test(lastSegment);

  if (hasFileExtension || pathWithoutQuery.endsWith("/")) {
    return pathname;
  }

  const normalizedPath = `${pathWithoutQuery}/`;
  const querySuffix = query ? `?${query}` : "";
  const hashSuffix = hash ? `#${hash}` : "";

  return `${normalizedPath}${querySuffix}${hashSuffix}`;
}

export function absoluteUrl(pathname: string) {
  return new URL(pathname, siteUrl).toString();
}

export function absolutePageUrl(pathname: string) {
  return absoluteUrl(normalizePagePath(pathname));
}

export function createPageMetadata({
  title,
  description,
  path,
  image = defaultOgImage,
}: PageMetadataInput): Metadata {
  const url = absolutePageUrl(path);
  const imageUrl = absoluteUrl(image);

  return {
    title,
    description,
    alternates: {
      canonical: url,
      types: {
        "application/rss+xml": absoluteUrl("/rss.xml"),
      },
    },
    openGraph: {
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      siteName: "mindoff.work",
      type: "website",
      url,
    },
  };
}

export function getPostOgImage(cover?: string) {
  return cover ?? defaultOgImage;
}

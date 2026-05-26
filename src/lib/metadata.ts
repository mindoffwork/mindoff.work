import type { Metadata } from "next";

export const siteUrl = "https://mindoff.work";
export const defaultOgImage = "/images/og-default.png";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
};

function absoluteUrl(pathname: string) {
  return new URL(pathname, siteUrl).toString();
}

export function createPageMetadata({
  title,
  description,
  path,
  image = defaultOgImage,
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);
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

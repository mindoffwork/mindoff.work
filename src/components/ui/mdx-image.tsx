"use client";

import type { ComponentPropsWithoutRef } from "react";
import { ExpandableImage } from "./expandable-image";

type MDXImageProps = Omit<ComponentPropsWithoutRef<typeof ExpandableImage>, "src" | "alt"> & {
  alt?: string;
  src: string;
};

export function MDXImage({
  alt = "",
  className,
  height = 675,
  sizes = "100vw",
  src,
  width = 1200,
  ...props
}: MDXImageProps) {
  return (
    <ExpandableImage
      {...props}
      alt={alt}
      className={["rounded-md transition-transform duration-300 ease-standard", className]
        .filter(Boolean)
        .join(" ")}
      height={height}
      sizes={sizes}
      src={src}
      width={width}
      wrapperAs="span"
      wrapperClassName="block align-top"
    />
  );
}

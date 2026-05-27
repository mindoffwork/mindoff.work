"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useRef, useState, type SyntheticEvent } from "react";

type LoadingImageProps = ImageProps & {
  imageClassName?: string;
  placeholderClassName?: string;
  wrapperClassName?: string;
};

type ImagePlaceholderProps = {
  absolute?: boolean;
  className?: string;
  shimmerActive?: boolean;
};

export function ImagePlaceholder({
  absolute = false,
  className,
  shimmerActive = true,
}: ImagePlaceholderProps) {
  const shimmerRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (!shimmerActive) {
      return;
    }

    const animation = shimmerRef.current?.animate(
      [
        { transform: "translateX(-220%) skewX(-24deg)", opacity: 0 },
        { transform: "translateX(-140%) skewX(-24deg)", opacity: 0.18, offset: 0.15 },
        { transform: "translateX(0%) skewX(-24deg)", opacity: 0.42, offset: 0.5 },
        { transform: "translateX(140%) skewX(-24deg)", opacity: 0.18, offset: 0.85 },
        { transform: "translateX(220%) skewX(-24deg)", opacity: 0 },
      ],
      {
        duration: 1050,
        easing: "cubic-bezier(0.4, 0, 0.2, 1)",
        iterations: Number.POSITIVE_INFINITY,
      },
    );

    return () => animation?.cancel();
  }, [shimmerActive]);

  return (
    <div
      aria-hidden="true"
      className={`${absolute ? "absolute inset-0" : "relative h-full w-full"} flex items-center justify-center rounded-inherit bg-transparent transition-opacity duration-fast ease-standard ${className ?? ""}`}
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-[28%] bg-[linear-gradient(90deg,transparent_0%,color-mix(in_srgb,var(--color-ink)_6%,transparent)_50%,transparent_100%)]"
        ref={shimmerRef}
      />
      <span
        aria-hidden="true"
        className="material-symbols-outlined relative z-10 text-size-3xl leading-none text-muted"
      >
        image
      </span>
    </div>
  );
}

export function LoadingImage({
  alt,
  className,
  imageClassName,
  onLoad,
  placeholderClassName,
  wrapperClassName,
  ...props
}: LoadingImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  function handleLoad(event: SyntheticEvent<HTMLImageElement>) {
    setIsLoaded(true);
    onLoad?.(event);
  }

  return (
    <div className={`relative overflow-hidden ${wrapperClassName ?? ""}`}>
      <ImagePlaceholder
        absolute
        className={`${
          isLoaded ? "opacity-0" : "opacity-100"
        } ${placeholderClassName ?? ""}`}
        shimmerActive={!isLoaded}
      />
      <Image
        {...props}
        alt={alt}
        className={`${className ?? ""} ${imageClassName ?? ""} transition-opacity duration-fast ease-standard ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`.trim()}
        onLoad={handleLoad}
      />
    </div>
  );
}

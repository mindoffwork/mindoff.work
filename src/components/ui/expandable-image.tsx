"use client";

import Image from "next/image";
import type { ImageProps } from "next/image";
import type { MouseEvent, ReactNode } from "react";
import { createElement, useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";

type ExpandableImageProps = Omit<ImageProps, "alt" | "src"> & {
  alt?: string;
  buttonLabel?: string;
  dialogImageClassName?: string;
  renderTrigger?: ReactNode;
  src: string;
  wrapperAs?: "div" | "span";
  wrapperClassName?: string;
};

export function ExpandableImage({
  alt = "",
  buttonLabel = "Expand image",
  className,
  dialogImageClassName,
  height = 675,
  renderTrigger,
  sizes = "100vw",
  src,
  width = 1200,
  wrapperAs = "div",
  wrapperClassName,
  ...props
}: ExpandableImageProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dialogTitleId = useId();

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const { body } = document;
    const previousOverflow = body.style.overflow;

    body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  function openViewer(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    setIsOpen(true);
  }

  function closeViewer() {
    setIsOpen(false);
  }

  const trigger = renderTrigger ?? (
    <span className="block w-full overflow-hidden rounded-md bg-canvas">
      <Image
        {...props}
        alt={alt}
        className={["block h-auto w-full", className].filter(Boolean).join(" ")}
        height={height}
        sizes={sizes}
        src={src}
        unoptimized
        width={width}
      />
    </span>
  );

  return (
    <>
      {createElement(
        wrapperAs,
        {
          className: ["group relative my-8 w-full", wrapperClassName]
            .filter(Boolean)
            .join(" "),
        },
        <>
          {trigger}
          <button
            type="button"
            aria-label={buttonLabel}
            className="absolute right-3 top-3 inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-normal border-rule bg-canvas/90 text-ink opacity-0 shadow-sm backdrop-blur-sm transition-all duration-300 ease-standard group-hover:opacity-100 group-focus-within:opacity-100 hover:bg-canvas focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rule [@media(hover:none)]:opacity-100"
            onClick={openViewer}
          >
            <span
              aria-hidden="true"
              className="material-symbols-outlined text-size-xl leading-none"
            >
              open_in_full
            </span>
          </button>
        </>,
      )}

      {isOpen && typeof document !== "undefined"
        ? createPortal(
            <div
              aria-labelledby={dialogTitleId}
              aria-modal="true"
              className="fixed inset-0 z-[60] flex items-center justify-center bg-black/82 p-4 opacity-100 transition-opacity duration-300 ease-standard sm:p-6"
              role="dialog"
              onClick={closeViewer}
            >
              <h2 className="sr-only" id={dialogTitleId}>
                {alt || "Expanded image"}
              </h2>
              <button
                type="button"
                aria-label="Close image viewer"
                className="absolute right-4 top-4 inline-flex h-11 w-11 translate-y-0 cursor-pointer items-center justify-center rounded-full border-normal border-rule bg-canvas/92 text-ink opacity-100 shadow-sm backdrop-blur-sm transition-all duration-300 ease-standard hover:bg-canvas focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rule sm:right-6 sm:top-6"
                onClick={(event) => {
                  event.stopPropagation();
                  closeViewer();
                }}
              >
                <span
                  aria-hidden="true"
                  className="material-symbols-outlined text-size-xl leading-none"
                >
                  close
                </span>
              </button>

              <div
                className={[
                  "relative transition-all duration-300 ease-standard",
                  "scale-100 opacity-100",
                ].join(" ")}
                onClick={(event) => event.stopPropagation()}
              >
                <div className="max-h-[88vh] max-w-full overflow-hidden rounded-md bg-canvas">
                  <Image
                    {...props}
                    alt={alt}
                    className={[
                      "block h-auto max-h-[88vh] w-auto max-w-full",
                      dialogImageClassName,
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    height={height}
                    sizes="100vw"
                    src={src}
                    unoptimized
                    width={width}
                  />
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}

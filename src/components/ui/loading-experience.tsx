"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ImagePlaceholder } from "@/components/ui/loading-image";
import {
  finishNavigation,
  startNavigation,
  useRouteTransition,
  type RouteSkeletonKey,
} from "@/lib/route-transition";

const splashMinimumDurationMs = 1800;
const splashFadeDurationMs = 220;
const skeletonRevealDelayMs = 110;
const progressFinishDurationMs = 180;

type ProgressStage = "idle" | "enter" | "mid" | "late" | "done";

function SkeletonBlock({ className }: { className: string }) {
  return <div className={`animate-pulse rounded-lg bg-loading-skeleton ${className}`} />;
}

function HomeSkeleton() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-24 px-4 pt-16 pb-24 sm:px-6 sm:pt-20 lg:gap-32 lg:pt-28 lg:pb-32">
      <section className="flex flex-col gap-10">
        <div className="flex flex-col gap-3">
          <SkeletonBlock className="h-12 w-48 sm:h-16 sm:w-64 lg:h-20 lg:w-80" />
          <SkeletonBlock className="h-12 w-56 sm:h-16 sm:w-72 lg:h-20 lg:w-96" />
        </div>
        <SkeletonBlock className="h-8 w-full max-w-reading" />
      </section>
      <section className="flex flex-col gap-6">
        <SkeletonBlock className="h-4 w-28 rounded-full" />
        <div className="overflow-hidden rounded-2xl bg-loading-skeleton-muted">
            <div className="flex flex-col gap-12 p-6 sm:gap-16 sm:p-12 lg:gap-20 lg:p-16">
            <SkeletonBlock className="h-4 w-20 rounded-full bg-loading-skeleton-strong" />
            <div className="flex items-end justify-between gap-8">
              <div className="flex flex-col gap-4">
                <SkeletonBlock className="h-9 w-52 bg-loading-skeleton-strong sm:h-12 sm:w-80" />
                <SkeletonBlock className="h-5 w-full max-w-sm bg-loading-skeleton-strong sm:h-7" />
              </div>
              <SkeletonBlock className="hidden h-10 w-10 rounded-full bg-loading-skeleton-strong sm:block" />
            </div>
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-6">
        <SkeletonBlock className="h-4 w-28 rounded-full" />
        <div className="border-t-normal border-rule">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              className="flex items-center justify-between gap-6 border-b-normal border-rule py-5"
              key={index}
            >
              <SkeletonBlock className="h-8 w-full max-w-xl" />
              <div className="hidden items-center gap-5 sm:flex">
                <SkeletonBlock className="h-4 w-16 rounded-full" />
                <SkeletonBlock className="h-4 w-16 rounded-full" />
                <SkeletonBlock className="h-7 w-7 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function ProjectsListSkeleton() {
  return (
    <div className="flex flex-col gap-12 px-4 py-8 sm:gap-16 sm:px-6 sm:py-16 lg:gap-24 lg:py-28">
      <header className="mx-auto flex w-full max-w-4xl flex-col items-start gap-8 lg:flex-row">
        <SkeletonBlock className="h-9 w-36 sm:h-11 sm:w-40 lg:w-1/3 lg:max-w-52 lg:shrink-0" />
        <div className="flex max-w-reading flex-1 flex-col gap-4">
          <SkeletonBlock className="h-7 w-full" />
          <SkeletonBlock className="h-7 w-5/6" />
        </div>
      </header>
      <section className="mx-auto flex w-full max-w-5xl flex-col gap-6 sm:gap-8">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            className="overflow-hidden rounded-2xl bg-loading-skeleton-muted"
            key={index}
          >
            <div className="flex flex-col lg:flex-row">
              <ImagePlaceholder className="aspect-cover min-h-64 w-full rounded-none lg:w-1/2 lg:shrink-0" />
              <div className="flex min-h-full flex-1 flex-col justify-between gap-6 p-5 sm:gap-8 sm:p-8 lg:gap-10 lg:p-10 xl:p-12">
                <div className="flex flex-col gap-2">
                  <SkeletonBlock className="h-10 w-3/4 bg-loading-skeleton-strong" />
                  <SkeletonBlock className="h-6 w-1/2 bg-loading-skeleton-strong" />
                </div>
                <SkeletonBlock className="h-8 w-8 rounded-full bg-loading-skeleton-strong" />
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

function NotesListSkeleton() {
  return (
    <div className="flex flex-col gap-16 px-4 py-12 sm:px-6 sm:py-16 lg:gap-24 lg:py-28">
      <header className="mx-auto flex w-full max-w-4xl flex-col items-start gap-8 lg:flex-row">
        <SkeletonBlock className="h-11 w-32 lg:w-1/3 lg:max-w-44 lg:shrink-0" />
        <div className="flex max-w-reading flex-1 flex-col gap-4">
          <SkeletonBlock className="h-7 w-full" />
          <SkeletonBlock className="h-7 w-full" />
          <SkeletonBlock className="h-7 w-4/5" />
        </div>
      </header>
      <section className="mx-auto grid w-full max-w-6xl auto-rows-fr grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => {
          const hasImage = index % 2 === 0;

          return (
            <div
              className="overflow-hidden rounded-2xl bg-loading-skeleton-muted"
              key={index}
            >
              <div className="flex h-full flex-col">
                {hasImage ? (
                  <div className="aspect-note-cover px-4 pt-4 sm:px-6 sm:pt-6">
                    <ImagePlaceholder className="h-full w-full" />
                  </div>
                ) : null}
                <div
                  className={`flex flex-1 flex-col gap-8 p-6 sm:p-8 ${
                    hasImage ? "justify-end" : "min-h-80 justify-between"
                  }`}
                >
                  <div className="flex flex-col gap-4">
                    <SkeletonBlock className="h-8 w-5/6 bg-loading-skeleton-strong" />
                    <SkeletonBlock className="h-5 w-2/5 bg-loading-skeleton-strong" />
                  </div>
                  {!hasImage ? (
                    <SkeletonBlock className="h-8 w-8 rounded-full bg-loading-skeleton-strong" />
                  ) : null}
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}

function GenericPageSkeleton() {
  return (
    <div className="mx-auto flex w-full max-w-reading flex-col gap-12 px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
      <header className="flex flex-col gap-6">
        <SkeletonBlock className="h-4 w-16 rounded-full bg-loading-skeleton-strong" />
        <SkeletonBlock className="h-12 w-2/5 bg-loading-skeleton-strong" />
        <div className="flex flex-col gap-4">
          <SkeletonBlock className="h-7 w-full bg-loading-skeleton-strong" />
          <SkeletonBlock className="h-7 w-5/6 bg-loading-skeleton-strong" />
        </div>
      </header>
      <div className="flex flex-col gap-10">
        {Array.from({ length: 3 }).map((_, index) => (
          <section className="flex flex-col gap-6" key={index}>
            <SkeletonBlock className="h-8 w-40 bg-loading-skeleton-strong" />
            <div className="flex flex-col gap-4">
              <SkeletonBlock className="h-7 w-full bg-loading-skeleton-strong" />
              <SkeletonBlock className="h-7 w-full bg-loading-skeleton-strong" />
              <SkeletonBlock className="h-7 w-4/5 bg-loading-skeleton-strong" />
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function ProjectDetailSkeleton() {
  return (
    <div className="flex w-full flex-col">
      <div className="flex justify-center px-4 py-10 sm:px-6 lg:pt-28 lg:pb-24">
        <div className="flex w-full max-w-reading flex-col items-center gap-6 text-center">
          <SkeletonBlock className="h-5 w-20 rounded-full bg-loading-skeleton-strong" />
          <SkeletonBlock className="h-14 w-full max-w-xl bg-loading-skeleton-strong sm:h-16" />
          <SkeletonBlock className="h-8 w-full max-w-reading bg-loading-skeleton-strong" />
          <div className="flex flex-wrap justify-center gap-3">
            <SkeletonBlock className="h-12 w-36 rounded-full bg-loading-skeleton-strong" />
            <SkeletonBlock className="h-12 w-36 rounded-full bg-loading-skeleton-strong" />
          </div>
        </div>
      </div>
      <section className="border-y-normal border-rule bg-loading-skeleton-muted p-3">
        <div className="flex flex-wrap gap-3">
          <ImagePlaceholder className="aspect-cover min-h-64 w-full" />
          <ImagePlaceholder className="aspect-cover min-h-48 w-full sm:w-[calc(50%-0.375rem)]" />
          <ImagePlaceholder className="aspect-cover min-h-48 w-full sm:w-[calc(50%-0.375rem)]" />
        </div>
      </section>
      <section className="mx-auto flex w-full max-w-reading flex-col gap-8 px-4 py-16 sm:px-6 sm:py-20">
        <SkeletonBlock className="h-9 w-32 bg-loading-skeleton-strong" />
        <div className="flex flex-col gap-4">
          <SkeletonBlock className="h-7 w-full bg-loading-skeleton-strong" />
          <SkeletonBlock className="h-7 w-full bg-loading-skeleton-strong" />
          <SkeletonBlock className="h-7 w-3/4 bg-loading-skeleton-strong" />
        </div>
        <div className="flex flex-wrap gap-2">
          <SkeletonBlock className="h-9 w-24 rounded-full bg-loading-skeleton-strong" />
          <SkeletonBlock className="h-9 w-28 rounded-full bg-loading-skeleton-strong" />
          <SkeletonBlock className="h-9 w-20 rounded-full bg-loading-skeleton-strong" />
        </div>
      </section>
      <section className="border-y-normal border-rule bg-loading-skeleton-muted">
        <div className="mx-auto flex w-full max-w-media flex-col gap-10 px-4 py-12 sm:flex-row sm:px-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <div className="flex flex-1 flex-col items-center gap-3" key={index}>
              <SkeletonBlock className="h-4 w-16 rounded-full bg-loading-skeleton-strong" />
              <SkeletonBlock className="h-7 w-28 bg-loading-skeleton-strong" />
            </div>
          ))}
        </div>
      </section>
      <div className="mx-auto flex w-full max-w-reading flex-col gap-5 px-4 py-12 sm:px-6">
        <SkeletonBlock className="h-7 w-full bg-loading-skeleton-strong" />
        <SkeletonBlock className="h-7 w-full bg-loading-skeleton-strong" />
        <SkeletonBlock className="h-7 w-5/6 bg-loading-skeleton-strong" />
        <SkeletonBlock className="h-36 w-full bg-loading-skeleton-strong" />
      </div>
    </div>
  );
}

function NoteDetailSkeleton() {
  return (
    <div className="flex w-full flex-col">
      <header className="flex justify-center px-4 py-12 sm:px-6 sm:py-16 lg:pt-24 lg:pb-20">
        <div className="flex w-full max-w-reading flex-col gap-8">
          <div className="flex flex-wrap items-center gap-3">
            <SkeletonBlock className="h-5 w-16 rounded-full bg-loading-skeleton-strong" />
            <SkeletonBlock className="h-5 w-24 rounded-full bg-loading-skeleton-strong" />
            <SkeletonBlock className="h-5 w-28 rounded-full bg-loading-skeleton-strong" />
          </div>
          <SkeletonBlock className="h-14 w-full bg-loading-skeleton-strong sm:h-16" />
        </div>
      </header>
      <section className="border-y-normal border-rule bg-loading-skeleton-muted px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-media">
          <ImagePlaceholder className="aspect-cover min-h-72 w-full" />
        </div>
      </section>
      <div className="mx-auto flex w-full max-w-reading flex-col gap-5 px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
        <SkeletonBlock className="h-8 w-full bg-loading-skeleton-strong" />
        <SkeletonBlock className="h-7 w-full bg-loading-skeleton-strong" />
        <SkeletonBlock className="h-7 w-full bg-loading-skeleton-strong" />
        <SkeletonBlock className="h-7 w-11/12 bg-loading-skeleton-strong" />
        <SkeletonBlock className="mt-8 h-px w-full rounded-none bg-loading-skeleton-strong" />
        <div className="flex flex-wrap gap-2 pt-2">
          <SkeletonBlock className="h-9 w-24 rounded-full bg-loading-skeleton-strong" />
          <SkeletonBlock className="h-9 w-20 rounded-full bg-loading-skeleton-strong" />
          <SkeletonBlock className="h-9 w-28 rounded-full bg-loading-skeleton-strong" />
        </div>
      </div>
    </div>
  );
}

function RouteSkeleton({ routeKey }: { routeKey: RouteSkeletonKey | null }) {
  switch (routeKey) {
    case "home":
      return <HomeSkeleton />;
    case "projects-list":
      return <ProjectsListSkeleton />;
    case "notes-list":
      return <NotesListSkeleton />;
    case "project-detail":
      return <ProjectDetailSkeleton />;
    case "note-detail":
      return <NoteDetailSkeleton />;
    case "generic-page":
      return <GenericPageSkeleton />;
    default:
      return null;
  }
}

export function LoadingExperience() {
  const pathname = usePathname();
  const { isNavigating, routeKey, targetPath } = useRouteTransition();
  const [isSplashExiting, setIsSplashExiting] = useState(false);
  const [isSkeletonReady, setIsSkeletonReady] = useState(false);
  const [progressVisible, setProgressVisible] = useState(() => false);
  const [progressStage, setProgressStage] = useState<ProgressStage>("idle");

  const overlayTitle = useMemo(() => {
    if (!targetPath) {
      return "Loading next page";
    }

    return `Loading ${targetPath}`;
  }, [targetPath]);

  useEffect(() => {
    const root = document.documentElement;
    const isFreshLoad = root.dataset.freshLoad === "true";

    if (!isFreshLoad) {
      return;
    }

    const exitTimer = window.setTimeout(() => {
      setIsSplashExiting(true);
    }, splashMinimumDurationMs);

    const hideTimer = window.setTimeout(() => {
      delete root.dataset.freshLoad;
      setIsSplashExiting(false);
    }, splashMinimumDurationMs + splashFadeDurationMs);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      startNavigation(window.location.pathname);
    };

    window.addEventListener("popstate", handlePopState);

    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    finishNavigation(pathname);
  }, [pathname]);

  useEffect(() => {
    if (isNavigating) {
      const startTimer = window.setTimeout(() => {
        setProgressVisible(true);
        setProgressStage("enter");
      }, 0);

      const accelerateTimer = window.setTimeout(() => {
        setProgressStage("mid");
      }, 40);

      const driftTimer = window.setTimeout(() => {
        setProgressStage("late");
      }, 220);

      return () => {
        window.clearTimeout(startTimer);
        window.clearTimeout(accelerateTimer);
        window.clearTimeout(driftTimer);
      };
    }

    if (!progressVisible) {
      return;
    }

    const completeTimer = window.setTimeout(() => {
      setProgressStage("done");
    }, 0);

    const resetTimer = window.setTimeout(() => {
      setProgressVisible(false);
      setProgressStage("idle");
    }, progressFinishDurationMs);

    return () => {
      window.clearTimeout(completeTimer);
      window.clearTimeout(resetTimer);
    };
  }, [isNavigating, progressVisible]);

  const progressTransformClassName =
    progressStage === "enter"
      ? "scale-x-[0.12]"
      : progressStage === "mid"
        ? "scale-x-[0.68]"
        : progressStage === "late"
          ? "scale-x-[0.86]"
          : progressStage === "done"
            ? "scale-x-100"
            : "scale-x-0";

  useEffect(() => {
    if (!isNavigating) {
      const resetTimer = window.setTimeout(() => {
        setIsSkeletonReady(false);
      }, 0);

      return () => window.clearTimeout(resetTimer);
    }

    const revealTimer = window.setTimeout(() => {
      setIsSkeletonReady(true);
    }, skeletonRevealDelayMs);

    return () => window.clearTimeout(revealTimer);
  }, [isNavigating]);

  const showSkeleton = isNavigating && isSkeletonReady;

  useEffect(() => {
    const root = document.documentElement;
    const { body } = document;

    if (!showSkeleton) {
      return;
    }

    const previousRootOverflow = root.style.overflow;
    const previousBodyOverflow = body.style.overflow;

    root.style.overflow = "hidden";
    body.style.overflow = "hidden";

    return () => {
      root.style.overflow = previousRootOverflow;
      body.style.overflow = previousBodyOverflow;
    };
  }, [showSkeleton]);

  return (
    <>
      <div
        aria-hidden="true"
        className={`pointer-events-none fixed inset-x-0 top-0 z-loading-progress transition-opacity duration-fast ease-standard ${
          progressVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          className={`h-[var(--loading-progress-height)] origin-left bg-loading-progress transition-transform duration-[260ms] ease-out ${progressTransformClassName}`}
        />
      </div>

      <div
        aria-hidden="true"
        className={`pointer-events-none fixed inset-y-0 left-0 right-0 z-loading-overlay overflow-y-auto overscroll-contain bg-canvas transition-opacity duration-fast ease-standard lg:left-nav ${
          showSkeleton ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="min-h-full pt-nav-logo-mobile lg:pt-nav-logo">
          <RouteSkeleton routeKey={showSkeleton ? routeKey : null} />
        </div>
      </div>

      <div
        aria-hidden="true"
        className={`pointer-events-none fixed inset-0 z-loading-splash flex items-center justify-center bg-canvas px-6 opacity-0 transition-opacity duration-[220ms] ease-standard [[data-fresh-load=true]_&]:opacity-100 ${
          isSplashExiting ? "!opacity-0" : ""
        }`}
      >
        <figure
          className={`flex items-center justify-center transform transition-transform duration-300 ease-standard ${
            isSplashExiting ? "scale-0" : "scale-100"
          }`}
        >
          <Image
            alt="MindOff logo"
            className="h-auto w-40 object-contain animate-heartbeat sm:w-44"
            height={73}
            loading="eager"
            src="/images/brand/MindOff_Logo_Full.png"
            width={192}
          />
          <figcaption className="sr-only">MindOff logo</figcaption>
        </figure>
        <span className="sr-only">{overlayTitle}</span>
      </div>
    </>
  );
}

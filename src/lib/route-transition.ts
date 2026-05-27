"use client";

import { useSyncExternalStore } from "react";

export type RouteSkeletonKey =
  | "home"
  | "projects-list"
  | "notes-list"
  | "generic-page"
  | "project-detail"
  | "note-detail";

type RouteTransitionState = {
  isNavigating: boolean;
  routeKey: RouteSkeletonKey | null;
  targetPath: string | null;
};

const listeners = new Set<() => void>();

let state: RouteTransitionState = {
  isNavigating: false,
  routeKey: null,
  targetPath: null,
};

function emitChange() {
  listeners.forEach((listener) => listener());
}

export function normalizeInternalPath(href: string) {
  try {
    const url = new URL(href, window.location.origin);

    if (url.origin !== window.location.origin) {
      return null;
    }

    return url.pathname;
  } catch {
    return null;
  }
}

export function getRouteSkeletonKey(pathname: string): RouteSkeletonKey {
  if (pathname === "/") {
    return "home";
  }

  if (pathname === "/projects") {
    return "projects-list";
  }

  if (pathname === "/notes") {
    return "notes-list";
  }

  if (pathname.startsWith("/projects/")) {
    return "project-detail";
  }

  if (pathname.startsWith("/notes/")) {
    return "note-detail";
  }

  return "generic-page";
}

export function startNavigation(href: string) {
  const targetPath = normalizeInternalPath(href);

  if (!targetPath) {
    return;
  }

  state = {
    isNavigating: true,
    routeKey: getRouteSkeletonKey(targetPath),
    targetPath,
  };

  emitChange();
}

export function finishNavigation(pathname: string) {
  if (!state.isNavigating) {
    return;
  }

  state = {
    isNavigating: false,
    routeKey: null,
    targetPath: pathname,
  };

  emitChange();
}

function subscribe(listener: () => void) {
  listeners.add(listener);

  return () => listeners.delete(listener);
}

function getSnapshot() {
  return state;
}

export function useRouteTransition() {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

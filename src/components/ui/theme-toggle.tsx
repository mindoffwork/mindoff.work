"use client";

import { useSyncExternalStore } from "react";
import { browserThemeColors } from "@/lib/theme";

const themeStorageKey = "mindoff-theme";
const themeChangeEvent = "mindoff-theme-change";

function subscribeToTheme(onStoreChange: () => void) {
  window.addEventListener(themeChangeEvent, onStoreChange);
  return () => window.removeEventListener(themeChangeEvent, onStoreChange);
}

function isDarkThemeSelected() {
  return document.documentElement.dataset.theme === "dark";
}

function updateBrowserThemeColor(isDarkMode: boolean) {
  const selectedThemeColor = isDarkMode
    ? browserThemeColors.dark
    : browserThemeColors.light;
  const themeColorElements = document.querySelectorAll('meta[name="theme-color"]');

  themeColorElements.forEach((themeColorElement) => {
    themeColorElement.setAttribute("content", selectedThemeColor);
  });
}

export function ThemeToggle() {
  const isDarkMode = useSyncExternalStore(
    subscribeToTheme,
    isDarkThemeSelected,
    () => false,
  );

  function toggleDarkMode() {
    const nextIsDarkMode = !isDarkThemeSelected();

    if (nextIsDarkMode) {
      document.documentElement.dataset.theme = "dark";
    } else {
      delete document.documentElement.dataset.theme;
    }

    updateBrowserThemeColor(nextIsDarkMode);

    try {
      window.localStorage.setItem(
        themeStorageKey,
        nextIsDarkMode ? "dark" : "light",
      );
    } catch {
      // Theme toggling remains available when storage is unavailable.
    }

    window.dispatchEvent(new Event(themeChangeEvent));
  }

  return (
    <button
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDarkMode}
      className="group relative flex size-10 cursor-pointer items-center justify-center rounded-lg text-muted transition-colors duration-fast ease-standard hover:bg-nav-selection hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
      onClick={toggleDarkMode}
      type="button"
    >
      <span
        aria-hidden="true"
        className="material-symbols-outlined text-size-xl leading-none"
      >
        {isDarkMode ? "light_mode" : "dark_mode"}
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-full right-0 z-10 mt-3 translate-y-1 whitespace-nowrap rounded-lg border-normal border-tooltip-rule bg-ink px-3 py-2 font-heading text-size-sm font-medium text-canvas opacity-0 transition-all duration-fast ease-standard group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 lg:top-auto lg:right-auto lg:left-full lg:mt-0 lg:ml-3 lg:translate-x-1 lg:translate-y-0 lg:group-hover:translate-x-0 lg:group-focus-visible:translate-x-0"
      >
        {isDarkMode ? "Light mode" : "Dark mode"}
      </span>
    </button>
  );
}

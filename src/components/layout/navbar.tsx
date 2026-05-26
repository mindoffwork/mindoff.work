"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";

const navItems = [
  { href: "/workshop", icon: "handyman", label: "Workshop" },
  { href: "/notes", icon: "description", label: "Notes" },
  { href: "/about", icon: "info", label: "About" },
];

const themeStorageKey = "mindoff-theme";
const themeChangeEvent = "mindoff-theme-change";

function subscribeToTheme(onStoreChange: () => void) {
  window.addEventListener(themeChangeEvent, onStoreChange);

  return () => window.removeEventListener(themeChangeEvent, onStoreChange);
}

function isDarkThemeSelected() {
  return document.documentElement.dataset.theme === "dark";
}

export function Navbar() {
  const pathname = usePathname();
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
    <header className="fixed inset-y-0 left-0 z-20 flex w-nav flex-col border-r-normal border-rule bg-canvas">
      <Link
        aria-label="mindoff.work home"
        className="relative z-10 flex h-nav-logo w-nav-logo shrink-0 items-center justify-center rounded-br-nav-logo border-r-normal border-b-normal border-rule bg-brand transition-opacity duration-fast ease-standard hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-ink"
        href="/"
      >
        <Image
          alt=""
          className="size-brand-mark object-contain"
          height={36}
          priority
          src="/images/brand/MindOff_Logo_Icon.png"
          width={36}
        />
      </Link>
      <nav
        aria-label="Primary navigation"
        className="flex flex-1 flex-col items-center justify-center gap-6 pb-nav"
      >
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              aria-current={isActive ? "page" : undefined}
              className={`flex size-10 items-center justify-center rounded-lg transition-colors duration-fast ease-standard focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${
                isActive
                  ? "bg-nav-selection text-ink"
                  : "text-muted hover:bg-nav-selection hover:text-ink"
              }`}
              href={item.href}
              key={item.href}
            >
              <span
                aria-hidden="true"
                className="material-symbols-outlined text-size-xl leading-none"
              >
                {item.icon}
              </span>
              <span className="sr-only">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="flex shrink-0 justify-center pb-6">
        <button
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          aria-pressed={isDarkMode}
          className="flex size-10 items-center justify-center rounded-lg text-muted transition-colors duration-fast ease-standard hover:bg-nav-selection hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          onClick={toggleDarkMode}
          type="button"
        >
          <span
            aria-hidden="true"
            className="material-symbols-outlined text-size-xl leading-none"
          >
            {isDarkMode ? "light_mode" : "dark_mode"}
          </span>
        </button>
      </div>
    </header>
  );
}

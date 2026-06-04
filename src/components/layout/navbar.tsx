"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { SiteLink } from "@/components/ui/site-link";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const navItems = [
  { href: "/projects", icon: "handyman", label: "Projects" },
  { href: "/notes", icon: "description", label: "Notes" },
  { href: "/about", icon: "info", label: "About" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="pointer-events-none fixed inset-0 z-nav lg:inset-y-0 lg:right-auto lg:flex lg:w-nav lg:flex-col lg:border-r-normal lg:border-rule lg:bg-canvas">
      <SiteLink
        aria-label="mindoff.work home"
        className="group pointer-events-auto relative z-10 flex h-nav-logo-mobile w-nav-logo-mobile shrink-0 items-center justify-center rounded-br-nav-logo border-r-normal border-b-normal border-rule bg-brand focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-ink lg:h-nav-logo lg:w-nav-logo"
        href="/"
      >
        <Image
          alt=""
          className="size-brand-mark-mobile object-contain transition-opacity duration-fast ease-standard group-hover:opacity-80 lg:size-brand-mark"
          height={36}
          loading="eager"
          src="/images/brand/MindOff_Logo_Icon.png"
          width={36}
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-full left-0 z-10 mt-3 translate-y-1 rounded-lg border-normal border-tooltip-rule bg-ink px-3 py-2 font-heading text-size-sm font-medium text-canvas opacity-0 transition-all duration-fast ease-standard group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 lg:top-auto lg:left-full lg:mt-0 lg:ml-3 lg:translate-x-1 lg:translate-y-0 lg:group-hover:translate-x-0 lg:group-focus-visible:translate-x-0"
        >
          Home
        </span>
      </SiteLink>
      <nav
        aria-label="Primary navigation"
        className="pointer-events-auto fixed inset-x-0 bottom-0 flex h-nav items-center justify-evenly border-t-normal bottom-b-normal border-rule bg-canvas/50 backdrop-blur-3xl lg:static lg:flex-1 lg:flex-col lg:justify-center lg:gap-6 lg:border-t-0 lg:border-b-0 lg:bg-transparent lg:pb-nav"
      >
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <SiteLink
              aria-current={isActive ? "page" : undefined}
              className={`group relative flex size-10 items-center justify-center rounded-lg transition-colors duration-fast ease-standard focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${
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
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-3 -translate-x-1/2 translate-y-1 rounded-lg border-normal border-tooltip-rule bg-ink px-3 py-2 font-heading text-size-sm font-medium text-canvas opacity-0 transition-all duration-fast ease-standard group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 lg:bottom-auto lg:left-full lg:mb-0 lg:ml-3 lg:translate-x-1 lg:translate-y-0 lg:group-hover:translate-x-0 lg:group-focus-visible:translate-x-0"
              >
                {item.label}
              </span>
            </SiteLink>
          );
        })}
      </nav>
      <div className="pointer-events-auto hidden lg:flex lg:shrink-0 lg:justify-center lg:pb-6">
        <ThemeToggle />
      </div>
    </header>
  );
}

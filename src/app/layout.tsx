import type { Metadata } from "next";
import { Poltawski_Nowy, Poppins } from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { LoadingExperience } from "@/components/ui/loading-experience";
import { createPageMetadata, siteUrl } from "@/lib/metadata";
import "../styles/globals.css";

const firstPaintInitializer = `
try {
  var root = document.documentElement;
  var storedTheme = window.localStorage.getItem("mindoff-theme");
  var navigationEntry = window.performance
    ? window.performance.getEntriesByType("navigation")[0]
    : null;

  window.addEventListener("pageshow", function (event) {
    if (event.persisted) {
      window.location.reload();
    }
  });

  if (navigationEntry && navigationEntry.type === "back_forward") {
    window.location.reload();
  }

  if (storedTheme === "dark") {
    root.dataset.theme = "dark";
    root.style.backgroundColor = "#080808";
    root.style.colorScheme = "dark";
  } else if (storedTheme === "light") {
    delete root.dataset.theme;
    root.style.backgroundColor = "#faf5ee";
    root.style.colorScheme = "light";
  }
} catch {}
`;

const initialSplashStyles = `
html {
  background: #faf5ee;
  color-scheme: light;
}

html[data-fresh-load="true"] body {
  overflow: hidden;
}

html[data-theme="dark"] {
  background: #080808;
  color-scheme: dark;
}

html[data-fresh-load="true"] [data-site-shell] {
  visibility: hidden;
}

[data-loading-splash] {
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background: var(--color-background, #faf5ee);
  opacity: 0;
  pointer-events: none;
  transition: opacity 220ms ease;
}

html[data-theme="dark"][data-fresh-load="true"] [data-loading-splash] {
  background: var(--color-background, #080808);
}

html[data-theme="dark"][data-fresh-load="true"] [data-loading-splash-logo] {
  background: var(--color-yellow, #f7ec87);
  border-radius: 2rem;
}

html[data-fresh-load="true"] [data-loading-splash] {
  opacity: 1;
}

[data-loading-splash-logo] {
  padding: 0.75rem 1rem;
}

[data-loading-splash] img {
  width: min(11rem, 45vw);
  height: auto;
}

@media (min-width: 640px) {
  [data-loading-splash-logo] {
    padding: 1rem 1.25rem;
  }

  [data-loading-splash] img {
    width: 12rem;
  }
}
`;

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const poltawskiNowy = Poltawski_Nowy({
  subsets: ["latin"],
  variable: "--font-poltawski-nowy",
  weight: "variable",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  ...createPageMetadata({
    title: "mindoff.work",
    description: "Projects, essays, and snapshots from mindoff.work.",
    path: "/",
  }),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      data-fresh-load="true"
      lang="en"
      className={`${poppins.variable} ${poltawskiNowy.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: firstPaintInitializer }} />
        <style dangerouslySetInnerHTML={{ __html: initialSplashStyles }} />
        <noscript>
          <style>{`
            html[data-fresh-load="true"] [data-site-shell] {
              visibility: visible;
            }

            html[data-fresh-load="true"] [data-loading-splash] {
              display: none;
            }
          `}</style>
        </noscript>
        {/* Material Symbols is an icon font and is not provided by next/font/google. */}
        {/* eslint-disable-next-line @next/next/google-font-display, @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,600,0,0&amp;display=block"
          rel="stylesheet"
        />
      </head>
      <body className="flex min-h-screen flex-col bg-canvas pb-nav font-body text-ink antialiased lg:pb-0 lg:pl-nav">
        <LoadingExperience />
        <div className="flex min-h-screen flex-col pb-nav lg:pb-0" data-site-shell="">
          <Navbar />
          <main className="flex-1 pt-nav-logo-mobile transition-[opacity,transform] duration-[220ms] ease-standard motion-reduce:transition-none sm:pt-0 [[data-route-transition=active]_&]:translate-y-1 [[data-route-transition=active]_&]:opacity-90 [[data-route-transition=active]_&]:motion-reduce:translate-y-0 [[data-route-transition=active]_&]:motion-reduce:opacity-100">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

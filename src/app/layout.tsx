import type { Metadata } from "next";
import { Poltawski_Nowy, Poppins } from "next/font/google";
import Script from "next/script";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { createPageMetadata, siteUrl } from "@/lib/metadata";
import "../styles/globals.css";

const themeInitializer = `
try {
  if (window.localStorage.getItem("mindoff-theme") === "dark") {
    document.documentElement.dataset.theme = "dark";
  }
} catch {}
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
    <html lang="en" className={`${poppins.variable} ${poltawskiNowy.variable}`}>
      <head>
        <Script
          dangerouslySetInnerHTML={{ __html: themeInitializer }}
          id="theme-initializer"
          strategy="beforeInteractive"
        />
        {/* Material Symbols is an icon font and is not provided by next/font/google. */}
        {/* eslint-disable-next-line @next/next/google-font-display, @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,600,0,0&amp;display=block"
          rel="stylesheet"
        />
      </head>
      <body className="flex min-h-screen flex-col bg-canvas pl-nav font-body text-ink antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

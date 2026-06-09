"use client";

import { Poltawski_Nowy, Poppins } from "next/font/google";
import { ErrorState } from "@/components/ui/error-state";
import { siteTitle } from "@/lib/metadata";
import "../styles/globals.css";

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

export default function GlobalError({
  unstable_retry,
}: {
  unstable_retry: () => void;
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${poltawskiNowy.variable}`}>
      <body className="flex min-h-screen flex-col bg-canvas font-body text-ink antialiased">
        <main className="flex flex-1 items-center">
          <ErrorState
            actions={[{ href: "/", label: "Return home" }]}
            code="500 / Error"
            description="The site could not be displayed right now. Try again, or return to the homepage."
            heading="Something went wrong."
            onRetry={() => unstable_retry()}
            title={`Something Went Wrong | ${siteTitle}`}
          />
        </main>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";

type LegalSection = {
  id: string;
  title: string;
  paragraphs: string[];
};

const legalSections: LegalSection[] = [
  {
    id: "terms",
    title: "Terms of use",
    paragraphs: [
      "mindoff.work is a personal website for sharing projects, notes, and experiments. You may browse and link to public pages for lawful personal or professional reference.",
      "Unless otherwise noted, original writing and visuals published on mindoff.work are licensed under Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0). You may share and adapt that material for noncommercial purposes with appropriate credit and a link to the license.",
      "Code, project repositories, third-party material, trademarks, and assets identified with separate terms are not covered by this Creative Commons license and remain subject to their applicable rights and licenses.",
      "Links to repositories, tools, or other websites are provided for convenience. Their content and terms remain the responsibility of their owners.",
    ],
  },
  {
    id: "privacy",
    title: "Privacy",
    paragraphs: [
      "This site does not require accounts or collect personal information through forms. If you contact mindoff.work using the details on the About page, the information you provide will be used only as reasonably needed to respond.",
      "Your light or dark theme preference may be stored locally in your browser. The static hosting provider and external websites you choose to visit may process limited technical information under their own policies.",
    ],
  },
  {
    id: "disclaimer",
    title: "Disclaimer",
    paragraphs: [
      "Projects and notes are shared for information, learning, and inspiration. Nothing on this site should be treated as legal, financial, medical, security, or other professional advice.",
      "Material may change or become outdated over time. You are responsible for evaluating any ideas, code, or linked resources before relying on them in your own work.",
    ],
  },
];

export function generateMetadata(): Metadata {
  return createPageMetadata({
    title: "Terms & Privacy | mindoff.work",
    description:
      "Terms of use, privacy information, and disclaimers for mindoff.work.",
    path: "/terms",
  });
}

export default function TermsPage() {
  return (
    <div className="flex flex-col gap-16 px-4 py-12 sm:px-6 sm:py-16 lg:gap-24 lg:py-28">
      <header className="mx-auto flex w-full max-w-reading flex-col items-start gap-8">
        <h1 className="font-body text-size-2xl font-bold tracking-title text-ink sm:text-size-3xl">
          Terms &amp; Privacy
        </h1>
        <div className="flex max-w-reading flex-col gap-5 lg:flex-1">
          <p className="font-heading text-size-base font-light text-ink sm:text-size-lg">
            A brief guide to using mindoff.work, privacy on the site, and the
            limits of the material shared here.
          </p>
          <p className="font-heading text-size-sm text-muted">
            Last updated May 27, 2026.
          </p>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-reading flex-col ">
        {legalSections.map((section) => (
          <section
            aria-labelledby={`${section.id}-title`}
            className="flex flex-col gap-6 py-10 first:pt-0 first:border-t-0 sm:py-12"
            id={section.id}
            key={section.id}
          >
            <h2
              className="font-heading text-size-xl font-bold tracking-title text-ink"
              id={`${section.id}-title`}
            >
              {section.title}
            </h2>
            <div className="flex flex-col gap-5 text-size-base text-ink">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import { HashLink } from "@/components/ui/hash-link";
import { SiteLink } from "@/components/ui/site-link";
import { createPageMetadata } from "@/lib/metadata";

type PolicySection = {
  id: string;
  title: string;
  body: string[];
  bullets?: string[];
  short: string;
};

const lastUpdated = "June 4, 2026";
const ccByLicenseUrl = "https://creativecommons.org/licenses/by/4.0/";
const ccByBadgeUrl = "https://licensebuttons.net/l/by/4.0/88x31.png";

const featuredLinks = [
  { href: "#privacy", label: "#Privacy" },
  { href: "#cookies", label: "#Cookies" },
  { href: "#license", label: "#License" },
  { href: "#projects", label: "#Projects" },
  { href: "#disclaimer", label: "#Disclaimer" },
] as const;

const policySections: PolicySection[] = [
  {
    id: "privacy",
    title: "1. Privacy",
    body: [
      "mindoff.work is a small personal website, not an account-based product. You do not need to sign up, log in, leave a comment, join a newsletter, or send any personal information to read the projects and notes here.",
      "If you choose to contact mindoff.work by email, GitHub, or another external channel, I may receive the name, handle, email address, message, or attachment you decide to share. I use that only to understand the message, reply to you, and keep enough context to manage the conversation.",
      "For example: if you send a correction about a note, your email address is used to reply to that correction. It is not added to a marketing list or sold to anyone.",
      "You can ask for direct correspondence to be updated or deleted where it is practical. Some records may remain if they are needed for security, backup integrity, legal compliance, or ordinary record-keeping.",
    ],
    bullets: [
      "No visitor accounts are created here.",
      "No personal data is sold here.",
      "No contact details are used for mailing lists unless a separate opt-in is added later.",
    ],
    short:
      "Read freely. If you reach out, your details are used to reply, not to track you around.",
  },
  {
    id: "cookies",
    title: "2. Cookies and local storage",
    body: [
      "The site remembers your light or dark theme choice in browser local storage under the key mindoff-theme. That preference stays on your device so the page can open in the right theme the next time you visit.",
      "mindoff.work does not currently set analytics, advertising, tracking, login, or affiliate cookies. There is no hidden dashboard trying to guess who you are. If that ever changes, this policy should be updated before those tools are enabled.",
      "Your browser, device, network provider, static hosting provider, font provider, and any external websites you open may still process basic technical information such as IP address, user agent, request time, referring page, or error logs under their own policies.",
      "You can clear local storage and cookies from your browser settings whenever you like. Clearing them may reset the theme preference, but it will not block access to the public content.",
    ],
    short:
      "The site remembers your theme locally. It does not currently use analytics or ad cookies.",
  },
  {
    id: "license",
    title: "3. Content license",
    body: [
      "Most things published directly on mindoff.work are meant to be useful beyond this site. Unless a page, file, repository, image credit, or embedded third-party source says otherwise, original writing, notes, essays, snapshots, and creator-made open images are licensed under Creative Commons Attribution 4.0 International (CC BY 4.0).",
      "That means you may copy, share, translate, adapt, remix, and use the content commercially. The license includes attribution, but I am not asking for ceremony: a simple credit to mindoff.work with a link to the source page is enough, and mentioning meaningful changes is appreciated where it helps readers.",
      "Please do not imply endorsement, authorship, partnership, or official approval unless permission is given separately.",
    ],
    bullets: [
      "You may use notes and original site writing commercially.",
      "You may use creator-made open images commercially.",
      "You may translate, quote, adapt, remix, or build on the content.",
      "A light credit is appreciated and keeps reuse clear for everyone.",
    ],
    short:
      "Use the original notes, writing, and open images, even commercially. A simple credit is enough; no stiff attribution ritual needed.",
  },
  {
    id: "projects",
    title: "4. Projects, code, and third-party material",
    body: [
      "Project pages often talk about software, tools, experiments, screenshots, benchmarks, libraries, documentation, or repositories. The write-up on mindoff.work follows the content license above unless it says otherwise.",
      "The actual project may have a different license. Source code, packages, documentation sites, repository files, and downloadable releases follow the license shipped with that project, such as its LICENSE file, package metadata, documentation license, or platform terms.",
      "Third-party assets, services, trademarks, product names, libraries, icons, fonts, screenshots, embeds, and linked resources belong to their respective owners and follow their own licenses and terms.",
    ],
    short:
      "The story about a project may be CC BY 4.0, but the project itself follows its own license.",
  },
  {
    id: "responsibility",
    title: "5. User responsibility",
    body: [
      "Please use the site and its content responsibly. Do not use mindoff.work content to mislead people, impersonate the site, run scams, strip attribution in a way that breaks the license, or suggest an association that does not exist.",
      "If you reuse anything here, you are responsible for checking whether it fits your jurisdiction, product, publication, client work, safety context, and licensing needs.",
      "If you notice a security issue, broken credit, mistaken attribution, or possible rights concern, please get in touch so it can be reviewed and corrected if needed.",
    ],
    short:
      "Reuse is welcome. Just be honest, careful, and responsible with it.",
  },
  {
    id: "disclaimer",
    title: "6. Disclaimer",
    body: [
      "mindoff.work is shared for learning, reflection, and inspiration. The notes and project write-ups are opinionated, shaped by personal experience, experiments, research, and the state of the work when they were written.",
      "I try to be thoughtful and accurate, but mistakes happen and older posts can become less useful over time. What worked for one project, tool, workflow, or season of life may not work for yours.",
      "Nothing here should be treated as medical, legal, financial, safety, or other professional advice, especially for decisions where the stakes are high. Please double-check important decisions with trusted sources or qualified people before relying on anything here.",
      "The site and its content are provided as is, without warranties or guarantees. To the fullest extent allowed by law, mindoff.work and its creator are not liable for losses, damages, injuries, claims, costs, data loss, or other consequences from using the site, relying on its content, reusing licensed material, or visiting linked external resources.",
    ],
    short:
      "This is personal, opinionated material shared in good faith. Verify before relying on it, and use it at your own risk.",
  },
  {
    id: "external-links",
    title: "7. External links",
    body: [
      "The site may link to GitHub, package registries, documentation, references, social profiles, image sources, or other third-party websites. Those links are there to give context or point you toward useful material.",
      "External websites are not controlled by mindoff.work. Their content, availability, security, privacy practices, commercial terms, licenses, and claims are their own responsibility.",
      "Some external links may be affiliate, sponsored, or otherwise commercially connected. When that is the case, I may mention it near the relevant content so readers can judge the link with the right context. Affiliate links should not add extra cost to you, but you should still verify products, services, and sellers before making a decision.",
    ],
    short:
      "Links are useful, but they lead to someone else's place. Check their rules before relying on or buying anything.",
  },
  {
    id: "updates",
    title: "8. Updates to this policy",
    body: [
      "This policy may change as the site changes, especially if new routes, contact flows, analytics, cookies, licensing choices, sponsorships, or publishing formats are introduced.",
      "The current version will live at /policy. The last updated date below is the easiest way to know whether anything has changed.",
    ],
    short:
      "This page should say what the site actually does. If the site changes, this should change too.",
  },
];

export function generateMetadata(): Metadata {
  return createPageMetadata({
    title: "Terms & Privacy | mindoff.work",
    description:
      "Policy for terms of use, privacy, cookies, licensing, and disclaimers for mindoff.work.",
    path: "/policy",
  });
}

export default function PolicyPage() {
  return (
    <div className="flex flex-col gap-14 px-8 py-12 sm:px-6 sm:py-16 lg:gap-20 lg:py-28">
      <header className="mx-auto flex w-full max-w-reading flex-col items-start gap-8">
        <h1 className="font-body text-size-2xl font-bold tracking-title text-ink sm:text-size-3xl">
          Terms &amp; Privacy
        </h1>
        <div className="flex max-w-reading flex-col gap-5">
          <p className="font-heading text-size-base font-light text-ink sm:text-size-lg">
            A plain-language note on privacy, cookies, content reuse, project
            licenses, and the limits of personal, opinionated writing shared on
            mindoff.work.
          </p>
          <p className="font-heading text-size-sm text-muted">
            Last updated {lastUpdated}.
          </p>
        </div>
        <nav
          aria-label="Important policy sections"
          className="flex flex-wrap gap-x-5 gap-y-3 py-5 font-heading text-size-sm text-muted"
        >
          {featuredLinks.map((link) => (
            <HashLink
              className="rounded-sm underline decoration-rule underline-offset-4 transition-colors duration-fast ease-standard hover:bg-nav-selection hover:text-ink focus-visible:bg-nav-selection focus-visible:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rule"
              href={link.href}
              key={link.href}
            >
              {link.label}
            </HashLink>
          ))}
        </nav>
      </header>

      <div className="mx-auto flex w-full max-w-reading flex-col">
        <article className="flex min-w-0 flex-col">
          {policySections.map((section) => (
            <section
              aria-labelledby={`${section.id}-title`}
              className="flex flex-col gap-6 border-t-normal border-rule py-10 first:border-t-0 first:pt-0 sm:py-12"
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
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.id === "license" ? (
                  <a
                    className="inline-flex w-fit items-center gap-2 rounded-sm transition-opacity duration-fast ease-standard hover:opacity-75 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rule"
                    href={ccByLicenseUrl}
                    rel="license noreferrer"
                    target="_blank"
                  >
                    <Image
                      alt="Creative Commons Attribution 4.0 International License"
                      height={31}
                      src={ccByBadgeUrl}
                      unoptimized
                      width={88}
                    />
                    <span
                      aria-hidden="true"
                      className="material-symbols-outlined text-size-base leading-none text-muted"
                    >
                      open_in_new
                    </span>
                  </a>
                ) : null}
                {section.bullets ? (
                  <ul className="flex list-disc flex-col gap-3 pl-6">
                    {section.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
                <aside className="rounded-lg bg-[var(--color-policy-note-background)] px-5 py-4 font-heading leading-relaxed text-size-sm text-muted">
                  <p>
                    <span className="text-ink block font-semibold">TL;DR:</span>{" "}
                    {section.short}
                  </p>
                </aside>
              </div>
            </section>
          ))}

          <section
            aria-labelledby="contact-title"
            className="flex flex-col gap-6 border-t-normal border-rule py-10 sm:py-12"
            id="contact"
          >
            <h2
              className="font-heading text-size-xl font-bold tracking-title text-ink"
              id="contact-title"
            >
              9. Contact
            </h2>
            <div className="flex flex-col gap-5 text-size-base text-ink">
              <p>
                If you have a privacy request, licensing question, correction,
                security report, or rights concern, use the{" "}
                <SiteLink
                  className="rounded-sm underline decoration-rule underline-offset-4 transition-colors duration-fast ease-standard hover:bg-nav-selection hover:text-ink focus-visible:bg-nav-selection focus-visible:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rule"
                  href="/about#contact"
                >
                  contact details on the About page
                </SiteLink>
                .
              </p>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}

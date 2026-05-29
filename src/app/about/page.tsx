import type { Metadata } from "next";
import { LoadingImage } from "@/components/ui/loading-image";
import { createPageMetadata } from "@/lib/metadata";

export function generateMetadata(): Metadata {
  return createPageMetadata({
    title: "About | mindoff.work",
    description:
      "About the product engineer behind MindOff, sharing open source projects, research, notes, and ideas for simpler work and life.",
    path: "/about",
  });
}

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-16  py-12 sm:py-16 lg:gap-24 lg:py-28">
      <header className="mx-auto flex w-full max-w-4xl flex-col items-start gap-8 px-8 sm:px-6 lg:flex-row">
        <h1 className="font-body text-size-2xl font-bold tracking-title text-ink sm:text-size-3xl lg:w-1/3 lg:shrink-0">
          About
        </h1>
        <p className="max-w-reading font-heading text-size-base font-light text-ink sm:text-size-lg lg:flex-1">
          Hi, I&apos;m Joel Samraj, a product engineer. MindOff is where I
          share the things I design, build, and learn along the way.
        </p>
      </header>

      <figure className="flex justify-center border-y-normal border-rule bg-brand px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
        <LoadingImage
          alt="mindoff"
          height={731}
          imageClassName="h-auto w-full max-w-about-logo object-contain"
          sizes="18rem"
          src="/images/brand/MindOff_Logo_Full.png"
          unoptimized
          width={1921}
          wrapperClassName="w-full max-w-about-logo"
        />
      </figure>

      <section
        aria-label="About mindoff"
        className="mx-auto w-full max-w-reading px-8 sm:px-6"
      >
        <div className="flex max-w-reading flex-col gap-6 text-size-sm sm:text-size-base leading-relaxed text-ink">
          <p>
            I started this space to keep a record of my projects, discoveries,
            and the ways I approach making things. Much of my work is research
            and development: exploring an idea, building it out, and refining
            it into something useful and simple.
          </p>
          <p>
            I share it in the open because ideas are more useful when others
            can learn from them and take them further. If something here helps
            you build something of your own, that is enough for me.
          </p>
          <div className="mt-2 flex flex-col items-start gap-4 font-heading text-size-sm font-semibold text-ink sm:flex-row sm:gap-8">
            <a
              className="rounded-sm underline decoration-rule underline-offset-4 transition-colors duration-fast ease-standard hover:text-muted focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rule"
              href="https://github.com/mindoffwork"
              rel="noreferrer"
              target="_blank"
            >
              GitHub / mindoffwork
            </a>
            <p aria-label="Email person at mindoff dot work">
              person [at] mindoff [dot] work
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

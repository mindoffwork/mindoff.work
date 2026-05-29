import { getActionButtonClassName } from "@/components/ui/action-button";
import { SiteLink } from "@/components/ui/site-link";

type ErrorAction = {
  href: string;
  label: string;
  primary?: boolean;
};

type ErrorStateProps = {
  actions: ErrorAction[];
  code: string;
  description: string;
  heading: string;
  onRetry?: () => void;
  title: string;
};

export function ErrorState({
  actions,
  code,
  description,
  heading,
  onRetry,
  title,
}: ErrorStateProps) {
  return (
    <>
      <title>{title}</title>
      <section
        aria-labelledby="error-title"
        className="mx-auto flex w-full max-w-reading flex-col items-start gap-10 px-8 py-16 sm:px-6 sm:py-24 lg:py-32"
      >
        <p className="font-heading text-size-xs font-semibold uppercase tracking-kicker text-muted">
          {code}
        </p>
        <div className="flex flex-col gap-5">
          <h1
            className="font-heading text-size-4xl font-black tracking-title text-ink sm:text-size-5xl"
            id="error-title"
          >
            {heading}
          </h1>
          <p className="max-w-reading font-body text-size-base text-ink">
            {description}
          </p>
        </div>
        <nav
          aria-label="Recovery options"
          className="flex flex-wrap gap-4 font-heading text-size-sm font-semibold"
        >
          {onRetry ? (
            <button
              className={`${getActionButtonClassName("primary")} cursor-pointer`}
              onClick={onRetry}
              type="button"
            >
              Try again
            </button>
          ) : null}
          {actions.map((action) => (
            <SiteLink
              className={getActionButtonClassName(
                action.primary ? "primary" : "secondary",
              )}
              href={action.href}
              key={action.href}
            >
              {action.label}
            </SiteLink>
          ))}
        </nav>
      </section>
    </>
  );
}

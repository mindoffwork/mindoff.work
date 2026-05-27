export type ActionButtonVariant = "primary" | "secondary" | "tinted-primary";

const actionButtonBaseClassName =
  "inline-flex items-center rounded-lg px-5 py-3 font-heading text-size-sm font-semibold transition-shadow duration-fast ease-standard hover:shadow-[inset_0_0_0_9999px_color-mix(in_srgb,var(--color-ink)_6%,transparent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rule";

export function getActionButtonClassName(variant: ActionButtonVariant) {
  if (variant === "primary") {
    return `${actionButtonBaseClassName} bg-brand text-brand-ink`;
  }

  if (variant === "tinted-primary") {
    return `${actionButtonBaseClassName} text-ink`;
  }

  return `${actionButtonBaseClassName} bg-[var(--color-action-background)] text-ink`;
}

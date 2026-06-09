"use client";

import { ErrorState } from "@/components/ui/error-state";
import { siteTitle } from "@/lib/metadata";

export default function ErrorPage({
  unstable_retry,
}: {
  unstable_retry: () => void;
}) {
  return (
    <ErrorState
      actions={[{ href: "/", label: "Return home" }]}
      code="500 / Error"
      description="This page could not be displayed right now. Try again, or return to the homepage."
      heading="Something went wrong."
      onRetry={() => unstable_retry()}
      title={`Something Went Wrong | ${siteTitle}`}
    />
  );
}

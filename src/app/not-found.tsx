import { ErrorState } from "@/components/ui/error-state";
import { siteTitle } from "@/lib/metadata";

export default function NotFound() {
  return (
    <ErrorState
      actions={[
        { href: "/", label: "Return home", primary: true },
        { href: "/projects", label: "Browse projects" },
      ]}
      code="404 / Not found"
      description="The page you were looking for does not exist or may have moved."
      heading="Page not found."
      title={`Page Not Found | ${siteTitle}`}
    />
  );
}

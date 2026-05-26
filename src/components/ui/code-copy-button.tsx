"use client";

import { useEffect, useRef, useState } from "react";

type CodeCopyButtonProps = {
  code: string;
};

type CopyStatus = "idle" | "copied" | "error";

export function CodeCopyButton({ code }: CodeCopyButtonProps) {
  const [status, setStatus] = useState<CopyStatus>("idle");
  const resetTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  useEffect(() => {
    return () => {
      if (resetTimeout.current) {
        clearTimeout(resetTimeout.current);
      }
    };
  }, []);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setStatus("copied");
    } catch {
      setStatus("error");
    }

    if (resetTimeout.current) {
      clearTimeout(resetTimeout.current);
    }

    resetTimeout.current = setTimeout(() => {
      setStatus("idle");
    }, 2000);
  }

  const label =
    status === "copied" ? "Copied" : status === "error" ? "Copy failed" : "Copy";

  return (
    <button
      className="rounded-sm px-2 py-1 font-heading text-size-xs text-muted transition-colors duration-fast ease-standard hover:bg-code hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rule"
      onClick={handleCopy}
      type="button"
    >
      <span aria-live="polite">{label}</span>
    </button>
  );
}

"use client";

import { useEffect } from "react";

type MobileThemeControlSurfaceProps = {
  color: string;
};

const lightSurfaceVariable = "--mobile-theme-control-background";
const darkSurfaceVariable = "--mobile-theme-control-background-dark";

export function MobileThemeControlSurface({
  color,
}: MobileThemeControlSurfaceProps) {
  const darkSurfaceColor = `color-mix(in oklch, ${color} var(--surface-tint-dark-weight), var(--color-background))`;

  useEffect(() => {
    const root = document.documentElement;

    root.style.setProperty(lightSurfaceVariable, color);
    root.style.setProperty(darkSurfaceVariable, darkSurfaceColor);

    return () => {
      root.style.removeProperty(lightSurfaceVariable);
      root.style.removeProperty(darkSurfaceVariable);
    };
  }, [color, darkSurfaceColor]);

  return null;
}

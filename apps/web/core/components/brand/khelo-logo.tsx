/**
 * Copyright (c) 2026 JIST and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { JistMark } from "./jist-mark";

type Props = {
  className?: string;
  alt?: string;
  markOnly?: boolean;
};

/** JIST lockup used on auth and brand surfaces. */
export function KheloLogo({ className = "h-8", alt = "JIST", markOnly = false }: Props) {
  const heightClass = className.includes("h-") ? className : `h-8 ${className}`;

  if (markOnly) {
    return <JistMark className={heightClass} title={alt} />;
  }

  return (
    <span className={`inline-flex items-center gap-2.5 text-[#1A102B] ${heightClass}`} aria-label={alt}>
      <JistMark className="aspect-square h-full w-auto shrink-0" title="" />
      <span className="leading-none font-semibold tracking-[-0.04em]" style={{ fontSize: "0.92em" }}>
        JIST
      </span>
    </span>
  );
}

export const JistLogo = KheloLogo;

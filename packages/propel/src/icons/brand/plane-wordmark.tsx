/**
 * Copyright (c) 2026 JIST and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { ISvgIcons } from "../type";

/** JIST wordmark text (API-compatible name). */
export function PlaneWordmark({ width = "72", height = "28", className, color = "currentColor" }: ISvgIcons) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 72 28"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="JIST"
      role="img"
    >
      <text
        x="0"
        y="22"
        fontFamily="ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif"
        fontSize="22"
        fontWeight="700"
        letterSpacing="-0.04em"
        fill={color}
      >
        JIST
      </text>
    </svg>
  );
}

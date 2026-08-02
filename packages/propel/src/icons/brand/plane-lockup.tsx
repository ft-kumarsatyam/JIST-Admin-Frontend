/**
 * Copyright (c) 2026 JIST and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { ISvgIcons } from "../type";

/** JIST mark + wordmark. Name kept for API compatibility. */
export function PlaneLockup({ width, height = 32, className }: ISvgIcons) {
  const h = typeof height === "number" ? height : Number.parseInt(String(height), 10) || 32;
  const w =
    width != null ? (typeof width === "number" ? width : Number.parseInt(String(width), 10) || undefined) : undefined;

  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: Math.max(8, Math.round(h * 0.28)),
        height: h,
        width: w,
        color: "currentColor",
      }}
      aria-label="JIST"
    >
      <svg width={h} height={h} viewBox="0 0 64 64" aria-hidden="true" className="shrink-0">
        <defs>
          <linearGradient id="jistPropelGrad" x1="12" y1="4" x2="56" y2="60" gradientUnits="userSpaceOnUse">
            <stop stopColor="#8B5CF6" />
            <stop offset="1" stopColor="#6532B8" />
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="16" fill="url(#jistPropelGrad)" />
        <path
          d="M36.5 16.5c0-1.1.9-2 2-2h2.2c1.1 0 2 .9 2 2v24.2c0 7.4-5.5 12.8-13.4 12.8-6.2 0-11.2-3.2-13.1-8.2-.3-.9.3-1.8 1.2-1.8h3.1c.7 0 1.3.4 1.5 1.1 1.1 2.7 3.8 4.4 7.3 4.4 4.6 0 7.4-3 7.4-8.1V16.5Z"
          fill="#FFFFFF"
        />
        <circle cx="18" cy="46" r="3.2" fill="#F4EEFD" opacity="0.95" />
      </svg>
      <span
        style={{
          fontSize: Math.round(h * 0.58),
          fontWeight: 650,
          letterSpacing: "-0.04em",
          lineHeight: 1,
        }}
      >
        JIST
      </span>
    </span>
  );
}

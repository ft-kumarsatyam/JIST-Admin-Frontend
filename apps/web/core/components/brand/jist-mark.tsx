/**
 * Copyright (c) 2026 JIST and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

type Props = {
  className?: string;
  title?: string;
};

/**
 * JIST brand mark — rounded tile + crisp "J" letterform.
 * Designed for high clarity at 16–64px (Linear/Zoho-style simplicity).
 */
export function JistMark({ className = "size-8", title }: Props) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role={title ? "img" : "presentation"}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="jistMarkGrad" x1="12" y1="4" x2="56" y2="60" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8B5CF6" />
          <stop offset="1" stopColor="#6532B8" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill="url(#jistMarkGrad)" />
      <path
        d="M36.5 16.5c0-1.1.9-2 2-2h2.2c1.1 0 2 .9 2 2v24.2c0 7.4-5.5 12.8-13.4 12.8-6.2 0-11.2-3.2-13.1-8.2-.3-.9.3-1.8 1.2-1.8h3.1c.7 0 1.3.4 1.5 1.1 1.1 2.7 3.8 4.4 7.3 4.4 4.6 0 7.4-3 7.4-8.1V16.5Z"
        fill="#FFFFFF"
      />
      <circle cx="18" cy="46" r="3.2" fill="#F4EEFD" opacity="0.95" />
    </svg>
  );
}

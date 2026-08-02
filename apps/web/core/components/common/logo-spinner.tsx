/**
 * Copyright (c) 2026 JIST and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

type Props = {
  size?: number;
  className?: string;
  label?: boolean;
};

/** Full-app JIST loader — calm purple orbit around the brand mark. */
export function LogoSpinner({ size = 56, className = "", label = false }: Props) {
  const ring = Math.round(size * 1.35);
  const mark = Math.round(size * 0.72);

  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 ${className}`}
      role="status"
      aria-label="Loading JIST"
    >
      <div className="relative flex items-center justify-center" style={{ width: ring, height: ring }}>
        <svg className="jist-loader-orbit absolute inset-0" viewBox="0 0 100 100" fill="none" aria-hidden="true">
          <circle cx="50" cy="50" r="46" stroke="#E6D7FB" strokeWidth="3" />
          <circle
            cx="50"
            cy="50"
            r="46"
            stroke="#753FC9"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="26 260"
          />
        </svg>
        <svg width={mark} height={mark} viewBox="0 0 64 64" className="relative drop-shadow-sm" aria-hidden="true">
          <defs>
            <linearGradient id="jistLoaderGrad" x1="12" y1="4" x2="56" y2="60" gradientUnits="userSpaceOnUse">
              <stop stopColor="#8B5CF6" />
              <stop offset="1" stopColor="#6532B8" />
            </linearGradient>
          </defs>
          <rect width="64" height="64" rx="16" fill="url(#jistLoaderGrad)" />
          <path
            d="M36.5 16.5c0-1.1.9-2 2-2h2.2c1.1 0 2 .9 2 2v24.2c0 7.4-5.5 12.8-13.4 12.8-6.2 0-11.2-3.2-13.1-8.2-.3-.9.3-1.8 1.2-1.8h3.1c.7 0 1.3.4 1.5 1.1 1.1 2.7 3.8 4.4 7.3 4.4 4.6 0 7.4-3 7.4-8.1V16.5Z"
            fill="#FFFFFF"
          />
          <circle cx="18" cy="46" r="3.2" fill="#F4EEFD" opacity="0.95" />
        </svg>
      </div>
      {label ? <p className="text-[12px] font-medium tracking-[0.14em] text-[#3F2271]">Loading</p> : null}
      <span className="sr-only">Loading...</span>
      <style>{`
        @keyframes jist-orbit { to { transform: rotate(360deg); } }
        .jist-loader-orbit {
          animation: jist-orbit 0.85s linear infinite;
          transform-origin: 50% 50%;
        }
      `}</style>
    </div>
  );
}

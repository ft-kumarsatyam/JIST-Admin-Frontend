/**
 * Copyright (c) 2023-present Plane Software, Inc. and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 * See the LICENSE file for details.
 */

/* oxlint-disable */
import Script from "next/script";

// styles
import "@/styles/globals.css";

import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@plane/constants";

// helpers
import { cn } from "@plane/utils";

// assets
import favicon16 from "@/app/assets/favicon/favicon-16x16.png?url";
import favicon32 from "@/app/assets/favicon/favicon-32x32.png?url";
import faviconIco from "@/app/assets/favicon/favicon.ico?url";
import icon180 from "@/app/assets/icons/icon-180x180.png?url";
import icon512 from "@/app/assets/icons/icon-512x512.png?url";

// local
import { AppProvider } from "./provider";

export const meta = () => [
  { title: SITE_TITLE },
  { name: "description", content: SITE_DESCRIPTION },
  {
    name: "keywords",
    content: "sports management, athletes, events, tournaments, federations, governance, performance, logistics, JIST",
  },
  {
    name: "viewport",
    content:
      "width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover",
  },
  { property: "og:title", content: SITE_TITLE },
  {
    property: "og:description",
    content: SITE_DESCRIPTION,
  },
  { property: "og:url", content: SITE_URL },
  { property: "og:image", content: "/jist-logos/jist-brand.png" },
  { property: "og:image:width", content: "1200" },
  { property: "og:image:height", content: "630" },
  { property: "og:image:alt", content: "JIST — unified sports operations" },
  { name: "twitter:site", content: "@khelotech" },
  { name: "twitter:card", content: "summary_large_image" },
  { name: "twitter:image", content: "/jist-logos/jist-brand.png" },
  { name: "twitter:image:width", content: "1200" },
  { name: "twitter:image:height", content: "630" },
  { name: "twitter:image:alt", content: "JIST — unified sports operations" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const isSessionRecorderEnabled = parseInt(process.env.VITE_ENABLE_SESSION_RECORDER || "0");

  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#753FC9" />
        <link rel="icon" type="image/png" sizes="32x32" href={favicon32} />
        <link rel="icon" type="image/png" sizes="16x16" href={favicon16} />
        <link rel="manifest" href="/site.webmanifest.json" />
        <link rel="shortcut icon" href={faviconIco} />
        {/* Meta info for PWA */}
        <meta name="application-name" content="JIST" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content={SITE_NAME} />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-icon" href={icon512} />
        <link rel="apple-touch-icon" sizes="180x180" href={icon180} />
        <link rel="apple-touch-icon" sizes="512x512" href={icon512} />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>
        <div className={cn("h-screen w-full overflow-hidden bg-canvas")}>
          <AppProvider>{children}</AppProvider>
        </div>
        {isSessionRecorderEnabled && (
          <Script id="session-recorder" strategy="afterInteractive">
            {`
              !function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
              },s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='https://static.ads-twitter.com/uwt.js',
              a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
            `}
          </Script>
        )}
      </body>
    </html>
  );
}

/**
 * Copyright (c) 2023-present Plane Software, Inc. and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 * See the LICENSE file for details.
 */

import React from "react";
import { observer } from "mobx-react";
// plane imports
import { cn } from "@plane/utils";
import { AppRailRoot } from "@/components/navigation";
import { useAppRailVisibility } from "@/lib/app-rail";
import { TopNavigationRoot } from "@/components/navigation/top-navigation-root";

const SHELL = {
  canvas: "linear-gradient(165deg, #F8F5FC 0%, #F1EAF9 42%, #F6F5F8 100%)",
  railAccent: "linear-gradient(180deg, #753FC9 0%, #5A2FA3 55%, #3F2271 100%)",
  hairline: "#E4D9F5",
} as const;

export const WorkspaceContentWrapper = observer(function WorkspaceContentWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { shouldRenderAppRail } = useAppRailVisibility();

  return (
    <div className="relative flex size-full min-h-0 flex-col overflow-hidden" style={{ background: SHELL.canvas }}>
      <header className="relative z-20 shrink-0 border-b border-[#E4D9F5] bg-white/80 shadow-[0_1px_0_rgba(63,34,113,0.04)] backdrop-blur-xl">
        <TopNavigationRoot />
      </header>

      <div className="relative flex min-h-0 flex-1 overflow-hidden">
        {shouldRenderAppRail && (
          <aside className="relative z-10 flex shrink-0 self-stretch border-r border-[#E4D9F5] bg-white/95">
            <div aria-hidden className="w-1 shrink-0 self-stretch" style={{ background: SHELL.railAccent }} />
            <AppRailRoot />
          </aside>
        )}

        <main
          className={cn("relative flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden p-2 sm:p-2.5", {
            "pl-0! sm:pl-0!": shouldRenderAppRail,
          })}
        >
          <div
            className="flex size-full min-h-0 flex-col overflow-hidden rounded-xl border bg-white shadow-[0_22px_48px_-36px_rgba(63,34,113,0.42)]"
            style={{ borderColor: SHELL.hairline }}
          >
            {children}
          </div>
        </main>
      </div>
    </div>
  );
});

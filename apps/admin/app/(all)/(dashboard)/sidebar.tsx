/**
 * Copyright (c) 2026 JIST and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { useEffect, useRef } from "react";
import { observer } from "mobx-react";
import { useOutsideClickDetector } from "@plane/hooks";
import { useTheme } from "@/hooks/store";
import { AdminSidebarDropdown } from "./sidebar-dropdown";
import { AdminSidebarHelpSection } from "./sidebar-help-section";
import { AdminSidebarMenu } from "./sidebar-menu";

export const AdminSidebar = observer(function AdminSidebar() {
  const { isSidebarCollapsed, toggleSidebar } = useTheme();
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClickDetector(ref, () => {
    if (isSidebarCollapsed === false && window.innerWidth < 768) {
      toggleSidebar(!isSidebarCollapsed);
    }
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) toggleSidebar(true);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [toggleSidebar]);

  return (
    <div
      className={`fixed inset-y-0 z-20 flex h-full flex-shrink-0 flex-grow-0 flex-col duration-300 md:relative ${
        isSidebarCollapsed ? "-ml-[290px] w-[70px]" : "w-[290px]"
      } sm:${isSidebarCollapsed ? "-ml-[290px]" : ""} md:ml-0 lg:ml-0`}
      style={{
        background: "linear-gradient(180deg, #2A1845 0%, #3F2271 55%, #251538 100%)",
        color: "#F4EEFD",
      }}
    >
      <div ref={ref} className="flex h-full w-full flex-1 flex-col text-white">
        <div className="border-b border-white/10">
          <AdminSidebarDropdown />
        </div>
        <AdminSidebarMenu />
        <AdminSidebarHelpSection />
      </div>
    </div>
  );
});

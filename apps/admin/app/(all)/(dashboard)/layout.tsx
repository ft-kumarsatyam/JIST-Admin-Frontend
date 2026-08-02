/**
 * Copyright (c) 2023-present Plane Software, Inc. and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 * See the LICENSE file for details.
 */

import { useEffect } from "react";
import { observer } from "mobx-react";
import { useRouter } from "next/navigation";
import { Outlet } from "react-router";
import { AdminHeader } from "@/components/common/header";
import { LogoSpinner } from "@/components/common/logo-spinner";
import { NewUserPopup } from "@/components/common/new-user-popup";
import { useUser } from "@/hooks/store";
import type { Route } from "./+types/layout";
import { AdminSidebar } from "./sidebar";

function AdminLayout(_props: Route.ComponentProps) {
  const { replace } = useRouter();
  const { isUserLoggedIn } = useUser();

  useEffect(() => {
    if (isUserLoggedIn === false) replace("/");
  }, [replace, isUserLoggedIn]);

  if (isUserLoggedIn === undefined) {
    return (
      <div className="relative flex h-screen w-full items-center justify-center bg-[#F4EEFD]">
        <LogoSpinner />
      </div>
    );
  }

  if (isUserLoggedIn) {
    return (
      <div
        className="relative flex h-screen w-screen overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #F7F3FC 0%, #EEE6FA 45%, #F8F6FC 100%)",
        }}
      >
        <AdminSidebar />
        <main className="relative flex h-full w-full flex-col overflow-hidden">
          <div className="border-b border-[#E0D4F5] bg-white/90 text-[#1A102B] backdrop-blur-md">
            <AdminHeader />
          </div>
          <div className="vertical-scrollbar scrollbar-md h-full w-full overflow-hidden overflow-y-scroll p-4 md:p-6">
            <div className="mx-auto min-h-full w-full max-w-6xl rounded-2xl border border-[#E8DFF8] bg-white p-4 text-[#1A102B] shadow-[0_20px_50px_-40px_rgba(63,34,113,0.45)] md:p-6">
              <Outlet />
            </div>
          </div>
        </main>
        <NewUserPopup />
      </div>
    );
  }

  return <></>;
}

export default observer(AdminLayout);

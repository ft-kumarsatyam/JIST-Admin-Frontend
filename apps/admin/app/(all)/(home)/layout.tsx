/**
 * Copyright (c) 2026 JIST and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { useEffect } from "react";
import { observer } from "mobx-react";
import { useRouter } from "next/navigation";
import { Outlet } from "react-router";
import { useUser } from "@/hooks/store/use-user";

function RootLayout() {
  const { replace } = useRouter();
  const { isUserLoggedIn } = useUser();

  useEffect(() => {
    if (isUserLoggedIn === true) replace("/overview");
  }, [replace, isUserLoggedIn]);

  return (
    <div
      className="relative z-10 flex h-screen w-screen flex-col items-center overflow-hidden overflow-y-auto px-8 pt-6 pb-10"
      style={{
        background:
          "radial-gradient(90% 60% at 50% -10%, rgba(155,111,232,0.35) 0%, transparent 55%), linear-gradient(180deg, #F7F3FC 0%, #F4EEFD 40%, #FFFFFF 100%)",
      }}
    >
      <Outlet />
    </div>
  );
}

export default observer(RootLayout);

/**
 * Copyright (c) 2026 JIST and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { observer } from "mobx-react";
import { Navigate } from "react-router";
import { LogoSpinner } from "@/components/common/logo-spinner";
import { InstanceFailureView } from "@/components/instance/failure";
import { useInstance } from "@/hooks/store";
import type { Route } from "./+types/page";

/** Admin root: send people to the correct auth URL. */
function HomePage() {
  const { instance, error } = useInstance();

  if (!instance && !error) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <LogoSpinner />
      </div>
    );
  }

  if (error) return <InstanceFailureView />;

  if (instance && !instance?.is_setup_done) {
    return <Navigate to="/sign-up/" replace />;
  }

  return <Navigate to="/sign-in/" replace />;
}

export default observer(HomePage);

export const meta: Route.MetaFunction = () => [
  { title: "JIST Admin" },
  { name: "description", content: "JIST administration portal." },
];

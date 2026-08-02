/**
 * Copyright (c) 2026 JIST and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { observer } from "mobx-react";
import { LogoSpinner } from "@/components/common/logo-spinner";
import { InstanceFailureView } from "@/components/instance/failure";
import { InstanceSetupForm } from "@/components/instance/setup-form";
import { useInstance } from "@/hooks/store";
import type { Route } from "./+types/page";

function AdminSignUpPage() {
  const { instance, error } = useInstance();

  if (!instance && !error) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <LogoSpinner />
      </div>
    );
  }

  if (error) return <InstanceFailureView />;

  return <InstanceSetupForm isFirstSetup={!instance?.is_setup_done} />;
}

export default observer(AdminSignUpPage);

export const meta: Route.MetaFunction = () => [
  { title: "JIST Admin — Create account" },
  { name: "description", content: "Create a JIST instance admin account." },
];

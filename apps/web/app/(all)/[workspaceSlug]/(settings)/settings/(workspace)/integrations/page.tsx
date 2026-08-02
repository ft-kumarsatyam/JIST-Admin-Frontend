/**
 * Copyright (c) 2026 Khelo Tech and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { observer } from "mobx-react";
import { EUserPermissions, EUserPermissionsLevel } from "@plane/constants";
import { NotAuthorizedView } from "@/components/auth-screens/not-authorized-view";
import { PageHead } from "@/components/core/page-title";
import { useWorkspace } from "@/hooks/store/use-workspace";
import { useUserPermissions } from "@/hooks/store/user";

/**
 * JIST: third-party vendor integrations (GitHub/GitLab/Slack/etc.)
 * are intentionally not offered. Bitbucket ingest will live under JIST-specific settings later.
 */
function WorkspaceIntegrationsPage() {
  const { currentWorkspace } = useWorkspace();
  const { allowPermissions } = useUserPermissions();
  const isAdmin = allowPermissions([EUserPermissions.ADMIN], EUserPermissionsLevel.WORKSPACE);
  const pageTitle = currentWorkspace?.name ? `${currentWorkspace.name} - Integrations` : undefined;

  if (!isAdmin) return <NotAuthorizedView section="settings" className="h-auto" />;

  return (
    <>
      <PageHead title={pageTitle} />
      <section className="w-full overflow-y-auto p-6">
        <h1 className="text-18 font-semibold text-primary">Integrations</h1>
        <p className="mt-2 max-w-xl text-14 text-secondary">
          This JIST workspace does not ship marketplace integrations from other companies. Use JIST-native features (and
          Bitbucket commit linking when enabled) instead.
        </p>
      </section>
    </>
  );
}

export default observer(WorkspaceIntegrationsPage);

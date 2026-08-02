/**
 * Copyright (c) 2026 Khelo Tech and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { useEffect, useMemo, useState } from "react";
import { observer } from "mobx-react";
import { EUserPermissions, EUserPermissionsLevel } from "@plane/constants";
import { NotAuthorizedView } from "@/components/auth-screens/not-authorized-view";
import { PageHead } from "@/components/core/page-title";
import { SettingsContentWrapper } from "@/components/settings/content-wrapper";
import { SettingsHeading } from "@/components/settings/heading";
import { useWorkspace } from "@/hooks/store/use-workspace";
import { useUserPermissions } from "@/hooks/store/user";
import { KheloService } from "@/services/khelo.service";
import type { TEngineeringAnalytics } from "@/services/khelo.service";
import type { Route } from "./+types/page";

const kheloService = new KheloService();

const WorkspaceEngineeringSettingsPage = observer(function WorkspaceEngineeringSettingsPage({
  params,
}: Route.ComponentProps) {
  const { workspaceSlug } = params;
  const { workspaceUserInfo, allowPermissions } = useUserPermissions();
  const { currentWorkspace } = useWorkspace();
  const [data, setData] = useState<TEngineeringAnalytics | null>(null);
  const [roleFilter, setRoleFilter] = useState("");
  const [error, setError] = useState("");

  const canAdmin = allowPermissions([EUserPermissions.ADMIN], EUserPermissionsLevel.WORKSPACE);

  useEffect(() => {
    if (!canAdmin) return;
    kheloService
      .getWorkspaceEngineeringAnalytics(workspaceSlug)
      .then(setData)
      .catch(() => setError("Failed to load engineering analytics"));
  }, [workspaceSlug, canAdmin]);

  const members = useMemo(() => {
    const rows = data?.members || [];
    if (!roleFilter) return rows;
    return rows.filter((m) => (m.job_role || "").toLowerCase().includes(roleFilter.toLowerCase()));
  }, [data, roleFilter]);

  if (workspaceUserInfo && !canAdmin) {
    return <NotAuthorizedView section="settings" className="h-auto" />;
  }

  const pageTitle = currentWorkspace?.name ? `${currentWorkspace.name} - Engineering` : "Engineering";

  return (
    <SettingsContentWrapper>
      <PageHead title={pageTitle} />
      <SettingsHeading
        title="Engineering analytics"
        description="Team commit activity, quality proxies, and AI-assisted likelihood."
      />

      {error ? <p className="mt-4 text-13 text-danger-primary">{error}</p> : null}
      {data ? (
        <div className="mt-6 space-y-4">
          <p className="text-12 text-tertiary">{data.disclaimer}</p>
          <div className="flex flex-wrap gap-4 text-13 text-secondary">
            <span>Commits (7d): {data.totals.commits}</span>
            <span>
              Linked: {data.totals.linked_members}/{data.totals.members}
            </span>
          </div>
          <div>
            <label className="text-12 text-secondary" htmlFor="role-filter">
              Filter by job role
            </label>
            <input
              id="role-filter"
              className="mt-1 w-full max-w-sm rounded-md border border-subtle bg-surface-1 px-3 py-2 text-13"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              placeholder="e.g. frontend"
            />
          </div>
          <div className="overflow-x-auto rounded-md border border-subtle">
            <table className="min-w-full text-left text-13">
              <thead className="bg-surface-1 text-tertiary">
                <tr>
                  <th className="px-3 py-2 font-medium">Member</th>
                  <th className="px-3 py-2 font-medium">Role</th>
                  <th className="px-3 py-2 font-medium">BB</th>
                  <th className="px-3 py-2 font-medium">Commits/wk</th>
                  <th className="px-3 py-2 font-medium">Merge %</th>
                  <th className="px-3 py-2 font-medium">Avg churn</th>
                  <th className="px-3 py-2 font-medium">AI likelihood</th>
                  <th className="px-3 py-2 font-medium">Languages</th>
                </tr>
              </thead>
              <tbody>
                {members.map((m) => (
                  <tr key={m.user_id} className="border-t border-subtle">
                    <td className="px-3 py-2">
                      <div className="text-primary">{m.display_name}</div>
                      <div className="text-12 text-tertiary">{m.email}</div>
                    </td>
                    <td className="px-3 py-2 text-secondary">{m.job_role || "—"}</td>
                    <td className="px-3 py-2">{m.bitbucket_linked ? "Yes" : "No"}</td>
                    <td className="px-3 py-2">{m.commits_week}</td>
                    <td className="px-3 py-2">{Math.round(m.merge_ratio * 100)}%</td>
                    <td className="px-3 py-2">{m.avg_churn}</td>
                    <td className="px-3 py-2">{Math.round(m.avg_ai_likelihood * 100)}%</td>
                    <td className="px-3 py-2 text-secondary">{m.top_languages.join(", ") || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : !error ? (
        <p className="mt-4 text-13 text-secondary">Loading…</p>
      ) : null}
    </SettingsContentWrapper>
  );
});

export default WorkspaceEngineeringSettingsPage;

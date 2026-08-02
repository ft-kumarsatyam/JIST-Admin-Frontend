/**
 * Copyright (c) 2026 JIST and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { useEffect, useState } from "react";
import type { ComponentType } from "react";
import { observer } from "mobx-react";
import Link from "next/link";
import { API_BASE_URL } from "@plane/constants";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  FolderKanban,
  LayoutDashboard,
  ListTodo,
  Users,
  Building2,
} from "lucide-react";
import { PageWrapper } from "@/components/common/page-wrapper";
import type { Route } from "./+types/page";

type Overview = {
  stats: {
    users: number;
    workspaces: number;
    projects: number;
    issues: number;
    active_issues: number;
    completed_7d: number;
    unassigned_issues: number;
  };
  recent_work_items: Array<{
    id: string;
    name: string;
    identifier: string;
    priority: string;
    web_url: string;
    is_unassigned: boolean;
    state: { name: string; color: string } | null;
    assignees: Array<{ display_name: string }>;
    workspace: { name: string; slug: string };
  }>;
  recent_activity: Array<{
    id: string;
    title: string;
    created_at: string;
    actor: { display_name: string } | null;
    issue: { web_url: string };
  }>;
  recent_users: Array<{
    id: string;
    email: string;
    display_name: string;
    date_joined: string;
  }>;
};

async function fetchOverview(): Promise<Overview> {
  const res = await fetch(`${API_BASE_URL}/api/instances/overview/`, { credentials: "include" });
  if (!res.ok) throw new Error("Failed to load overview");
  return res.json();
}

function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  tone = "default",
}: {
  label: string;
  value: number;
  hint?: string;
  icon: ComponentType<{ className?: string }>;
  tone?: "default" | "warn" | "ok";
}) {
  const toneClass =
    tone === "warn"
      ? "border-[#F9DBAF] bg-[#FFFAEB]"
      : tone === "ok"
        ? "border-[#A6F4C5] bg-[#ECFDF3]"
        : "border-[#E8DFF8] bg-white";
  return (
    <div className={`rounded-xl border p-4 ${toneClass}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[12px] font-medium text-[#5B4B72]">{label}</p>
          <p className="mt-1 text-[28px] font-semibold tracking-tight text-[#1A102B]">{value}</p>
          {hint ? <p className="mt-1 text-[12px] text-[#7A6B94]">{hint}</p> : null}
        </div>
        <div className="rounded-lg bg-[#F4EEFD] p-2 text-[#6532B8]">
          <Icon className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
}

function OverviewPage() {
  const [data, setData] = useState<Overview | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOverview()
      .then(setData)
      .catch(() => setError("Could not load instance overview."));
  }, []);

  return (
    <PageWrapper
      header={{
        title: "Overview",
        description: "Instance health, work item tracking, and recent activity across all workspaces.",
      }}
    >
      {error ? <p className="text-sm font-medium text-[#B42318]">{error}</p> : null}
      {!data && !error ? <p className="text-sm text-[#5B4B72]">Loading overview…</p> : null}

      {data ? (
        <div className="space-y-8">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard label="Users" value={data.stats.users} icon={Users} />
            <StatCard label="Workspaces" value={data.stats.workspaces} icon={Building2} />
            <StatCard label="Projects" value={data.stats.projects} icon={FolderKanban} />
            <StatCard label="Work items" value={data.stats.issues} icon={ListTodo} />
            <StatCard label="Active work" value={data.stats.active_issues} icon={LayoutDashboard} />
            <StatCard label="Completed (7d)" value={data.stats.completed_7d} icon={CheckCircle2} tone="ok" />
            <StatCard
              label="Unassigned"
              value={data.stats.unassigned_issues}
              hint="Needs an owner"
              icon={AlertTriangle}
              tone={data.stats.unassigned_issues > 0 ? "warn" : "default"}
            />
            <StatCard
              label="Activity events"
              value={data.recent_activity.length}
              hint="Latest tracked updates"
              icon={Activity}
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <section className="rounded-xl border border-[#E8DFF8] bg-white p-4">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-[15px] font-semibold text-[#1A102B]">Recent work items</h3>
                <Link href="/work-items/" className="text-[12px] font-semibold text-[#6532B8] hover:underline">
                  View all
                </Link>
              </div>
              <div className="space-y-2">
                {data.recent_work_items.length === 0 ? (
                  <p className="text-[13px] text-[#7A6B94]">No work items yet. Create them from the web app.</p>
                ) : (
                  data.recent_work_items.map((item) => (
                    <a
                      key={item.id}
                      href={item.web_url}
                      target="_blank"
                      rel="noreferrer"
                      className="block rounded-lg border border-[#F0E9FA] px-3 py-2.5 transition hover:border-[#D6C8EC] hover:bg-[#FBF8FF]"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate text-[13px] font-semibold text-[#1A102B]">
                            <span className="text-[#753FC9]">{item.identifier}</span> {item.name}
                          </p>
                          <p className="mt-0.5 text-[12px] text-[#5B4B72]">
                            {item.workspace.name}
                            {item.state ? ` · ${item.state.name}` : ""}
                            {item.is_unassigned
                              ? " · Unassigned"
                              : ` · ${item.assignees.map((a) => a.display_name).join(", ")}`}
                          </p>
                        </div>
                        <span className="shrink-0 rounded-md bg-[#F4EEFD] px-2 py-0.5 text-[11px] font-medium text-[#3F2271] capitalize">
                          {item.priority}
                        </span>
                      </div>
                    </a>
                  ))
                )}
              </div>
            </section>

            <section className="rounded-xl border border-[#E8DFF8] bg-white p-4">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-[15px] font-semibold text-[#1A102B]">Recent activity</h3>
                <Link href="/activity/" className="text-[12px] font-semibold text-[#6532B8] hover:underline">
                  View all
                </Link>
              </div>
              <div className="space-y-2">
                {data.recent_activity.length === 0 ? (
                  <p className="text-[13px] text-[#7A6B94]">No tracked updates yet.</p>
                ) : (
                  data.recent_activity.map((event) => (
                    <a
                      key={event.id}
                      href={event.issue.web_url}
                      target="_blank"
                      rel="noreferrer"
                      className="block rounded-lg border border-[#F0E9FA] px-3 py-2.5 transition hover:border-[#D6C8EC] hover:bg-[#FBF8FF]"
                    >
                      <p className="text-[13px] font-medium text-[#1A102B]">{event.title}</p>
                      <p className="mt-0.5 text-[12px] text-[#7A6B94]">{new Date(event.created_at).toLocaleString()}</p>
                    </a>
                  ))
                )}
              </div>
            </section>
          </div>
        </div>
      ) : null}
    </PageWrapper>
  );
}

export default observer(OverviewPage);

export const meta: Route.MetaFunction = () => [
  { title: "Overview — JIST Admin" },
  { name: "description", content: "Instance overview and operational tracking." },
];

/**
 * Copyright (c) 2026 JIST and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { useEffect, useMemo, useState } from "react";
import { observer } from "mobx-react";
import { API_BASE_URL } from "@plane/constants";
import { PageWrapper } from "@/components/common/page-wrapper";
import type { Route } from "./+types/page";

type WorkItem = {
  id: string;
  name: string;
  identifier: string;
  priority: string;
  web_url: string;
  is_unassigned: boolean;
  state: { name: string; color: string; group: string } | null;
  assignees: Array<{ display_name: string; email: string }>;
  created_by: { display_name: string };
  workspace: { name: string; slug: string };
  project: { name: string };
  updated_at: string;
  target_date: string | null;
};

async function fetchWorkItems(): Promise<WorkItem[]> {
  const res = await fetch(`${API_BASE_URL}/api/instances/work-items/?limit=60`, { credentials: "include" });
  if (!res.ok) throw new Error("Failed to load work items");
  const data = await res.json();
  return data.results || [];
}

function WorkItemsPage() {
  const [items, setItems] = useState<WorkItem[]>([]);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<"all" | "unassigned" | "active">("all");

  useEffect(() => {
    fetchWorkItems()
      .then(setItems)
      .catch(() => setError("Could not load work items."));
  }, []);

  const filtered = useMemo(() => {
    if (filter === "unassigned") return items.filter((i) => i.is_unassigned && !i.state?.group?.includes("completed"));
    if (filter === "active")
      return items.filter((i) => i.state?.group !== "completed" && i.state?.group !== "cancelled");
    return items;
  }, [filter, items]);

  return (
    <PageWrapper
      header={{
        title: "Work items",
        description: "Track assignments and progress across every workspace on this instance.",
      }}
    >
      {error ? <p className="text-sm font-medium text-[#B42318]">{error}</p> : null}

      <div className="mb-4 flex flex-wrap gap-2">
        {(
          [
            ["all", "All"],
            ["active", "Active"],
            ["unassigned", "Unassigned"],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => setFilter(key)}
            className={`rounded-md px-3 py-1.5 text-[12px] font-semibold ${
              filter === key
                ? "bg-[#753FC9] text-white"
                : "border border-[#E8DFF8] bg-white text-[#3F2271] hover:bg-[#F7F3FC]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map((item) => (
          <a
            key={item.id}
            href={item.web_url}
            target="_blank"
            rel="noreferrer"
            className="block rounded-xl border border-[#E8DFF8] bg-white px-4 py-3 transition hover:border-[#D6C8EC] hover:bg-[#FBF8FF]"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[14px] font-semibold text-[#1A102B]">
                  <span className="text-[#753FC9]">{item.identifier}</span> {item.name}
                </p>
                <p className="mt-1 text-[12px] text-[#5B4B72]">
                  {item.workspace.name} / {item.project.name}
                  {item.state ? ` · ${item.state.name}` : ""}
                  {` · Updated ${new Date(item.updated_at).toLocaleString()}`}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-md bg-[#F4EEFD] px-2 py-0.5 text-[11px] font-semibold text-[#3F2271] capitalize">
                  {item.priority}
                </span>
                {item.is_unassigned ? (
                  <span className="rounded-md bg-[#FFFAEB] px-2 py-0.5 text-[11px] font-semibold text-[#B54708]">
                    Unassigned
                  </span>
                ) : (
                  <span className="rounded-md bg-[#ECFDF3] px-2 py-0.5 text-[11px] font-semibold text-[#067647]">
                    {item.assignees.map((a) => a.display_name).join(", ")}
                  </span>
                )}
              </div>
            </div>
          </a>
        ))}
        {filtered.length === 0 && !error ? (
          <p className="rounded-xl border border-[#E8DFF8] bg-white px-4 py-8 text-center text-[13px] text-[#7A6B94]">
            No work items match this filter. Create and assign tasks from the web app.
          </p>
        ) : null}
      </div>
    </PageWrapper>
  );
}

export default observer(WorkItemsPage);

export const meta: Route.MetaFunction = () => [
  { title: "Work items — JIST Admin" },
  { name: "description", content: "Cross-workspace work item tracking for instance admins." },
];

/**
 * Copyright (c) 2026 JIST and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { API_BASE_URL } from "@plane/constants";
import { PageWrapper } from "@/components/common/page-wrapper";
import type { Route } from "./+types/page";

type ActivityItem = {
  id: string;
  title: string;
  created_at: string;
  verb: string;
  field: string | null;
  actor: { display_name: string; email: string } | null;
  issue: {
    name: string;
    project_identifier: string;
    sequence_id: number;
    workspace_slug: string;
    web_url: string;
  };
};

async function fetchActivity(): Promise<{ unread_count: number; results: ActivityItem[] }> {
  const res = await fetch(`${API_BASE_URL}/api/instances/activity/?limit=60`, { credentials: "include" });
  if (!res.ok) throw new Error("Failed to load activity");
  return res.json();
}

function ActivityPage() {
  const [items, setItems] = useState<ActivityItem[]>([]);
  const [unread, setUnread] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchActivity()
      .then((data) => {
        setItems(data.results || []);
        setUnread(data.unread_count || 0);
        return data;
      })
      .catch(() => setError("Could not load activity feed."));
  }, []);

  return (
    <PageWrapper
      header={{
        title: "Activity",
        description: "Work item assignment, state, and field updates across the instance.",
      }}
    >
      {error ? <p className="text-sm font-medium text-[#B42318]">{error}</p> : null}

      <div className="mb-4 rounded-xl border border-[#E8DFF8] bg-[#F7F3FC] px-4 py-3 text-[13px] text-[#3F2271]">
        <span className="font-semibold text-[#1A102B]">{unread}</span> tracked updates in this feed. Open an item to
        manage assignees and progress in the web app.
      </div>

      <div className="space-y-2">
        {items.map((item) => (
          <a
            key={item.id}
            href={item.issue.web_url}
            target="_blank"
            rel="noreferrer"
            className="block rounded-xl border border-[#E8DFF8] bg-white px-4 py-3 transition hover:border-[#D6C8EC] hover:bg-[#FBF8FF]"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[14px] font-semibold text-[#1A102B]">{item.title}</p>
                <p className="mt-1 text-[12px] text-[#5B4B72]">
                  {item.issue.project_identifier}-{item.issue.sequence_id} · {item.issue.workspace_slug}
                  {item.actor ? ` · ${item.actor.display_name}` : ""}
                </p>
              </div>
              <time className="shrink-0 text-[11px] font-medium text-[#7A6B94]">
                {new Date(item.created_at).toLocaleString()}
              </time>
            </div>
          </a>
        ))}
        {items.length === 0 && !error ? (
          <p className="rounded-xl border border-[#E8DFF8] bg-white px-4 py-8 text-center text-[13px] text-[#7A6B94]">
            No activity yet. As teams create and update work items, updates show up here.
          </p>
        ) : null}
      </div>
    </PageWrapper>
  );
}

export default observer(ActivityPage);

export const meta: Route.MetaFunction = () => [
  { title: "Activity — JIST Admin" },
  { name: "description", content: "Instance-wide work item activity tracking." },
];

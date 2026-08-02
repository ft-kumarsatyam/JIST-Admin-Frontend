/**
 * Copyright (c) 2026 JIST and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { API_BASE_URL } from "@plane/constants";
import { Button } from "@plane/propel/button";
import { PageWrapper } from "@/components/common/page-wrapper";
import type { Route } from "./+types/page";

type NotificationItem = {
  id: string;
  type: string;
  title: string;
  body: string;
  read: boolean;
  created_at: string;
};

async function fetchNotifications(): Promise<{ unread_count: number; results: NotificationItem[] }> {
  const res = await fetch(`${API_BASE_URL}/api/instances/notifications/?limit=80`, { credentials: "include" });
  if (!res.ok) throw new Error("Failed to load notifications");
  return res.json();
}

async function markAllRead() {
  await fetch(`${API_BASE_URL}/api/instances/notifications/mark-read/`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: "{}",
  });
}

function NotificationsPage() {
  const [items, setItems] = useState<NotificationItem[]>([]);
  const [unread, setUnread] = useState(0);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const load = () =>
    fetchNotifications()
      .then((data) => {
        setItems(data.results || []);
        setUnread(data.unread_count || 0);
        return data;
      })
      .catch(() => setError("Could not load notifications."));

  useEffect(() => {
    load();
  }, []);

  return (
    <PageWrapper
      header={{
        title: "Notifications",
        description: "Invite emails sent and people who joined JIST from those invitations.",
        actions: (
          <Button
            variant="secondary"
            size="sm"
            disabled={busy || unread === 0}
            onClick={async () => {
              setBusy(true);
              try {
                await markAllRead();
                await load();
              } finally {
                setBusy(false);
              }
            }}
          >
            Mark all read
          </Button>
        ),
      }}
    >
      {error ? <p className="text-sm font-medium text-[#B42318]">{error}</p> : null}

      <div className="mb-4 rounded-xl border border-[#E8DFF8] bg-[#F7F3FC] px-4 py-3 text-[13px] text-[#3F2271]">
        <span className="font-semibold text-[#1A102B]">{unread}</span> unread admin notifications
      </div>

      <div className="space-y-2">
        {items.map((item) => (
          <div
            key={item.id}
            className={`rounded-xl border px-4 py-3 ${
              item.read ? "border-[#E8DFF8] bg-white" : "border-[#D6C8EC] bg-[#FBF8FF]"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[14px] font-semibold text-[#1A102B]">{item.title}</p>
                {item.body ? <p className="mt-1 text-[12px] text-[#5B4B72]">{item.body}</p> : null}
                <p className="mt-1 text-[11px] font-medium tracking-wide text-[#7A6B94] uppercase">{item.type}</p>
              </div>
              <time className="shrink-0 text-[11px] font-medium text-[#7A6B94]">
                {new Date(item.created_at).toLocaleString()}
              </time>
            </div>
          </div>
        ))}
        {items.length === 0 && !error ? (
          <p className="rounded-xl border border-[#E8DFF8] bg-white px-4 py-8 text-center text-[13px] text-[#7A6B94]">
            No notifications yet. When you invite someone, and when they join, it shows up here.
          </p>
        ) : null}
      </div>
    </PageWrapper>
  );
}

export default observer(NotificationsPage);

export const meta: Route.MetaFunction = () => [
  { title: "Notifications — JIST Admin" },
  { name: "description", content: "Admin notifications for invites and joins." },
];

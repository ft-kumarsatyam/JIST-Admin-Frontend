/**
 * Copyright (c) 2026 JIST and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { useEffect, useState } from "react";
import { observer } from "mobx-react";
import Link from "next/link";
import { API_BASE_URL } from "@plane/constants";
import { PageWrapper } from "@/components/common/page-wrapper";
import type { Route } from "./+types/page";

type UserRow = {
  id: string;
  email: string;
  display_name: string;
  is_active: boolean;
  is_onboarded: boolean;
  date_joined: string;
  workspace_count: number;
  created_issues: number;
  open_assignments: number;
  workspaces: Array<{ name: string; slug: string; web_url: string; role: number }>;
};

async function fetchUsers(): Promise<UserRow[]> {
  const res = await fetch(`${API_BASE_URL}/api/instances/users/`, { credentials: "include" });
  if (!res.ok) throw new Error("Failed to load users");
  return res.json();
}

function UsersPage() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers()
      .then(setUsers)
      .catch(() => setError("Could not load users."));
  }, []);

  return (
    <PageWrapper
      header={{
        title: "Users",
        description: "Everyone on this instance, their workspaces, and open assignments.",
        actions: (
          <Link
            href="/sign-up/"
            className="rounded-md bg-[#753FC9] px-3 py-2 text-[13px] font-semibold text-white hover:bg-[#6532B8]"
          >
            Create admin
          </Link>
        ),
      }}
    >
      {error ? <p className="text-sm font-medium text-[#B42318]">{error}</p> : null}

      <div className="overflow-hidden rounded-xl border border-[#E8DFF8] bg-white">
        <table className="min-w-full text-left">
          <thead className="bg-[#F7F3FC] text-[12px] font-semibold tracking-wide text-[#5B4B72] uppercase">
            <tr>
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Workspaces</th>
              <th className="px-4 py-3">Open assignments</th>
              <th className="px-4 py-3">Created issues</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t border-[#F0E9FA]">
                <td className="px-4 py-3">
                  <div className="text-[13px] font-semibold text-[#1A102B]">{user.display_name}</div>
                  <div className="text-[12px] text-[#5B4B72]">{user.email}</div>
                </td>
                <td className="px-4 py-3">
                  <div className="text-[13px] font-medium text-[#1A102B]">{user.workspace_count}</div>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {user.workspaces.slice(0, 3).map((ws) => (
                      <a
                        key={ws.slug}
                        href={ws.web_url}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded bg-[#F4EEFD] px-1.5 py-0.5 text-[11px] font-medium text-[#3F2271] hover:bg-[#E8DFF8]"
                      >
                        {ws.name}
                      </a>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3 text-[13px] font-medium text-[#1A102B]">{user.open_assignments}</td>
                <td className="px-4 py-3 text-[13px] font-medium text-[#1A102B]">{user.created_issues}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-md px-2 py-0.5 text-[11px] font-semibold ${
                      user.is_active ? "bg-[#ECFDF3] text-[#067647]" : "bg-[#FEF3F2] text-[#B42318]"
                    }`}
                  >
                    {user.is_active ? "Active" : "Inactive"}
                  </span>
                  {!user.is_onboarded ? (
                    <span className="ml-2 rounded-md bg-[#FFFAEB] px-2 py-0.5 text-[11px] font-semibold text-[#B54708]">
                      Onboarding
                    </span>
                  ) : null}
                </td>
              </tr>
            ))}
            {users.length === 0 && !error ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-[13px] text-[#7A6B94]">
                  Loading users…
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </PageWrapper>
  );
}

export default observer(UsersPage);

export const meta: Route.MetaFunction = () => [
  { title: "Users — JIST Admin" },
  { name: "description", content: "Manage users across the JIST instance." },
];

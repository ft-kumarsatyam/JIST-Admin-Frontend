/**
 * Copyright (c) 2026 Khelo Tech and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { API_BASE_URL } from "@plane/constants";
import { Button } from "@plane/propel/button";
import { PageWrapper } from "@/components/common/page-wrapper";
import type { Route } from "./+types/page";

type CommitMsg = {
  hash: string;
  message: string;
  branch: string;
  repo: string;
  committed_at: string | null;
  html_url: string;
};

type BranchGroup = {
  name: string;
  commit_count: number;
  commits: Array<{ hash: string; message: string; committed_at: string | null; html_url: string }>;
};

type RepoGroup = {
  repo_slug: string;
  full_name: string;
  html_url: string;
  commit_count: number;
  branches: BranchGroup[];
};

type Row = {
  user_id: string | null;
  email: string;
  display_name: string;
  job_role: string | null;
  invite_status: string;
  workspaces: Array<{ slug: string; name: string; role: number }>;
  bitbucket_linked: boolean;
  commits_60d: number;
  commits_14d: number;
  avg_ai_likelihood: number;
  avg_quality_score: number;
  last_commit_at: string | null;
  at_risk: string[];
  is_onboarded: boolean;
  repos: RepoGroup[];
  recent_commit_messages: CommitMsg[];
};

type Analytics = {
  users: Row[];
  window_days: number;
  totals: {
    users: number;
    linked: number;
    at_risk: number;
    commits_60d: number;
    commits_14d: number;
    pending_invites: number;
  };
  disclaimer: string;
};

async function fetchAnalytics(): Promise<Analytics> {
  const res = await fetch(`${API_BASE_URL}/api/instances/engineering/analytics/`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to load");
  return res.json();
}

async function remindUser(userId: string) {
  const res = await fetch(`${API_BASE_URL}/api/instances/engineering/remind-bitbucket/${userId}/`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: "{}",
  });
  if (!res.ok) throw new Error("Failed to remind");
  return res.json();
}

function EngineeringPage() {
  const [data, setData] = useState<Analytics | null>(null);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    fetchAnalytics()
      .then(setData)
      .catch(() => setError("Failed to load engineering analytics"));
  }, []);

  return (
    <PageWrapper
      header={{
        title: "Engineering analytics",
        description: "Invitees and members with 60-day Bitbucket commits, broken down by repository and branch.",
      }}
    >
      {error ? <p className="text-sm text-red-500">{error}</p> : null}
      {data ? (
        <div className="space-y-4">
          <p className="text-xs text-[#7A6B94]">{data.disclaimer}</p>
          <div className="text-sm flex flex-wrap gap-4 text-[#5B4B72]">
            <span>People: {data.totals.users}</span>
            <span>Pending invites: {data.totals.pending_invites}</span>
            <span>Bitbucket linked: {data.totals.linked}</span>
            <span>At risk: {data.totals.at_risk}</span>
            <span>Commits (60d): {data.totals.commits_60d}</span>
            <span>Commits (14d): {data.totals.commits_14d}</span>
          </div>

          <div className="space-y-3">
            {data.users.map((u) => {
              const key = u.user_id || u.email;
              const open = expanded === key;
              return (
                <div key={key} className="overflow-hidden rounded-xl border border-[#E8DFF8] bg-white">
                  <button
                    type="button"
                    className="flex w-full items-start justify-between gap-3 px-4 py-3 text-left hover:bg-[#FBF8FF]"
                    onClick={() => setExpanded(open ? null : key)}
                  >
                    <div className="min-w-0">
                      <p className="text-[14px] font-semibold text-[#1A102B]">{u.display_name}</p>
                      <p className="text-[12px] text-[#5B4B72]">{u.email}</p>
                      <p className="mt-1 text-[12px] text-[#7A6B94]">
                        {u.invite_status} · {u.workspaces.map((w) => w.slug).join(", ") || "no workspace"} · BB{" "}
                        {u.bitbucket_linked ? "linked" : "not linked"} · {u.commits_60d} commits / 60d
                      </p>
                      {u.at_risk.length > 0 ? (
                        <p className="mt-1 text-[11px] font-medium text-[#B54708]">{u.at_risk.join(", ")}</p>
                      ) : null}
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      {u.user_id ? (
                        <Button
                          variant="secondary"
                          size="sm"
                          disabled={busyId === u.user_id}
                          onClick={async (e) => {
                            e.stopPropagation();
                            setBusyId(u.user_id);
                            try {
                              await remindUser(u.user_id!);
                            } finally {
                              setBusyId(null);
                            }
                          }}
                        >
                          Remind reconnect
                        </Button>
                      ) : null}
                      <span className="text-[12px] font-medium text-[#6532B8]">{open ? "Hide" : "Details"}</span>
                    </div>
                  </button>

                  {open ? (
                    <div className="space-y-4 border-t border-[#E8DFF8] bg-[#FBF8FF] px-4 py-3">
                      <div>
                        <h4 className="mb-2 text-[12px] font-semibold tracking-wide text-[#5B4B72] uppercase">
                          Recent commit messages
                        </h4>
                        {u.recent_commit_messages.length === 0 ? (
                          <p className="text-[12px] text-[#7A6B94]">No commits in the last {data.window_days} days.</p>
                        ) : (
                          <ul className="space-y-1.5">
                            {u.recent_commit_messages.map((c) => (
                              <li key={`${c.hash}-${c.repo}`} className="text-[12px] text-[#1A102B]">
                                <a
                                  href={c.html_url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="font-medium text-[#6532B8] hover:underline"
                                >
                                  {c.hash.slice(0, 7)}
                                </a>{" "}
                                <span className="text-[#7A6B94]">
                                  {c.repo} / {c.branch}
                                </span>{" "}
                                — {c.message}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>

                      <div>
                        <h4 className="mb-2 text-[12px] font-semibold tracking-wide text-[#5B4B72] uppercase">
                          Repos & branches
                        </h4>
                        {u.repos.length === 0 ? (
                          <p className="text-[12px] text-[#7A6B94]">No linked repo activity in window.</p>
                        ) : (
                          <div className="space-y-3">
                            {u.repos.map((repo) => (
                              <div key={repo.full_name} className="rounded-lg border border-[#E8DFF8] bg-white p-3">
                                <a
                                  href={repo.html_url || undefined}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-[13px] font-semibold text-[#6532B8] hover:underline"
                                >
                                  {repo.full_name}
                                </a>
                                <span className="ml-2 text-[11px] text-[#7A6B94]">{repo.commit_count} commits</span>
                                <div className="mt-2 space-y-2">
                                  {repo.branches.map((branch) => (
                                    <div key={branch.name}>
                                      <p className="text-[12px] font-medium text-[#3F2271]">
                                        branch: {branch.name}{" "}
                                        <span className="font-normal text-[#7A6B94]">({branch.commit_count})</span>
                                      </p>
                                      <ul className="mt-1 space-y-1 pl-3">
                                        {branch.commits.slice(0, 8).map((c) => (
                                          <li key={c.hash} className="text-[12px] text-[#5B4B72]">
                                            <a
                                              href={c.html_url}
                                              target="_blank"
                                              rel="noreferrer"
                                              className="text-[#6532B8] hover:underline"
                                            >
                                              {c.hash.slice(0, 7)}
                                            </a>{" "}
                                            {c.message}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      ) : !error ? (
        <p className="text-sm text-[#5B4B72]">Loading…</p>
      ) : null}
    </PageWrapper>
  );
}

export const meta: Route.MetaFunction = () => [{ title: "Engineering Analytics — JIST Admin" }];

export default observer(EngineeringPage);

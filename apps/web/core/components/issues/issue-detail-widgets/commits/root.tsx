/**
 * Copyright (c) 2026 Khelo Tech and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { GitBranch } from "lucide-react";
// services
import { KheloService } from "@/services/khelo.service";
import type { TBitbucketCommit } from "@/services/khelo.service";

const kheloService = new KheloService();

type Props = {
  workspaceSlug: string;
  projectId: string;
  issueId: string;
};

export const CommitsCollapsible = observer(function CommitsCollapsible(props: Props) {
  const { workspaceSlug, projectId, issueId } = props;
  const [commits, setCommits] = useState<TBitbucketCommit[]>([]);
  const [open, setOpen] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const data = await kheloService.getIssueCommits(workspaceSlug, projectId, issueId);
        if (!cancelled) {
          setCommits(Array.isArray(data) ? data : []);
          setLoaded(true);
        }
      } catch {
        if (!cancelled) {
          setCommits([]);
          setLoaded(true);
        }
      }
    };
    void load();
    return () => {
      cancelled = true;
    };
  }, [workspaceSlug, projectId, issueId]);

  if (loaded && commits.length === 0) return null;

  return (
    <div className="border-b border-subtle">
      <button
        type="button"
        className="flex w-full items-center gap-2 px-1 py-2 text-left text-13 font-medium text-primary hover:bg-layer-1-hover"
        onClick={() => setOpen((v) => !v)}
      >
        <GitBranch className="size-3.5 text-tertiary" />
        <span>Commits</span>
        <span className="text-tertiary">({commits.length})</span>
      </button>
      {open && (
        <ul className="mb-2 space-y-1 px-1">
          {commits.map((c) => (
            <li key={c.id} className="rounded-md bg-layer-1 px-2 py-1.5 text-12">
              <div className="flex items-center justify-between gap-2">
                <code className="text-primary">{c.hash.slice(0, 7)}</code>
                {c.html_url ? (
                  <a
                    href={c.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-custom-primary-100 hover:underline"
                  >
                    Bitbucket
                  </a>
                ) : null}
              </div>
              <p className="mt-0.5 line-clamp-2 text-secondary">{c.message.split("\n")[0]}</p>
              <p className="mt-0.5 text-tertiary">
                {c.author_raw || c.author_email}
                {c.committed_at ? ` · ${new Date(c.committed_at).toLocaleString()}` : ""}
              </p>
              {c.insight ? (
                <p className="mt-0.5 text-tertiary">
                  AI-assisted likelihood {Math.round(c.insight.ai_likelihood * 100)}% · quality{" "}
                  {Math.round(c.insight.quality_score * 100)}%
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});

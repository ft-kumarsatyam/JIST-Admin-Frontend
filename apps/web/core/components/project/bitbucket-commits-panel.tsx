/**
 * Copyright (c) 2026 Khelo Tech and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { KheloService } from "@/services/khelo.service";
import type { TBitbucketCommit } from "@/services/khelo.service";

const kheloService = new KheloService();

type Props = {
  workspaceSlug: string;
  projectId: string;
};

/** Project-level Bitbucket commit activity (read-only ingest). */
export const ProjectBitbucketCommitsPanel = observer(function ProjectBitbucketCommitsPanel(props: Props) {
  const { workspaceSlug, projectId } = props;
  const [commits, setCommits] = useState<TBitbucketCommit[]>([]);

  useEffect(() => {
    kheloService
      .getProjectCommits(workspaceSlug, projectId)
      .then((data) => setCommits(Array.isArray(data) ? data : []))
      .catch(() => setCommits([]));
  }, [workspaceSlug, projectId]);

  if (!commits.length) {
    return (
      <p className="text-13 text-secondary">
        No commits synced yet. Register a Bitbucket repository on this workspace and ensure the service-account API
        token is configured.
      </p>
    );
  }

  return (
    <ul className="space-y-2">
      {commits.map((c) => (
        <li key={c.id} className="rounded-md border border-subtle bg-layer-1 px-3 py-2 text-13">
          <div className="flex items-center justify-between gap-2">
            <code>{c.hash.slice(0, 7)}</code>
            {c.html_url ? (
              <a href={c.html_url} target="_blank" rel="noreferrer" className="text-custom-primary-100 hover:underline">
                Open
              </a>
            ) : null}
          </div>
          <p className="mt-1 text-secondary">{c.message.split("\n")[0]}</p>
          <p className="mt-0.5 text-12 text-tertiary">{c.author_raw || c.author_email}</p>
          {c.insight ? (
            <p className="mt-0.5 text-12 text-tertiary">
              AI-assisted likelihood {Math.round(c.insight.ai_likelihood * 100)}% · quality{" "}
              {Math.round(c.insight.quality_score * 100)}%
            </p>
          ) : null}
        </li>
      ))}
    </ul>
  );
});

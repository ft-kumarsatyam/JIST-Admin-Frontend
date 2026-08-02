/**
 * Copyright (c) 2026 Khelo Tech and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { API_BASE_URL } from "@plane/constants";
import { APIService } from "@/services/api.service";

export type TBitbucketCommit = {
  id: string;
  hash: string;
  message: string;
  author_raw: string;
  author_email: string;
  author_user: string | null;
  committed_at: string | null;
  html_url: string;
  is_merge: boolean;
  insight?: {
    ai_likelihood: number;
    quality_score: number;
    structure_score: number;
    churn_ratio: number;
    signals?: unknown;
  } | null;
};

export type TEngineeringMemberRow = {
  user_id: string;
  display_name: string;
  email: string;
  job_role: string | null;
  workspace_role: number;
  bitbucket_linked: boolean;
  commits_week: number;
  merge_ratio: number;
  avg_churn: number;
  avg_ai_likelihood: number;
  top_languages: string[];
  last_commit_at: string | null;
};

export type TEngineeringAnalytics = {
  workspace: { id: string; slug: string; name: string };
  window_days: number;
  members: TEngineeringMemberRow[];
  totals: { commits: number; linked_members: number; members: number };
  disclaimer: string;
};

export type TInstanceEngineeringAnalytics = {
  users: Array<{
    user_id: string;
    email: string;
    display_name: string;
    job_role: string | null;
    workspaces: Array<{ id: string; slug: string; name: string; role: number }>;
    bitbucket_linked: boolean;
    commits_14d: number;
    avg_ai_likelihood: number;
    avg_quality_score: number;
    last_commit_at: string | null;
    at_risk: string[];
    is_onboarded: boolean;
  }>;
  totals: { users: number; linked: number; at_risk: number; commits_14d: number };
  disclaimer: string;
};

export type TWorklog = {
  id: string;
  issue: string;
  user: string;
  description: string;
  duration_minutes: number;
  logged_on: string;
  is_billable: boolean;
};

export class KheloService extends APIService {
  constructor() {
    super(API_BASE_URL);
  }

  async getIssueCommits(workspaceSlug: string, projectId: string, issueId: string): Promise<TBitbucketCommit[]> {
    return this.get(`/api/workspaces/${workspaceSlug}/projects/${projectId}/issues/${issueId}/bitbucket/commits/`)
      .then((r) => r?.data)
      .catch((e) => {
        throw e?.response?.data;
      });
  }

  async getProjectCommits(workspaceSlug: string, projectId: string): Promise<TBitbucketCommit[]> {
    return this.get(`/api/workspaces/${workspaceSlug}/projects/${projectId}/bitbucket/commits/`)
      .then((r) => r?.data)
      .catch((e) => {
        throw e?.response?.data;
      });
  }

  async getBitbucketStatus(): Promise<{
    linked: boolean;
    oauth_configured?: boolean;
    account_id?: string;
    display_name?: string;
    authorize_url?: string | null;
  }> {
    return this.get(`/api/users/me/bitbucket/`)
      .then((r) => r?.data)
      .catch((e) => {
        throw e?.response?.data;
      });
  }

  async linkBitbucketIdentity(data: {
    account_id: string;
    display_name?: string;
    emails?: string[];
  }): Promise<unknown> {
    return this.post(`/api/users/me/bitbucket/`, data)
      .then((r) => r?.data)
      .catch((e) => {
        throw e?.response?.data;
      });
  }

  async getWorkspaceEngineeringAnalytics(workspaceSlug: string): Promise<TEngineeringAnalytics> {
    return this.get(`/api/workspaces/${workspaceSlug}/engineering/analytics/`)
      .then((r) => r?.data)
      .catch((e) => {
        throw e?.response?.data;
      });
  }

  async getInstanceEngineeringAnalytics(): Promise<TInstanceEngineeringAnalytics> {
    return this.get(`/api/instances/engineering/analytics/`)
      .then((r) => r?.data)
      .catch((e) => {
        throw e?.response?.data;
      });
  }

  async remindBitbucketReconnect(userId: string): Promise<unknown> {
    return this.post(`/api/instances/engineering/remind-bitbucket/${userId}/`, {})
      .then((r) => r?.data)
      .catch((e) => {
        throw e?.response?.data;
      });
  }

  async getWorklogs(workspaceSlug: string, projectId: string, issueId: string): Promise<TWorklog[]> {
    return this.get(`/api/workspaces/${workspaceSlug}/projects/${projectId}/issues/${issueId}/worklogs/`)
      .then((r) => r?.data)
      .catch((e) => {
        throw e?.response?.data;
      });
  }

  async startTimer(workspaceSlug: string, projectId: string, issueId: string): Promise<unknown> {
    return this.post(`/api/workspaces/${workspaceSlug}/projects/${projectId}/worklog-timer/`, { issue: issueId })
      .then((r) => r?.data)
      .catch((e) => {
        throw e?.response?.data;
      });
  }

  async stopTimer(workspaceSlug: string, projectId: string, description = ""): Promise<TWorklog> {
    return this.delete(`/api/workspaces/${workspaceSlug}/projects/${projectId}/worklog-timer/`, { description })
      .then((r) => r?.data)
      .catch((e) => {
        throw e?.response?.data;
      });
  }

  async getReportingAggregate(workspaceSlug: string, projectId?: string): Promise<unknown> {
    const params = projectId ? { params: { project: projectId } } : {};
    return this.get(`/api/workspaces/${workspaceSlug}/reporting/aggregate/`, params)
      .then((r) => r?.data)
      .catch((e) => {
        throw e?.response?.data;
      });
  }

  async getPropertyDefinitions(workspaceSlug: string, projectId: string): Promise<unknown[]> {
    return this.get(`/api/workspaces/${workspaceSlug}/projects/${projectId}/property-definitions/`)
      .then((r) => r?.data)
      .catch((e) => {
        throw e?.response?.data;
      });
  }

  async getPropertyValues(workspaceSlug: string, projectId: string, issueId: string): Promise<unknown[]> {
    return this.get(`/api/workspaces/${workspaceSlug}/projects/${projectId}/issues/${issueId}/property-values/`)
      .then((r) => r?.data)
      .catch((e) => {
        throw e?.response?.data;
      });
  }
}

/**
 * Copyright (c) 2023-present Plane Software, Inc. and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 * See the LICENSE file for details.
 */

import { Cog, Mail, GitBranch, LayoutDashboard, Users, ListTodo, Bell, Activity } from "lucide-react";
// plane imports
import { LockIcon, WorkspaceIcon } from "@plane/propel/icons";
// types
import type { TSidebarMenuItem } from "./types";

export type TCoreSidebarMenuKey =
  | "overview"
  | "users"
  | "work-items"
  | "notifications"
  | "activity"
  | "general"
  | "email"
  | "workspace"
  | "authentication"
  | "engineering";

export const coreSidebarMenuLinks: Record<TCoreSidebarMenuKey, TSidebarMenuItem> = {
  overview: {
    Icon: LayoutDashboard,
    name: "Overview",
    description: "Instance health and operational snapshot.",
    href: `/overview/`,
  },
  users: {
    Icon: Users,
    name: "Users",
    description: "People, workspaces, and open assignments.",
    href: `/users/`,
  },
  "work-items": {
    Icon: ListTodo,
    name: "Work items",
    description: "Track and open tasks across workspaces.",
    href: `/work-items/`,
  },
  notifications: {
    Icon: Bell,
    name: "Notifications",
    description: "Invite sends, joins, and admin alerts.",
    href: `/notifications/`,
  },
  activity: {
    Icon: Activity,
    name: "Activity",
    description: "Work item updates across workspaces.",
    href: `/activity/`,
  },
  general: {
    Icon: Cog,
    name: "General",
    description: "Identify your instances and get key details.",
    href: `/general/`,
  },
  email: {
    Icon: Mail,
    name: "Email",
    description: "Configure your SMTP controls.",
    href: `/email/`,
  },
  workspace: {
    Icon: WorkspaceIcon,
    name: "Workspaces",
    description: "Manage all workspaces on this instance.",
    href: `/workspace/`,
  },
  authentication: {
    Icon: LockIcon,
    name: "Authentication",
    description: "Configure authentication modes.",
    href: `/authentication/`,
  },
  engineering: {
    Icon: GitBranch,
    name: "Engineering analytics",
    description: "Invitees, Bitbucket commits, repos, and branches.",
    href: `/engineering/`,
  },
};

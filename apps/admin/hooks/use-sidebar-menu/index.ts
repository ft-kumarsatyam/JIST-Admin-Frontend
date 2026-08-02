/**
 * Copyright (c) 2023-present Plane Software, Inc. and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 * See the LICENSE file for details.
 */

// local imports
import { coreSidebarMenuLinks } from "./core";
import type { TSidebarMenuItem } from "./types";

export function useSidebarMenu(): TSidebarMenuItem[] {
  return [
    coreSidebarMenuLinks.overview,
    coreSidebarMenuLinks.users,
    coreSidebarMenuLinks["work-items"],
    coreSidebarMenuLinks.notifications,
    coreSidebarMenuLinks.activity,
    coreSidebarMenuLinks.workspace,
    coreSidebarMenuLinks.engineering,
    coreSidebarMenuLinks.general,
    coreSidebarMenuLinks.authentication,
    coreSidebarMenuLinks.email,
  ];
}

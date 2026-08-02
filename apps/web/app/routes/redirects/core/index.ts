/**
 * Copyright (c) 2023-present Plane Software, Inc. and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 * See the LICENSE file for details.
 */

import { route } from "@react-router/dev/routes";
import type { RouteConfigEntry } from "@react-router/dev/routes";

export const coreRedirectRoutes: RouteConfigEntry[] = [
  // ========================================================================
  // WORKSPACE & PROJECT REDIRECTS
  // ========================================================================

  // Project settings redirect: /:workspaceSlug/projects/:projectId/settings/:path*
  // → /:workspaceSlug/settings/projects/:projectId/:path*
  route(":workspaceSlug/projects/:projectId/settings/*", "routes/redirects/core/project-settings.tsx"),

  // Analytics redirect: /:workspaceSlug/analytics → /:workspaceSlug/analytics/overview
  route(":workspaceSlug/analytics", "routes/redirects/core/analytics.tsx"),

  // API tokens redirect: /:workspaceSlug/settings/api-tokens
  // → /settings/profile/api-tokens
  route(":workspaceSlug/settings/api-tokens", "routes/redirects/core/api-tokens.tsx"),

  // Inbox redirect: /:workspaceSlug/projects/:projectId/inbox
  // → /:workspaceSlug/projects/:projectId/intake
  route(":workspaceSlug/projects/:projectId/inbox", "routes/redirects/core/inbox.tsx"),

  // ========================================================================
  // AUTHENTICATION REDIRECTS
  // ========================================================================

  // Sign-up redirects
  route("accounts/sign-up", "routes/redirects/core/accounts-signup.tsx"),

  // Legacy / explicit aliases → dedicated user auth URLs
  route("signin", "routes/redirects/core/signin.tsx"),
  route("login", "routes/redirects/core/login.tsx"),
  route("register", "routes/redirects/core/register.tsx"),
  route("user/sign-in", "routes/redirects/core/user-signin.tsx"),
  route("user/sign-up", "routes/redirects/core/user-signup.tsx"),
];

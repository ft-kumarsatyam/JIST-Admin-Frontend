/**
 * Copyright (c) 2026 JIST and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { Navigate } from "react-router";

/** Root sends users to the dedicated user sign-in URL. */
export default function HomePage() {
  return <Navigate to="/sign-in/" replace />;
}

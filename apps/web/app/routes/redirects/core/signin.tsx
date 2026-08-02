/**
 * Copyright (c) 2026 JIST and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { redirect } from "react-router";

export const clientLoader = () => {
  throw redirect("/sign-in/");
};

export default function Signin() {
  return null;
}

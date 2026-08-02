/**
 * Copyright (c) 2026 JIST and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import Link from "next/link";
import { PlaneLockup } from "@plane/propel/icons";

export function AuthHeader() {
  return (
    <div className="mx-auto flex w-full max-w-[960px] items-center justify-between gap-6">
      <Link href="/sign-in/" className="flex items-center gap-3 text-[#1A102B]">
        <PlaneLockup height={32} className="text-[#1A102B]" />
        <span className="rounded-md bg-[#753FC9] px-2 py-0.5 text-[12px] font-semibold text-white">Admin</span>
      </Link>
    </div>
  );
}

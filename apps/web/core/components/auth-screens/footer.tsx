/**
 * Copyright (c) 2026 JIST and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import Link from "next/link";
import { PRIVACY_POLICY_URL, TERMS_OF_SERVICE_URL, WEBSITE_URL } from "@plane/constants";

/** Minimal auth footer — Linear/Zoho style, no duplicated logo. */
export function AuthFooter() {
  return (
    <div className="mt-8 flex flex-col items-center gap-3 text-center">
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[12px] font-medium text-[#5B4B72]">
        <Link href={TERMS_OF_SERVICE_URL} target="_blank" rel="noopener noreferrer" className="hover:text-[#3F2271]">
          Terms
        </Link>
        <Link href={PRIVACY_POLICY_URL} target="_blank" rel="noopener noreferrer" className="hover:text-[#3F2271]">
          Privacy
        </Link>
        <Link href={WEBSITE_URL} target="_blank" rel="noopener noreferrer" className="hover:text-[#3F2271]">
          khelo.tech
        </Link>
      </div>
      <p className="text-[12px] text-[#7A6B94]">© {new Date().getFullYear()} JIST</p>
    </div>
  );
}

/**
 * Copyright (c) 2026 JIST and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from "react";
import Link from "next/link";
import { EAuthModes, PRIVACY_POLICY_URL, TERMS_OF_SERVICE_URL } from "@plane/constants";

interface TermsAndConditionsProps {
  authType?: EAuthModes;
}

const MESSAGES = {
  [EAuthModes.SIGN_UP]: "By creating an account",
  [EAuthModes.SIGN_IN]: "By signing in",
} as const;

function LegalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="font-semibold text-[#6532B8] underline-offset-2 hover:underline"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </Link>
  );
}

export function TermsAndConditions({ authType = EAuthModes.SIGN_IN }: TermsAndConditionsProps) {
  return (
    <p className="text-center text-[12px] leading-5 text-[#5B4B72]">
      {`${MESSAGES[authType]}, you agree to our `}
      <LegalLink href={TERMS_OF_SERVICE_URL}>Terms</LegalLink>
      {" and "}
      <LegalLink href={PRIVACY_POLICY_URL}>Privacy Policy</LegalLink>.
    </p>
  );
}

/**
 * Copyright (c) 2026 JIST and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from "react";
import { AuthRoot } from "@/components/account/auth-forms/auth-root";
import type { EAuthModes } from "@/helpers/authentication.helper";
import { EAuthModes as AuthModes } from "@/helpers/authentication.helper";
import { AuthFooter } from "./footer";
import { AuthHeader } from "./header";
import { KheloLogo } from "@/components/brand/khelo-logo";

type AuthBaseProps = {
  authType: EAuthModes;
};

/**
 * Split auth shell — brand plane + focused card.
 * Distinct from generic SaaS single-column auth.
 */
export function AuthBase({ authType }: AuthBaseProps) {
  const isSignIn = authType === AuthModes.SIGN_IN;

  return (
    <div className="relative z-10 flex min-h-screen w-screen flex-col lg:flex-row">
      <aside
        className="relative hidden w-full flex-col justify-between overflow-hidden px-10 py-10 text-white lg:flex lg:w-[42%]"
        style={{
          background:
            "radial-gradient(120% 80% at 10% 0%, #9B6FE8 0%, transparent 55%), linear-gradient(165deg, #3F2271 0%, #753FC9 48%, #2A1845 100%)",
        }}
      >
        <div className="relative z-10">
          <KheloLogo className="h-9 brightness-0 invert" />
        </div>
        <div className="relative z-10 max-w-sm space-y-4 pb-8">
          <p className="text-[11px] font-semibold tracking-[0.18em] text-white/70 uppercase">JIST</p>
          <h2 className="text-[2rem] leading-tight font-semibold tracking-[-0.03em]">
            {isSignIn ? "Welcome back to your team workspace." : "Join your team on JIST."}
          </h2>
          <p className="text-[15px] leading-relaxed text-white/80">
            {isSignIn
              ? "Sign in with the email your admin invited. New accounts are invite-only."
              : "You were invited by a workspace admin. Create your account to continue."}
          </p>
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -bottom-20 size-72 rounded-full opacity-30"
          style={{ background: "radial-gradient(circle, #F4EEFD 0%, transparent 70%)" }}
        />
      </aside>

      <div
        className="flex flex-1 flex-col px-4 py-6 sm:px-8"
        style={{
          background: "linear-gradient(180deg, #F7F3FC 0%, #F4EEFD 40%, #FFFFFF 100%)",
        }}
      >
        <AuthHeader type={authType} />
        <div className="mx-auto flex w-full max-w-[420px] flex-1 flex-col justify-center py-8">
          <div className="rounded-2xl border border-[#E8DFF8] bg-white px-6 py-8 text-[#1A102B] shadow-[0_18px_50px_-28px_rgba(63,34,113,0.35)] sm:px-8">
            <AuthRoot authMode={authType} />
          </div>
          <AuthFooter />
        </div>
      </div>
    </div>
  );
}

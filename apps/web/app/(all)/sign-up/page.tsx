/**
 * Copyright (c) 2026 JIST and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { AuthBase } from "@/components/auth-screens/auth-base";
import { EAuthModes, EPageTypes } from "@/helpers/authentication.helper";
import DefaultLayout from "@/layouts/default-layout";
import { AuthenticationWrapper } from "@/lib/wrappers/authentication-wrapper";
import { useAppRouter } from "@/hooks/use-app-router";
import { useInstance } from "@/hooks/store/use-instance";

function SignUpPage() {
  const router = useAppRouter();
  const searchParams = useSearchParams();
  const { config } = useInstance();
  const invitationId = searchParams.get("invitation_id");
  const enableSignUp = config?.enable_signup ?? false;

  useEffect(() => {
    // Public signup is closed — only invite links may open this page.
    if (!enableSignUp && !invitationId) {
      router.replace("/sign-in/?error_code=5015");
    }
  }, [enableSignUp, invitationId, router]);

  if (!enableSignUp && !invitationId) {
    return (
      <DefaultLayout>
        <div className="text-sm flex min-h-screen items-center justify-center text-[#5B4B72]">
          Redirecting to sign in…
        </div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <AuthenticationWrapper pageType={EPageTypes.NON_AUTHENTICATED}>
        <AuthBase authType={EAuthModes.SIGN_UP} />
      </AuthenticationWrapper>
    </DefaultLayout>
  );
}

export default SignUpPage;

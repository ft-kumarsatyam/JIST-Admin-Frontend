/**
 * Copyright (c) 2026 JIST and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { AuthBase } from "@/components/auth-screens/auth-base";
import { EAuthModes, EPageTypes } from "@/helpers/authentication.helper";
import DefaultLayout from "@/layouts/default-layout";
import { AuthenticationWrapper } from "@/lib/wrappers/authentication-wrapper";

/** User (workspace member) sign-in — separate from JIST Admin auth. */
function SignInPage() {
  return (
    <DefaultLayout>
      <AuthenticationWrapper pageType={EPageTypes.NON_AUTHENTICATED}>
        <AuthBase authType={EAuthModes.SIGN_IN} />
      </AuthenticationWrapper>
    </DefaultLayout>
  );
}

export default SignInPage;

/**
 * Copyright (c) 2026 JIST and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from "react";
import { observer } from "mobx-react";
import Link from "next/link";
import { AUTH_TRACKER_ELEMENTS } from "@plane/constants";
import { useTranslation } from "@plane/i18n";
import { KheloLogo } from "@/components/brand/khelo-logo";
import { PageHead } from "@/components/core/page-title";
import { EAuthModes } from "@/helpers/authentication.helper";
import { useInstance } from "@/hooks/store/use-instance";

const authContentMap = {
  [EAuthModes.SIGN_IN]: {
    pageTitle: "Sign in",
    text: "auth.common.new_to_plane",
    linkText: "Sign up",
    linkHref: "/sign-up",
  },
  [EAuthModes.SIGN_UP]: {
    pageTitle: "Sign up",
    text: "auth.common.already_have_an_account",
    linkText: "Sign in",
    linkHref: "/sign-in",
  },
};

type AuthHeaderProps = {
  type: EAuthModes;
};

export const AuthHeader = observer(function AuthHeader({ type }: AuthHeaderProps) {
  const { t } = useTranslation();
  const { config } = useInstance();
  const enableSignUpConfig = config?.enable_signup ?? false;
  const isInviteOnly = (config as { is_invite_only?: boolean } | undefined)?.is_invite_only ?? !enableSignUpConfig;

  return (
    <AuthHeaderBase
      pageTitle={`${authContentMap[type].pageTitle} - JIST`}
      additionalAction={
        enableSignUpConfig ? (
          <div className="flex items-center gap-2 text-[13px]">
            <span className="font-medium text-[#5B4B72]">{t(authContentMap[type].text)}</span>
            <Link
              data-ph-element={AUTH_TRACKER_ELEMENTS.NAVIGATE_TO_SIGN_UP}
              href={authContentMap[type].linkHref}
              className="font-semibold text-[#6532B8] hover:text-[#3F2271] hover:underline"
            >
              {t(authContentMap[type].linkText)}
            </Link>
          </div>
        ) : type === EAuthModes.SIGN_IN && isInviteOnly ? (
          <p className="max-w-[16rem] text-right text-[12px] leading-snug font-medium text-[#5B4B72]">
            Invite-only access. Ask your admin for an invite link.
          </p>
        ) : null
      }
    />
  );
});

type TAuthHeaderBase = {
  pageTitle: string;
  additionalAction?: React.ReactNode;
};

export function AuthHeaderBase(props: TAuthHeaderBase) {
  const { pageTitle, additionalAction } = props;
  return (
    <>
      <PageHead title={pageTitle} />
      <div className="mx-auto flex w-full max-w-[960px] items-center justify-between gap-6">
        <Link href="/" className="shrink-0">
          <KheloLogo className="h-8" />
        </Link>
        {additionalAction}
      </div>
    </>
  );
}

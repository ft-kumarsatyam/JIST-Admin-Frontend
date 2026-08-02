/**
 * Copyright (c) 2026 Khelo Tech and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { useCallback, useEffect, useState } from "react";
import { observer } from "mobx-react";
import { Button } from "@plane/propel/button";
import { TOAST_TYPE, setToast } from "@plane/propel/toast";
import { EOnboardingSteps } from "@plane/types";
import { API_BASE_URL } from "@plane/constants";
import { KheloService } from "@/services/khelo.service";
import { CommonOnboardingHeader } from "../common";

type Props = {
  handleStepChange: (step: EOnboardingSteps, skipInvites?: boolean) => void;
};

const kheloService = new KheloService();

export const BitbucketConnectStep = observer(function BitbucketConnectStep({ handleStepChange }: Props) {
  const [linked, setLinked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [oauthConfigured, setOauthConfigured] = useState(false);
  const [accountId, setAccountId] = useState("");
  const [savingManual, setSavingManual] = useState(false);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const status = await kheloService.getBitbucketStatus();
      setLinked(Boolean(status.linked));
      setOauthConfigured(Boolean(status.oauth_configured));
      if (status.account_id) setAccountId(String(status.account_id));
    } catch {
      setLinked(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
    const params = new URLSearchParams(window.location.search);
    if (params.get("bitbucket") === "connected") {
      setToast({ type: TOAST_TYPE.SUCCESS, title: "Bitbucket connected", message: "Your account is linked." });
      void refresh();
    }
    if (params.get("bitbucket") === "error") {
      setToast({
        type: TOAST_TYPE.ERROR,
        title: "Bitbucket connection failed",
        message: params.get("error") || "Please try again.",
      });
    }
  }, [refresh]);

  const startOAuth = () => {
    window.location.href = `${API_BASE_URL}/api/auth/bitbucket/?next=/onboarding/`;
  };

  const linkManual = async () => {
    if (!accountId.trim()) return;
    setSavingManual(true);
    try {
      await kheloService.linkBitbucketIdentity({ account_id: accountId.trim() });
      setLinked(true);
      setToast({ type: TOAST_TYPE.SUCCESS, title: "Linked", message: "Bitbucket account linked." });
    } catch {
      setToast({ type: TOAST_TYPE.ERROR, title: "Failed", message: "Could not link Bitbucket account." });
    } finally {
      setSavingManual(false);
    }
  };

  const onContinue = () => {
    if (!linked) {
      setToast({
        type: TOAST_TYPE.ERROR,
        title: "Bitbucket required",
        message: "Connect Bitbucket Cloud before continuing.",
      });
      return;
    }
    handleStepChange(EOnboardingSteps.BITBUCKET_CONNECT);
  };

  return (
    <div className="flex flex-col gap-8">
      <CommonOnboardingHeader
        title="Connect Bitbucket"
        description="JIST needs Bitbucket Cloud to attribute commits and engineering analytics. Create a free account if you do not have one yet."
      />

      <div className="flex flex-col gap-3 rounded-lg border border-subtle bg-surface-1 p-4">
        {loading ? (
          <p className="text-body-sm-regular text-tertiary">Checking connection…</p>
        ) : linked ? (
          <p className="text-body-sm-medium text-accent-primary">
            Bitbucket is connected{accountId ? ` (${accountId})` : ""}.
          </p>
        ) : (
          <p className="text-body-sm-regular text-secondary">Not connected yet.</p>
        )}

        {oauthConfigured ? (
          <Button variant="primary" size="xl" className="w-full" onClick={startOAuth} disabled={linked}>
            {linked ? "Connected with OAuth" : "Continue with Bitbucket"}
          </Button>
        ) : (
          <p className="text-caption-sm-regular text-tertiary">
            OAuth is not configured on this instance. Use your Atlassian account ID below, or ask an admin to set
            BITBUCKET_CLIENT_ID / SECRET.
          </p>
        )}

        <a
          href="https://bitbucket.org/account/signup/"
          target="_blank"
          rel="noreferrer"
          className="text-body-sm-medium text-accent-primary underline"
        >
          Create a free Bitbucket account
        </a>
      </div>

      {!linked && (
        <div className="flex flex-col gap-2">
          <label className="text-body-sm-semibold text-placeholder" htmlFor="bb-account-id">
            Or paste Atlassian account ID
          </label>
          <input
            id="bb-account-id"
            className="w-full rounded-md border border-subtle bg-surface-1 px-3 py-2 text-body-sm-regular text-primary"
            value={accountId}
            onChange={(e) => setAccountId(e.target.value)}
            placeholder="e.g. 5b10a0…"
          />
          <Button variant="secondary" size="lg" onClick={linkManual} disabled={savingManual || !accountId.trim()}>
            {savingManual ? "Linking…" : "Link account ID"}
          </Button>
        </div>
      )}

      <Button variant="primary" size="xl" className="w-full" onClick={onContinue} disabled={!linked || loading}>
        Continue
      </Button>
    </div>
  );
});

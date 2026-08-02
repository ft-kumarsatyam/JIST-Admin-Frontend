/**
 * Copyright (c) 2026 Khelo Tech and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { useCallback, useEffect, useState } from "react";
import { Button } from "@plane/propel/button";
import { Input } from "@plane/ui";
import { API_BASE_URL } from "@plane/constants";
import { KheloService } from "@/services/khelo.service";

const kheloService = new KheloService();

/**
 * Self-service Bitbucket Cloud account linking.
 * OAuth is primary; Atlassian account ID is a fallback.
 */
export function BitbucketLinkForm() {
  const [accountId, setAccountId] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [linked, setLinked] = useState(false);
  const [oauthConfigured, setOauthConfigured] = useState(false);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error" | "loading">("loading");
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    setStatus("loading");
    try {
      const s = await kheloService.getBitbucketStatus();
      setLinked(Boolean(s.linked));
      setOauthConfigured(Boolean(s.oauth_configured));
      if (s.account_id) setAccountId(String(s.account_id));
      if (s.display_name) setDisplayName(String(s.display_name));
      setStatus("idle");
    } catch {
      setStatus("error");
      setError("Could not load Bitbucket status");
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("saving");
    setError("");
    try {
      await kheloService.linkBitbucketIdentity({
        account_id: accountId.trim(),
        display_name: displayName.trim() || undefined,
      });
      setLinked(true);
      setStatus("saved");
    } catch (err: unknown) {
      setStatus("error");
      setError(
        typeof err === "object" && err && "error" in err ? String((err as { error: string }).error) : "Failed to link"
      );
    }
  };

  return (
    <div className="space-y-3 rounded-md border border-subtle bg-layer-1 p-4">
      <div>
        <h3 className="text-14 font-semibold text-primary">Link Bitbucket account</h3>
        <p className="mt-1 text-12 text-secondary">
          Connect Bitbucket Cloud so commits attribute to you. Scores shown elsewhere are heuristic estimates labeled as
          AI-assisted likelihood — not absolute truth.
        </p>
      </div>

      {status === "loading" ? <p className="text-12 text-secondary">Loading…</p> : null}
      {linked ? <p className="text-green-600 text-12">Connected{accountId ? `: ${accountId}` : ""}.</p> : null}

      {oauthConfigured ? (
        <Button
          type="button"
          onClick={() => {
            window.location.href = `${API_BASE_URL}/api/auth/bitbucket/?next=/settings/profile/general/`;
          }}
        >
          {linked ? "Reconnect with Bitbucket OAuth" : "Connect with Bitbucket OAuth"}
        </Button>
      ) : null}

      <form onSubmit={onSubmit} className="space-y-3 border-t border-subtle pt-3">
        <p className="text-12 text-secondary">Manual fallback (Atlassian account ID)</p>
        <div className="space-y-1">
          <label htmlFor="khelo-bitbucket-account-id" className="text-12 text-secondary">
            Atlassian account ID
          </label>
          <Input
            id="khelo-bitbucket-account-id"
            value={accountId}
            onChange={(e) => setAccountId(e.target.value)}
            placeholder="e.g. 5b10a0..."
            required
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="khelo-bitbucket-display-name" className="text-12 text-secondary">
            Display name (optional)
          </label>
          <Input
            id="khelo-bitbucket-display-name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Your Bitbucket display name"
          />
        </div>
        {error ? <p className="text-red-500 text-12">{error}</p> : null}
        {status === "saved" ? <p className="text-green-600 text-12">Linked.</p> : null}
        <Button type="submit" disabled={status === "saving" || !accountId.trim()}>
          {status === "saving" ? "Saving…" : "Link account ID"}
        </Button>
      </form>
    </div>
  );
}

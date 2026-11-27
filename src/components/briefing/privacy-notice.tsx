"use client";

import Link from "next/link";
import { PRIVACY } from "@/lib/briefing/content";

export function BriefingPrivacyNotice({
  accepted,
  marketingOptIn,
  error,
  onAccept,
  onMarketing,
}: {
  accepted: boolean;
  marketingOptIn: boolean;
  error?: string;
  onAccept: (v: boolean) => void;
  onMarketing: (v: boolean) => void;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-[var(--radius-card)] border border-[var(--color-border-glass)] bg-[var(--color-slate)]/40 p-5">
      <p className="text-sm text-[var(--color-muted)]">
        {PRIVACY.notice}{" "}
        <Link
          href={PRIVACY.policyHref}
          className="text-[var(--color-accent-alt)] hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {PRIVACY.policyLinkLabel}
        </Link>
        .
      </p>

      <label className="flex items-start gap-3 text-sm text-[var(--color-ink)]">
        <input
          type="checkbox"
          checked={accepted}
          onChange={(e) => onAccept(e.target.checked)}
          className="mt-0.5 h-4 w-4 accent-[var(--color-accent)]"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "privacy-error" : undefined}
        />
        <span>{PRIVACY.consentLabel}</span>
      </label>
      {error && (
        <p id="privacy-error" role="alert" className="text-xs" style={{ color: "#FB7185" }}>
          {error}
        </p>
      )}

      <label className="flex items-start gap-3 text-sm text-[var(--color-muted)]">
        <input
          type="checkbox"
          checked={marketingOptIn}
          onChange={(e) => onMarketing(e.target.checked)}
          className="mt-0.5 h-4 w-4 accent-[var(--color-accent)]"
        />
        <span>{PRIVACY.marketingLabel}</span>
      </label>
    </div>
  );
}

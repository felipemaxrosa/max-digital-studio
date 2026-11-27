"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui";
import { WhatsAppIcon } from "@/components/icons";
import { waLink, WA_MESSAGES } from "@/lib/site";
import { EVENTS } from "@/lib/analytics";
import { SUCCESS } from "@/lib/briefing/content";

const SUCCESS_KEY = "mds-briefing-success";

/**
 * Mostra a confirmação APENAS após uma submissão real (flag one-time em
 * sessionStorage, gravada pelo BriefingForm). Acesso direto → estado neutro.
 * Nenhum dado pessoal vem por query string.
 */
export function BriefingSuccess() {
  const [protocol, setProtocol] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(SUCCESS_KEY);
      if (raw) {
        const data = JSON.parse(raw) as { protocol?: string };
        // Leitura única de sessionStorage na montagem (API só-cliente).
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setProtocol(typeof data.protocol === "string" ? data.protocol : "");
        sessionStorage.removeItem(SUCCESS_KEY); // one-time
      }
    } catch {
      /* sem sessionStorage → estado neutro */
    }
    setReady(true);
  }, []);

  if (!ready) return <div className="min-h-[40vh]" aria-hidden />;

  if (protocol === null) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-5 text-center">
        <h1 className="text-2xl font-bold text-[var(--color-ink)]">{SUCCESS.neutralTitle}</h1>
        <p className="text-sm leading-relaxed text-[var(--color-muted)]">{SUCCESS.neutralText}</p>
        <Button href="/briefing" variant="primary" size="lg">
          {SUCCESS.neutralCta} →
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-lg flex-col items-center gap-6 text-center">
      <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[linear-gradient(90deg,#2563EB,#38BDF8)] text-3xl text-white shadow-[var(--shadow-glow)]">
        ✓
      </div>
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-bold text-[var(--color-ink)]">{SUCCESS.title}</h1>
        <p className="text-base leading-relaxed text-[var(--color-muted)]">{SUCCESS.description}</p>
      </div>

      {protocol && (
        <div className="rounded-[var(--radius-card)] border border-[var(--color-border-glass)] bg-[var(--color-slate)]/60 px-5 py-3">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-[var(--color-muted)]/70">
            {SUCCESS.protocolLabel}
          </p>
          <p className="mt-1 font-mono text-lg font-semibold text-[var(--color-ink)]">{protocol}</p>
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button href="/" variant="glass" size="lg">
          {SUCCESS.backToSite}
        </Button>
        <Button
          href={waLink(WA_MESSAGES.briefing)}
          variant="whatsapp"
          size="lg"
          target="_blank"
          rel="noopener noreferrer"
          event={EVENTS.briefingWhatsappClick}
          eventParams={{ location: "success" }}
        >
          <WhatsAppIcon className="h-5 w-5" /> {SUCCESS.whatsapp}
        </Button>
      </div>
    </div>
  );
}

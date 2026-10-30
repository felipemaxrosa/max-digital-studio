"use client";

import Link from "next/link";
import { Button } from "@/components/ui";
import { useConsent } from "./ConsentProvider";

/** Banner de consentimento (GDPR/LGPD). Aparece até o visitante decidir. */
export function CookieBanner() {
  const { consent, accept, reject } = useConsent();

  if (consent !== "pending") return null;

  return (
    <div
      role="dialog"
      aria-label="Consentimento de cookies"
      className="fixed inset-x-4 bottom-4 z-[60] md:inset-x-auto md:bottom-6 md:left-6 md:max-w-md"
    >
      <div className="rounded-[var(--radius-card)] border border-[var(--color-border-glass)] bg-[var(--color-slate-2)]/95 p-5 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.85)] backdrop-blur">
        <p className="text-sm leading-relaxed text-[var(--color-muted)]">
          Usamos cookies de análise (Google Analytics) e marketing (Meta Pixel) para
          medir o desempenho do site. Eles só são ativados com a sua permissão. Saiba mais na{" "}
          <Link
            href="/privacidade"
            className="text-[var(--color-cyan)] underline underline-offset-2"
          >
            Política de Privacidade
          </Link>
          .
        </p>
        <div className="mt-4 flex gap-3">
          <Button variant="primary" size="sm" onClick={accept}>
            Aceitar
          </Button>
          <Button variant="glass" size="sm" onClick={reject}>
            Recusar
          </Button>
        </div>
      </div>
    </div>
  );
}

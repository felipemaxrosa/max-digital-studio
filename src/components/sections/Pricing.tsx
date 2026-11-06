"use client";

import { useEffect, useState } from "react";
import { SectionHeading, SectionReveal, Button, RadialGlow } from "@/components/ui";
import { SparkIcon } from "@/components/icons";
import { PACKAGES, ADDONS, formatPrice, type Package, type Currency } from "@/lib/pricing";
import { waLink } from "@/lib/site";
import { track, EVENTS } from "@/lib/analytics";

const STORAGE_KEY = "mds-currency";

function PlanCard({ p, currency }: { p: Package; currency: Currency }) {
  const inner = (
    <div className="flex h-full flex-col gap-6 rounded-[var(--radius-card)] bg-[var(--color-slate)] p-7">
      <div className="flex flex-col gap-3">
        <h3 className="text-xl font-bold">{p.name}</h3>
        <p className="text-sm leading-relaxed text-[var(--color-muted)]">{p.audience}</p>
      </div>

      <div>
        <span className="block font-mono text-xs uppercase tracking-wider text-[var(--color-muted)]">
          {p.priceLabel ?? "a partir de"}
        </span>
        <span className="text-3xl font-bold">{formatPrice(p.priceFrom[currency], currency)}</span>
        {p.period && <span className="text-sm text-[var(--color-muted)]">{p.period}</span>}
        {p.annualPrice && (
          <span className="mt-1 block text-xs text-[var(--color-muted)]">
            ou {formatPrice(p.annualPrice[currency], currency)}/ano à vista
          </span>
        )}
      </div>

      {p.anchorPrice && (
        <div className="rounded-xl border border-[color:color-mix(in_srgb,var(--color-cyan)_40%,var(--color-border-glass))] bg-[color:color-mix(in_srgb,var(--color-accent)_12%,transparent)] px-4 py-3">
          {p.anchorEyebrow && (
            <span className="block font-mono text-[0.7rem] uppercase tracking-wider text-[var(--color-cyan)]">
              {p.anchorEyebrow}
            </span>
          )}
          <p className="mt-1.5 text-xs leading-relaxed text-[var(--color-muted)]">
            {p.anchorBefore}{" "}
            <span className="font-bold text-[var(--color-ink)]">
              {formatPrice(p.anchorPrice[currency], currency)}
            </span>
            {p.anchorAfter}
          </p>
        </div>
      )}

      {p.deadline && (
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--color-border-glass)] px-3 py-1 font-mono text-[0.7rem] uppercase tracking-wider text-[var(--color-cyan)]">
          {p.deadline}
        </span>
      )}

      <ul className="flex flex-1 flex-col gap-2.5">
        {p.deliverables.map((d) => (
          <li key={d} className="flex items-start gap-2.5 text-sm text-[var(--color-muted)]">
            <span className="mt-0.5 shrink-0 text-[var(--color-cyan)]" aria-hidden>
              ✓
            </span>
            {d}
          </li>
        ))}
      </ul>

      <Button
        href={waLink(p.waMessage)}
        variant={p.highlight ? "primary" : "glass"}
        size="md"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full justify-center"
        event={EVENTS.whatsappClick}
        eventParams={{ location: "package", package: p.id, currency }}
      >
        {p.ctaText} →
      </Button>
    </div>
  );

  if (p.highlight) {
    return (
      <div className="relative rounded-[calc(var(--radius-card)+1px)] bg-[linear-gradient(140deg,#2563EB,#38BDF8)] p-px shadow-[var(--shadow-glow)] lg:-translate-y-2 lg:scale-[1.02]">
        {p.badge && (
          <span className="absolute -top-3.5 left-1/2 z-10 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-[linear-gradient(90deg,#2563EB,#38BDF8)] px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-white shadow-[0_8px_26px_-6px_rgba(37,99,235,0.85)] ring-1 ring-white/25">
            <SparkIcon className="h-3.5 w-3.5" />
            {p.badge}
          </span>
        )}
        {inner}
      </div>
    );
  }
  return (
    <div className="rounded-[var(--radius-card)] border border-[var(--color-border-glass)]">
      {inner}
    </div>
  );
}

function CurrencyToggle({
  currency,
  onChange,
}: {
  currency: Currency;
  onChange: (c: Currency) => void;
}) {
  const options: { value: Currency; label: string }[] = [
    { value: "BRL", label: "R$ Real" },
    { value: "EUR", label: "€ Euro" },
  ];
  return (
    <div
      role="group"
      aria-label="Escolher moeda"
      className="inline-flex rounded-full border border-[var(--color-border-glass)] bg-[var(--color-slate)] p-1"
    >
      {options.map((o) => {
        const active = currency === o.value;
        return (
          <button
            key={o.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(o.value)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              active
                ? "bg-[linear-gradient(90deg,#2563EB,#38BDF8)] text-white"
                : "text-[var(--color-muted)] hover:text-[var(--color-ink)]"
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

export function Pricing() {
  // SSR e 1º render usam "BRL" (evita mismatch); o efeito ajusta na montagem.
  const [currency, setCurrency] = useState<Currency>("BRL");

  useEffect(() => {
    let next: Currency = "BRL";
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "BRL" || saved === "EUR") {
        next = saved;
      } else {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
        if (tz.startsWith("Europe/")) next = "EUR";
      }
    } catch {
      /* localStorage/Intl indisponível — mantém o default */
    }
    // Ajuste único após a montagem (localStorage/região só existem no client).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (next !== "BRL") setCurrency(next);
  }, []);

  function change(c: Currency) {
    setCurrency(c);
    track(EVENTS.currencyChange, { currency: c });
    try {
      localStorage.setItem(STORAGE_KEY, c);
    } catch {
      /* ignora */
    }
  }

  return (
    <section
      id="pacotes"
      className="relative scroll-mt-24 overflow-hidden border-t border-[var(--color-border-glass)]/60"
    >
      <RadialGlow
        className="top-8 left-1/2 h-[420px] w-[720px] -translate-x-1/2"
        color="rgba(37,99,235,0.14)"
      />
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <SectionReveal>
          <SectionHeading
            eyebrow="PACOTES & INVESTIMENTO"
            title="Escopo fechado, prazo definido, sem surpresa."
            subtitle="Pacotes para cada momento do seu negócio. O investimento final é fechado após um diagnóstico rápido do seu projeto."
          />
        </SectionReveal>

        <div className="mt-8 flex justify-center">
          <CurrencyToggle currency={currency} onChange={change} />
        </div>

        <div className="mt-10 grid items-stretch gap-5 lg:grid-cols-3">
          {PACKAGES.map((p, i) => (
            <SectionReveal key={p.id} delay={i * 90} className="h-full">
              <PlanCard p={p} currency={currency} />
            </SectionReveal>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-4">
          {ADDONS.map((a) => (
            <SectionReveal key={a.id}>
              <div className="flex flex-col gap-5 rounded-[var(--radius-card)] border border-[var(--color-border-glass)] bg-[var(--color-slate)]/40 p-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-[var(--color-cyan)]">
                    Módulo opcional
                  </span>
                  <h3 className="text-lg font-bold">{a.name}</h3>
                  <p className="max-w-xl text-sm leading-relaxed text-[var(--color-muted)]">
                    {a.description}
                  </p>
                  {a.note && (
                    <p className="max-w-xl text-xs leading-relaxed text-[var(--color-muted)]/80">
                      {a.note}
                    </p>
                  )}
                </div>
                <div className="flex shrink-0 flex-col items-start gap-3 sm:items-end">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-sm text-[var(--color-muted)]">+</span>
                    <span className="text-2xl font-bold">
                      {formatPrice(a.priceFrom[currency], currency)}
                    </span>
                    {a.priceNote && (
                      <span className="text-xs text-[var(--color-muted)]">{a.priceNote}</span>
                    )}
                  </div>
                  <Button
                    href={waLink(a.waMessage)}
                    variant="glass"
                    size="sm"
                    target="_blank"
                    rel="noopener noreferrer"
                    event={EVENTS.whatsappClick}
                    eventParams={{ location: "addon", addon: a.id }}
                  >
                    {a.ctaText} →
                  </Button>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>

        <p className="mt-8 text-center font-mono text-xs text-[var(--color-muted)]">
          * Valores de referência. Proposta final sem compromisso após o diagnóstico.
        </p>
      </div>
    </section>
  );
}

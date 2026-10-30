import { SectionHeading, SectionReveal, Button, RadialGlow } from "@/components/ui";
import { PACKAGES, formatBRL, type Package } from "@/lib/pricing";
import { waLink } from "@/lib/site";

function PlanCard({ p }: { p: Package }) {
  const inner = (
    <div className="flex h-full flex-col gap-6 rounded-[var(--radius-card)] bg-[var(--color-slate)] p-7">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-xl font-bold">{p.name}</h3>
          {p.badge && (
            <span className="rounded-full bg-[linear-gradient(90deg,#2563EB,#38BDF8)] px-3 py-1 text-xs font-semibold text-white">
              {p.badge}
            </span>
          )}
        </div>
        <p className="text-sm leading-relaxed text-[var(--color-muted)]">{p.audience}</p>
      </div>

      <div>
        <span className="block font-mono text-xs uppercase tracking-wider text-[var(--color-muted)]">
          a partir de
        </span>
        <span className="text-3xl font-bold">{formatBRL(p.priceFrom)}</span>
        {p.period && <span className="text-sm text-[var(--color-muted)]">{p.period}</span>}
      </div>

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
      >
        {p.ctaText} →
      </Button>
    </div>
  );

  if (p.highlight) {
    return (
      <div className="relative rounded-[calc(var(--radius-card)+1px)] bg-[linear-gradient(140deg,#2563EB,#38BDF8)] p-px shadow-[var(--shadow-glow)] lg:-translate-y-2 lg:scale-[1.02]">
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

export function Pricing() {
  return (
    <section id="pacotes" className="relative scroll-mt-24 overflow-hidden border-t border-[var(--color-border-glass)]/60">
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

        <div className="mt-14 grid items-stretch gap-5 lg:grid-cols-3">
          {PACKAGES.map((p, i) => (
            <SectionReveal key={p.id} delay={i * 90} className="h-full">
              <PlanCard p={p} />
            </SectionReveal>
          ))}
        </div>

        <p className="mt-8 text-center font-mono text-xs text-[var(--color-muted)]">
          * Valores &quot;a partir de&quot;. Proposta final sem compromisso após o diagnóstico.
        </p>
      </div>
    </section>
  );
}

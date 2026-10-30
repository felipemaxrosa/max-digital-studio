import { SectionHeading, SectionReveal, Card, RadialGlow } from "@/components/ui";
import { METHOD } from "@/lib/content";

export function Method() {
  const [featured, ...rest] = METHOD.blocks;

  return (
    <section id="metodo" className="relative scroll-mt-24 overflow-hidden border-t border-[var(--color-border-glass)]/60">
      <RadialGlow
        className="top-0 left-1/2 h-[420px] w-[720px] -translate-x-1/2"
        color="rgba(37,99,235,0.16)"
      />
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <SectionReveal>
          <SectionHeading eyebrow={METHOD.eyebrow} title={METHOD.title} />
        </SectionReveal>

        <div className="mt-14 flex flex-col gap-5">
          {/* Bloco principal — Engenharia Frontend Sob Medida */}
          <SectionReveal variant="scale">
            <div className="relative overflow-hidden rounded-[var(--radius-card)] border border-[color:color-mix(in_srgb,var(--color-accent)_40%,var(--color-border-glass))] bg-gradient-to-br from-[color:color-mix(in_srgb,var(--color-accent)_12%,var(--color-slate))] to-[var(--color-slate)] p-8 md:p-10">
              <RadialGlow className="-right-10 -top-10 h-56 w-56" color="rgba(56,189,248,0.22)" />
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-[var(--color-cyan)]">
                Pilar principal
              </span>
              <h3 className="mt-3 max-w-2xl text-2xl font-bold md:text-3xl">
                {featured.title}
              </h3>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-[var(--color-muted)]">
                {featured.text}
              </p>
            </div>
          </SectionReveal>

          {/* 3 pilares de apoio */}
          <div className="grid gap-5 md:grid-cols-3">
            {rest.map((b, i) => (
              <SectionReveal key={b.title} delay={i * 90}>
                <Card className="h-full">
                  <div className="mb-4 h-1 w-10 rounded-full bg-[linear-gradient(90deg,#2563EB,#38BDF8)]" />
                  <h3 className="text-lg font-semibold">{b.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
                    {b.text}
                  </p>
                </Card>
              </SectionReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

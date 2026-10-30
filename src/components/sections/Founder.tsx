import { SectionHeading, SectionReveal, LogoMark, RadialGlow } from "@/components/ui";
import { FOUNDER } from "@/lib/content";
import { SITE } from "@/lib/site";

export function Founder() {
  return (
    <section className="relative overflow-hidden border-t border-[var(--color-border-glass)]/60">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1.25fr_0.75fr]">
          {/* Texto */}
          <SectionReveal>
            <SectionHeading align="left" eyebrow={FOUNDER.eyebrow} title={FOUNDER.title} />
            <div className="mt-6 flex max-w-2xl flex-col gap-4">
              {FOUNDER.paragraphs.map((para, i) => (
                <p key={i} className="text-base leading-relaxed text-[var(--color-muted)]">
                  {para}
                </p>
              ))}
            </div>
          </SectionReveal>

          {/* Card de autoridade */}
          <SectionReveal delay={120}>
            <div className="relative overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border-glass)] bg-[var(--color-slate)]/60 p-8 text-center">
              <RadialGlow className="inset-0 m-auto h-40 w-40" color="rgba(56,189,248,0.25)" />
              <LogoMark id="founder-mark" className="mx-auto h-14 w-14 drop-shadow-[0_0_24px_rgba(56,189,248,0.4)]" />
              <div className="mt-6 bg-[linear-gradient(90deg,#2563EB,#38BDF8)] bg-clip-text text-5xl font-bold text-transparent">
                {SITE.founderYears}+
              </div>
              <p className="mt-1 text-sm font-medium text-[var(--color-ink)]">anos de experiência</p>
              <p className="mt-1 text-xs text-[var(--color-muted)]">
                Desenvolvimento Frontend para empresas de tecnologia
              </p>
              <div className="mt-6 border-t border-[var(--color-border-glass)] pt-4">
                <p className="font-display text-lg font-bold">{SITE.founder}</p>
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-[var(--color-muted)]">
                  Fundador · {SITE.name}
                </p>
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}

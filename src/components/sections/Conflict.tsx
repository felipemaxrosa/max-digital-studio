import { SectionHeading, SectionReveal, Card, RadialGlow } from "@/components/ui";
import { CONFLICT } from "@/lib/content";

export function Conflict() {
  return (
    <section className="relative overflow-hidden border-t border-[var(--color-border-glass)]/60">
      {/* glow quente sutil — sinaliza a "tensão" do problema */}
      <RadialGlow
        className="-top-20 left-1/2 h-[360px] w-[620px] -translate-x-1/2"
        color="rgba(244,63,94,0.10)"
      />
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <SectionReveal>
          <SectionHeading
            eyebrow={CONFLICT.eyebrow}
            title={CONFLICT.title}
            subtitle={CONFLICT.lead}
          />
        </SectionReveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {CONFLICT.cards.map((c, i) => (
            <SectionReveal key={c.title} delay={i * 90}>
              <Card className="h-full">
                <div className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--color-border-glass)] font-mono text-sm text-[#FB7185]">
                  0{i + 1}
                </div>
                <h3 className="text-lg font-semibold">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
                  {c.text}
                </p>
              </Card>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

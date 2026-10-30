import { SectionHeading, SectionReveal } from "@/components/ui";
import { PROCESS } from "@/lib/content";

export function Process() {
  return (
    <section id="processo" className="relative scroll-mt-24 border-t border-[var(--color-border-glass)]/60">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <SectionReveal>
          <SectionHeading eyebrow={PROCESS.eyebrow} title={PROCESS.title} />
        </SectionReveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS.steps.map((s, i) => (
            <SectionReveal key={s.n} delay={i * 90}>
              <div className="relative flex h-full flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span className="bg-[linear-gradient(90deg,#2563EB,#38BDF8)] bg-clip-text font-mono text-3xl font-bold text-transparent">
                    {s.n}
                  </span>
                  {i < PROCESS.steps.length - 1 && (
                    <span className="hidden h-px flex-1 bg-gradient-to-r from-[var(--color-border-glass)] to-transparent lg:block" />
                  )}
                </div>
                <h3 className="text-base font-semibold">{s.title}</h3>
                <p className="text-sm leading-relaxed text-[var(--color-muted)]">
                  {s.text}
                </p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

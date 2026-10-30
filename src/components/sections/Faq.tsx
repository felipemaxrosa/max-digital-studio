import { SectionHeading, SectionReveal } from "@/components/ui";
import { FAQ } from "@/lib/content";

export function Faq() {
  return (
    <section id="faq" className="relative scroll-mt-24 border-t border-[var(--color-border-glass)]/60">
      <div className="mx-auto max-w-[820px] px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <SectionReveal>
          <SectionHeading eyebrow="TIRA-DÚVIDAS" title="Perguntas frequentes" />
        </SectionReveal>

        <div className="mt-12 flex flex-col gap-3">
          {FAQ.map((item, i) => (
            <SectionReveal key={i} delay={i * 70}>
              <details className="group rounded-[var(--radius-card)] border border-[var(--color-border-glass)] bg-[var(--color-slate)]/50 p-5 transition-colors open:border-[color:color-mix(in_srgb,var(--color-accent)_45%,transparent)]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span
                    className="shrink-0 text-xl leading-none text-[var(--color-cyan)] transition-transform duration-300 group-open:rotate-45"
                    aria-hidden
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
                  {item.a}
                </p>
              </details>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

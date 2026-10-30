import { SectionReveal, Button, RadialGlow } from "@/components/ui";
import { FINAL_CTA } from "@/lib/content";
import { waLink, WA_MESSAGES } from "@/lib/site";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden border-t border-[var(--color-border-glass)]/60">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <SectionReveal>
          <div className="relative overflow-hidden rounded-[calc(var(--radius-card)+4px)] border border-[color:color-mix(in_srgb,var(--color-accent)_35%,var(--color-border-glass))] bg-gradient-to-br from-[color:color-mix(in_srgb,var(--color-accent)_14%,var(--color-slate))] to-[var(--color-slate)] p-10 text-center md:p-16">
            <RadialGlow
              className="-top-10 left-1/2 h-72 w-[520px] -translate-x-1/2"
              color="rgba(56,189,248,0.22)"
            />
            <h2 className="mx-auto max-w-2xl text-3xl font-bold text-balance md:text-4xl">
              {FINAL_CTA.title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[var(--color-muted)] text-pretty">
              {FINAL_CTA.text}
            </p>
            <div className="mt-8 flex justify-center">
              <Button
                href={waLink(WA_MESSAGES.proposal)}
                variant="whatsapp"
                size="lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                {FINAL_CTA.cta} →
              </Button>
            </div>
            <p className="mt-5 font-mono text-xs text-[var(--color-muted)]">
              {FINAL_CTA.microcopy}
            </p>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

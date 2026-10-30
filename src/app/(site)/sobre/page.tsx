import type { Metadata } from "next";
import { SectionHeading, SectionReveal, Card, RadialGlow, Button } from "@/components/ui";
import { Founder, Process } from "@/components/sections";
import { ABOUT } from "@/lib/content";
import { waLink, WA_MESSAGES } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "Estúdio digital de identidade visual e landing pages de alta conversão, com padrão de engenharia de produto. Atendimento remoto para todo o Brasil.",
  alternates: { canonical: "/sobre" },
};

export default function SobrePage() {
  return (
    <>
      {/* Intro */}
      <section className="relative overflow-hidden">
        <RadialGlow
          className="-top-24 left-1/2 h-[420px] w-[620px] -translate-x-1/2"
          color="rgba(37,99,235,0.2)"
        />
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 pt-20 pb-6 md:pt-28">
          <SectionHeading
            align="left"
            eyebrow={ABOUT.eyebrow}
            title={ABOUT.title}
            subtitle={ABOUT.intro}
          />
        </div>
      </section>

      {/* Para quem é */}
      <section className="border-t border-[var(--color-border-glass)]/60">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-20 md:py-24">
          <SectionReveal>
            <SectionHeading
              eyebrow={ABOUT.positioning.eyebrow}
              title={ABOUT.positioning.title}
            />
          </SectionReveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {ABOUT.positioning.items.map((item, i) => (
              <SectionReveal key={item.title} delay={i * 90}>
                <Card className="h-full">
                  <div className="mb-4 h-1 w-10 rounded-full bg-[linear-gradient(90deg,#2563EB,#38BDF8)]" />
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
                    {item.text}
                  </p>
                </Card>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Autoridade do fundador (reaproveita a seção) */}
      <Founder />

      {/* Processo (reaproveita a seção) */}
      <Process />

      {/* CTA */}
      <section className="border-t border-[var(--color-border-glass)]/60">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-5 px-4 sm:px-6 lg:px-8 py-20 text-center md:py-24">
          <h2 className="max-w-xl text-2xl font-bold md:text-3xl">
            Vamos construir a próxima marca forte juntos?
          </h2>
          <Button
            href={waLink(WA_MESSAGES.default)}
            variant="whatsapp"
            size="lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            Falar com o especialista →
          </Button>
        </div>
      </section>
    </>
  );
}

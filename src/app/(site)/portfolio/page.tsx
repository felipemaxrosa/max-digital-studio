import type { Metadata } from "next";
import { SectionHeading, SectionReveal, Button, RadialGlow } from "@/components/ui";
import { CaseCard } from "@/components/portfolio/CaseCard";
import { PROJECTS, MEASURED_AT } from "@/lib/portfolio";
import { waLink, WA_MESSAGES } from "@/lib/site";

export const metadata: Metadata = {
  title: "Portfólio",
  description:
    "Projetos autorais e demonstrações da Max Digital Studio, por nicho: beleza, barbearia, gastronomia, educação e música. Com performance Lighthouse medida.",
  alternates: { canonical: "/portfolio" },
};

export default function PortfolioPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <RadialGlow
          className="-top-24 left-1/2 h-[420px] w-[620px] -translate-x-1/2"
          color="rgba(37,99,235,0.2)"
        />
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 pt-20 pb-6 md:pt-28">
          <SectionHeading
            align="left"
            eyebrow="PORTFÓLIO EM AÇÃO"
            title="Cases construídos para destacar marcas e fechar negócios."
            subtitle={`Projetos autorais e demonstrações por nicho, cada um com o desafio enfrentado e a solução entregue. Os scores são Lighthouse (lab · mobile) medidos em ${MEASURED_AT}.`}
          />
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2">
          {PROJECTS.map((p, i) => (
            <SectionReveal key={p.slug} delay={(i % 2) * 100}>
              <CaseCard project={p} detailed priority={i < 2} />
            </SectionReveal>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center gap-4 text-center">
          <p className="font-mono text-xs text-[var(--color-muted)]">
            Quer um resultado como esses para o seu negócio?
          </p>
          <Button
            href={waLink(WA_MESSAGES.default)}
            variant="whatsapp"
            size="lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            Começar meu projeto →
          </Button>
        </div>
      </section>
    </>
  );
}

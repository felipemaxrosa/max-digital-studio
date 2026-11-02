import { SectionHeading, SectionReveal, Button } from "@/components/ui";
import { CaseCard } from "@/components/portfolio/CaseCard";
import { FEATURED_PROJECTS, MEASURED_AT } from "@/lib/portfolio";

export function PortfolioShowcase() {
  return (
    <section id="vitrine" className="relative scroll-mt-24 border-t border-[var(--color-border-glass)]/60">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <SectionReveal>
          <SectionHeading
            eyebrow="PORTFÓLIO EM AÇÃO"
            title="Projetos construídos para destacar marcas e fechar negócios."
            subtitle="Projetos autorais e demonstrações, organizados por nicho — cada um com seu ângulo de venda e performance medida de verdade."
          />
        </SectionReveal>

        <div className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED_PROJECTS.map((p, i) => (
            <SectionReveal key={p.slug} delay={(i % 3) * 90}>
              <CaseCard project={p} priority={i < 3} />
            </SectionReveal>
          ))}
        </div>

        <p className="mt-10 text-center font-mono text-[0.7rem] text-[var(--color-muted)]/80">
          Scores Lighthouse (lab · mobile) medidos em {MEASURED_AT}.
        </p>

        <div className="mt-8 flex justify-center">
          <Button href="/portfolio" variant="glass" size="md">
            Ver todos os projetos →
          </Button>
        </div>
      </div>
    </section>
  );
}

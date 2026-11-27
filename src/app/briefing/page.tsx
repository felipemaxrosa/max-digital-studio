import type { Metadata } from "next";
import { Button, RadialGlow, TechBadge } from "@/components/ui";
import { WhatsAppIcon } from "@/components/icons";
import { BriefingServiceCard, BriefingViewTracker } from "@/components/briefing";
import { HUB, SERVICE_CARDS } from "@/lib/briefing/content";
import { waLink, WA_MESSAGES } from "@/lib/site";
import { EVENTS } from "@/lib/analytics";

export const metadata: Metadata = {
  title: "Briefing de Projetos",
  description:
    "Conheça nossas soluções de Identidade Visual e Landing Pages e compartilhe as informações do seu próximo projeto.",
  alternates: { canonical: "/briefing" },
  robots: { index: true, follow: true },
};

export default function BriefingHubPage() {
  return (
    <>
      <BriefingViewTracker />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <RadialGlow className="left-1/2 top-[-120px] h-[520px] w-[520px] -translate-x-1/2" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-border-glass) 1px, transparent 1px), linear-gradient(90deg, var(--color-border-glass) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(ellipse at center top, black, transparent 72%)",
            WebkitMaskImage: "radial-gradient(ellipse at center top, black, transparent 72%)",
          }}
        />
        <div className="mx-auto max-w-[1100px] px-4 py-16 sm:px-6 md:py-24 lg:px-8">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-5 text-center">
            <TechBadge dot>{HUB.eyebrow}</TechBadge>
            <h1 className="text-balance text-3xl font-bold md:text-4xl lg:text-5xl">{HUB.title}</h1>
            <p className="text-pretty text-base leading-relaxed text-[var(--color-muted)] md:text-lg">
              {HUB.subtitle}
            </p>
          </div>

          {/* Cards de serviço */}
          <div className="mx-auto mt-14 grid max-w-3xl gap-5 sm:grid-cols-2">
            {SERVICE_CARDS.map((card) => (
              <BriefingServiceCard key={card.service} card={card} />
            ))}
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section className="mx-auto max-w-[1100px] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <h2 className="text-center text-2xl font-bold md:text-3xl">{HUB.howTitle}</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {HUB.how.map((step) => (
            <div key={step.n} className="flex flex-col gap-2">
              <span className="font-mono text-sm text-[var(--color-accent-alt)]">{step.n}</span>
              <h3 className="text-base font-semibold text-[var(--color-ink)]">{step.title}</h3>
              <p className="text-sm leading-relaxed text-[var(--color-muted)]">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Assistência */}
      <section className="mx-auto max-w-[1100px] px-4 pb-20 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-5 rounded-[var(--radius-card)] border border-[var(--color-border-glass)] bg-[var(--color-slate)]/40 px-6 py-12 text-center">
          <h2 className="max-w-xl text-balance text-2xl font-bold md:text-3xl">{HUB.assistTitle}</h2>
          <p className="max-w-lg text-pretty text-[var(--color-muted)]">{HUB.assistText}</p>
          <Button
            href={waLink(WA_MESSAGES.briefingHelp)}
            variant="whatsapp"
            size="lg"
            target="_blank"
            rel="noopener noreferrer"
            event={EVENTS.briefingWhatsappClick}
            eventParams={{ location: "assist" }}
          >
            <WhatsAppIcon className="h-5 w-5" /> {HUB.assistCta}
          </Button>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import { SectionHeading, RadialGlow } from "@/components/ui";
import { ProposalForm } from "@/components/form/ProposalForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { WhatsAppIcon, MailIcon, InstagramIcon } from "@/components/icons";
import { SITE, waLink, WA_MESSAGES } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Monte sua proposta ideal com a Max Digital Studio. Fale direto no WhatsApp ou envie um resumo do seu projeto — resposta em até 2 horas em horário comercial.",
  alternates: { canonical: "/contato" },
};

export default function ContatoPage() {
  return (
    <section className="relative overflow-hidden">
      <JsonLd />
      <RadialGlow
        className="-top-24 left-1/2 h-[420px] w-[620px] -translate-x-1/2"
        color="rgba(37,99,235,0.2)"
      />
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <SectionHeading
          align="left"
          eyebrow="MONTE SUA PROPOSTA IDEAL"
          title="Me conta do seu projeto — eu respondo rápido."
          subtitle="Preencha o resumo abaixo (ou chame direto no WhatsApp). Com essas respostas eu já chego na conversa com uma proposta sob medida."
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.3fr_0.7fr]">
          {/* Formulário */}
          <div>
            <ProposalForm />
          </div>

          {/* Canais diretos */}
          <aside className="flex flex-col gap-4">
            <a
              href={waLink(WA_MESSAGES.default)}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-4 rounded-[var(--radius-card)] border border-[var(--color-border-glass)] bg-[var(--color-slate)]/60 p-5 transition-colors hover:border-[#25D366]/60"
            >
              <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#25D366]/15 text-[#25D366]">
                <WhatsAppIcon className="h-5 w-5" />
              </span>
              <span className="flex flex-col">
                <span className="font-semibold">WhatsApp</span>
                <span className="text-sm text-[var(--color-muted)]">
                  Resposta em até 2h em horário comercial
                </span>
              </span>
            </a>

            <a
              href={`mailto:${SITE.email}`}
              className="group flex items-start gap-4 rounded-[var(--radius-card)] border border-[var(--color-border-glass)] bg-[var(--color-slate)]/60 p-5 transition-colors hover:border-[var(--color-accent)]/60"
            >
              <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-accent)]/15 text-[var(--color-cyan)]">
                <MailIcon className="h-5 w-5" />
              </span>
              <span className="flex flex-col">
                <span className="font-semibold">E-mail</span>
                <span className="text-sm text-[var(--color-muted)]">{SITE.email}</span>
              </span>
            </a>

            <a
              href={SITE.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-4 rounded-[var(--radius-card)] border border-[var(--color-border-glass)] bg-[var(--color-slate)]/60 p-5 transition-colors hover:border-[var(--color-accent)]/60"
            >
              <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-accent)]/15 text-[var(--color-cyan)]">
                <InstagramIcon className="h-5 w-5" />
              </span>
              <span className="flex flex-col">
                <span className="font-semibold">Instagram</span>
                <span className="text-sm text-[var(--color-muted)]">{SITE.social.instagramHandle}</span>
              </span>
            </a>

            <p className="mt-2 rounded-[var(--radius-card)] border border-[var(--color-border-glass)] bg-[var(--color-slate)]/30 p-5 text-sm leading-relaxed text-[var(--color-muted)]">
              Atendimento 100% remoto para todo o {SITE.location}. Sem ponto físico — toda a
              comunicação acontece pelo WhatsApp e e-mail, com agilidade.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}

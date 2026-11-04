import Link from "next/link";
import Image from "next/image";
import { MailIcon, InstagramIcon, WhatsAppIcon } from "@/components/icons";
import { SITE, waLink, WA_MESSAGES } from "@/lib/site";
import { FOOTER } from "@/lib/content";

const navCols = [
  {
    title: "Navegação",
    links: [
      { label: "Início", href: "/" },
      { label: "Projetos", href: "/portfolio" },
      { label: "Sobre", href: "/sobre" },
      { label: "Contato", href: "/contato" },
    ],
  },
  {
    title: "Na Home",
    links: [
      { label: "Diferenciais", href: "/#metodo" },
      { label: "Processo", href: "/#processo" },
      { label: "Pacotes", href: "/#pacotes" },
      { label: "FAQ", href: "/#faq" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border-glass)] bg-[var(--color-slate)]/40">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Marca */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="inline-flex items-center" aria-label="Max Digital Studio — Início">
              <Image
                src="/brand/logo-lockup.png"
                alt="Max Digital Studio"
                width={1044}
                height={263}
                sizes="220px"
                className="h-9 w-auto"
              />
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-[var(--color-muted)]">
              Atendimento remoto para o {FOOTER.location}.
            </p>
          </div>

          {/* Colunas de links */}
          {navCols.map((col) => (
            <nav key={col.title} aria-label={col.title} className="flex flex-col gap-3">
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-[var(--color-muted)]/70">
                {col.title}
              </span>
              {col.links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          ))}

          {/* Contato */}
          <div className="flex flex-col gap-3">
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-[var(--color-muted)]/70">
              Contato
            </span>
            <a
              href={waLink(WA_MESSAGES.default)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
            >
              <WhatsAppIcon className="h-4 w-4 text-[#25D366]" /> WhatsApp
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="inline-flex items-center gap-2 text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
            >
              <MailIcon className="h-4 w-4" /> {SITE.email}
            </a>
            <a
              href={SITE.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
            >
              <InstagramIcon className="h-4 w-4" /> {SITE.social.instagramHandle}
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-3 border-t border-[var(--color-border-glass)] pt-6 text-center">
          <Link
            href="/privacidade"
            className="font-mono text-xs text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
          >
            Política de Privacidade
          </Link>
          <p className="font-mono text-xs text-[var(--color-muted)]/70">{FOOTER.signature}</p>
        </div>
      </div>
    </footer>
  );
}

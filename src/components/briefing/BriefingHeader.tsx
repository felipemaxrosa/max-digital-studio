import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui";
import { WhatsAppIcon } from "@/components/icons";
import { waLink, WA_MESSAGES } from "@/lib/site";
import { EVENTS } from "@/lib/analytics";

/** Header enxuto da Central de Briefings: logo, voltar ao site e WhatsApp. */
export function BriefingHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border-glass)] bg-[var(--color-obsidian)]/80 backdrop-blur-md">
      <div className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center" aria-label="Max Digital Studio — Início">
            <Image
              src="/brand/logo-lockup.png"
              alt="Max Digital Studio"
              width={1044}
              height={263}
              priority
              sizes="170px"
              className="h-7 w-auto"
            />
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="hidden text-sm font-medium text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)] sm:inline"
            >
              ← Voltar ao site
            </Link>
            <Button
              href={waLink(WA_MESSAGES.briefing)}
              variant="glass"
              size="sm"
              target="_blank"
              rel="noopener noreferrer"
              event={EVENTS.briefingWhatsappClick}
              eventParams={{ location: "header" }}
            >
              <WhatsAppIcon className="h-4 w-4" /> WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

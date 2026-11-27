import Link from "next/link";
import { FOOTER } from "@/lib/content";

/** Footer enxuto: assinatura + link para a política de privacidade. */
export function BriefingFooter() {
  return (
    <footer className="mt-20 border-t border-[var(--color-border-glass)]">
      <div className="mx-auto flex max-w-[1100px] flex-col items-center justify-between gap-3 px-4 py-8 text-sm text-[var(--color-muted)] sm:flex-row sm:px-6 lg:px-8">
        <p>{FOOTER.signature}</p>
        <Link href="/privacidade" className="transition-colors hover:text-[var(--color-ink)]">
          Política de Privacidade
        </Link>
      </div>
    </footer>
  );
}

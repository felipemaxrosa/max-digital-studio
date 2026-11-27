import type { Metadata } from "next";
import { BriefingHeader, BriefingFooter } from "@/components/briefing";

export const metadata: Metadata = {
  title: "Central de Projetos",
  // Default do segmento: formulários e confirmação NÃO indexam.
  // O hub (/briefing) sobrescreve para index: true.
  robots: { index: false, follow: true },
};

export default function BriefingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#briefing-main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-[999] focus:rounded-lg focus:bg-[var(--color-accent)] focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Pular para o conteúdo
      </a>
      <BriefingHeader />
      <main id="briefing-main" className="min-h-[60vh]">
        {children}
      </main>
      <BriefingFooter />
    </>
  );
}

import { Navbar, Footer, WhatsAppFloat } from "@/components/layout";
import ScrollReveal from "@/components/ScrollReveal";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-[999] focus:rounded-lg focus:bg-[var(--color-accent)] focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Pular para o conteúdo
      </a>
      <Navbar />
      <main id="main-content">{children}</main>
      <Footer />
      <WhatsAppFloat />
      <ScrollReveal />
    </>
  );
}

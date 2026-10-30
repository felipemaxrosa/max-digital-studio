import { WhatsAppIcon } from "@/components/icons";
import { waLink, WA_MESSAGES } from "@/lib/site";

/** Botão flutuante de WhatsApp — CTA primário presente em todas as páginas. */
export function WhatsAppFloat() {
  return (
    <a
      href={waLink(WA_MESSAGES.default)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-[#06130b] shadow-[0_10px_30px_rgba(37,211,102,0.45)] transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}

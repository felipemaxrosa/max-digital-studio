/**
 * Camada central de analytics (GA4 + Meta Pixel).
 * Todos os eventos passam por aqui — nomes ficam só em EVENTS.
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

/** Nomes de eventos. Centralizados — não espalhar strings pelo código. */
export const EVENTS = {
  whatsappClick: "whatsapp_click",
  navCta: "nav_cta",
  heroCta: "hero_cta",
  packageCta: "package_cta",
  finalCta: "final_cta",
  portfolioView: "portfolio_view",
  currencyChange: "currency_change",
  proposalSubmit: "proposal_submit",
  proposalWhatsapp: "proposal_whatsapp",
} as const;

export type AnalyticsEvent = (typeof EVENTS)[keyof typeof EVENTS];

export type EventParams = Record<string, string | number | boolean | undefined>;

/**
 * Mapeia nossos eventos para eventos PADRÃO do Meta (otimização de anúncios).
 * Os não listados vão como evento customizado (trackCustom).
 */
const META_STANDARD: Partial<Record<AnalyticsEvent, string>> = {
  [EVENTS.proposalSubmit]: "Lead",
  [EVENTS.whatsappClick]: "Contact",
  [EVENTS.navCta]: "Contact",
  [EVENTS.heroCta]: "Contact",
  [EVENTS.packageCta]: "Contact",
  [EVENTS.finalCta]: "Contact",
  [EVENTS.proposalWhatsapp]: "Contact",
};

/** Envia um evento ao GA4 e ao Meta Pixel. No-op para o que ainda não carregou. */
export function track(event: AnalyticsEvent, params?: EventParams): void {
  if (typeof window === "undefined") return;

  // Google Analytics (GA4)
  if (typeof window.gtag === "function") {
    window.gtag("event", event, params ?? {});
  }

  // Meta Pixel
  if (typeof window.fbq === "function") {
    const standard = META_STANDARD[event];
    if (standard) window.fbq("track", standard, params);
    else window.fbq("trackCustom", event, params);
  }
}

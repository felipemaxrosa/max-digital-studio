/**
 * Camada central de analytics (GA4).
 * Todos os eventos passam por aqui — nomes ficam só em EVENTS.
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Nomes de eventos (GA4). Centralizados — não espalhar strings pelo código. */
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

/** Envia um evento ao GA4. No-op se o gtag ainda não carregou (ex.: dev). */
export function track(event: AnalyticsEvent, params?: EventParams): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", event, params ?? {});
}

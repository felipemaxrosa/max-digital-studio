/**
 * Pacotes de serviço (dobra "Pacotes & Preços").
 *
 * ⚠️ EDITE AQUI os valores "a partir de" — um por moeda.
 * (BRL = Brasil / EUR = Portugal.) A formatação é automática.
 */
import { WA_MESSAGES } from "./site";

const PRICE_FROM = {
  lp:         { BRL: 1497, EUR: 500 }, // Landing Page de Alta Conversão
  identidade: { BRL: 2497, EUR: 800 }, // Identidade + Landing Page (Carro-Chefe)
  manutencao: { BRL: 197,  EUR: 50 },  // Retenção / Manutenção — por mês
} as const;

export type Currency = "BRL" | "EUR";

export type Package = {
  id: string;
  name: string;
  audience: string;
  priceFrom: { BRL: number; EUR: number };
  /** sufixo de período, ex.: "/mês" (vazio = pagamento único) */
  period?: string;
  deadline?: string;
  deliverables: string[];
  highlight?: boolean;
  badge?: string;
  ctaText: string;
  waMessage: string;
};

export const PACKAGES: Package[] = [
  {
    id: "lp",
    name: "LP de Alta Conversão",
    audience: "Para negócios que já têm identidade visual, mas precisam de leads agora.",
    priceFrom: PRICE_FROM.lp,
    deadline: "Entrega em 7 a 15 dias úteis",
    deliverables: [
      "Copy persuasiva (estrutura de alta conversão)",
      "Estrutura de página sob medida",
      "Integração com WhatsApp / CRM",
      "Tracking: Pixel + Google Analytics",
      "Código ultrarrápido e 100% responsivo",
    ],
    ctaText: "Quero esse pacote",
    waMessage: WA_MESSAGES.pacoteLP,
  },
  {
    id: "identidade",
    name: "Identidade + Landing Page",
    audience: "Para negócios novos ou prestadores que querem profissionalizar do zero.",
    priceFrom: PRICE_FROM.identidade,
    deadline: "Entrega em 7 a 15 dias úteis",
    deliverables: [
      "Mini guia de marca (logo, paleta, tipografia)",
      "Copy de vendas completa",
      "Landing page responsiva desenvolvida",
      "Integração WhatsApp + tracking",
      "Otimização de performance e SEO",
    ],
    highlight: true,
    badge: "Carro-Chefe",
    ctaText: "Quero o carro-chefe",
    waMessage: WA_MESSAGES.pacoteIdentidade,
  },
  {
    id: "manutencao",
    name: "Retenção / Manutenção",
    audience: "Para manter seu site sempre no ar, rápido e atualizado.",
    priceFrom: PRICE_FROM.manutencao,
    period: "/mês",
    deliverables: [
      "Hospedagem gerenciada",
      "Pequenas alterações mensais de texto / ofertas",
      "Monitoramento técnico e atualizações",
      "Suporte prioritário",
    ],
    ctaText: "Falar sobre manutenção",
    waMessage: WA_MESSAGES.pacoteManutencao,
  },
];

/** Formata o valor na moeda ("R$ 1.497" / "500 €"). */
export function formatPrice(value: number, currency: Currency): string {
  const locale = currency === "EUR" ? "pt-PT" : "pt-BR";
  return value.toLocaleString(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  });
}

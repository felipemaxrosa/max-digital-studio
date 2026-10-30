/**
 * Pacotes de serviço (dobra "Pacotes & Preços").
 *
 * ⚠️ EDITE AQUI os valores "a partir de" — são placeholders até você definir.
 * Troque só os números abaixo; a formatação em R$ é automática.
 */
const PRICE_FROM = {
  lp: 1497, // Landing Page de Alta Conversão
  identidade: 2497, // Identidade + Landing Page (Carro-Chefe)
  manutencao: 197, // Retenção / Manutenção — por mês
} as const;

import { WA_MESSAGES } from "./site";

export type Package = {
  id: string;
  name: string;
  audience: string;
  priceFrom: number;
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

/** Formata número como "a partir de R$ 1.497". */
export function formatBRL(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });
}

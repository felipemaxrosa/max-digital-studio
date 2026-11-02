/**
 * Pacotes de serviço (dobra "Pacotes & Preços").
 *
 * ⚠️ EDITE AQUI os valores "a partir de" — um por moeda.
 * (BRL = Brasil / EUR = Portugal.) A formatação é automática.
 */
import { WA_MESSAGES } from './site';

const PRICE_FROM = {
  lp: { BRL: 1500, EUR: 500 }, // Landing Page de Alta Conversão
  identidade: { BRL: 2500, EUR: 800 }, // Identidade + Landing Page (Carro-Chefe)
  manutencao: { BRL: 75, EUR: 25 }, // Plano de cuidado contínuo — por mês
} as const;

export type Currency = 'BRL' | 'EUR';

export type Package = {
  id: string;
  name: string;
  audience: string;
  priceFrom: { BRL: number; EUR: number };
  /** sufixo de período, ex.: "/mês" (vazio = pagamento único) */
  period?: string;
  /** rótulo acima do preço (default "a partir de") */
  priceLabel?: string;
  /** ancoragem de valor: preço do ajuste avulso (fora do plano), por moeda */
  anchorPrice?: { BRL: number; EUR: number };
  anchorEyebrow?: string;
  anchorBefore?: string;
  anchorAfter?: string;
  deadline?: string;
  deliverables: string[];
  highlight?: boolean;
  badge?: string;
  ctaText: string;
  waMessage: string;
};

export const PACKAGES: Package[] = [
  {
    id: 'lp',
    name: 'LP de Alta Conversão',
    audience:
      'Para negócios que já têm identidade visual, mas precisam de leads agora.',
    priceFrom: PRICE_FROM.lp,
    deadline: 'Entrega em 7 a 15 dias úteis',
    deliverables: [
      'Copy persuasiva (estrutura de alta conversão)',
      'Estrutura de página sob medida',
      'Integração com WhatsApp / CRM',
      'Tracking: Pixel + Google Analytics',
      'Código ultrarrápido e 100% responsivo',
    ],
    ctaText: 'Quero esse pacote',
    waMessage: WA_MESSAGES.pacoteLP,
  },
  {
    id: 'identidade',
    name: 'Identidade + Landing Page',
    audience:
      'Para negócios novos ou prestadores que querem profissionalizar do zero.',
    priceFrom: PRICE_FROM.identidade,
    deadline: 'Entrega em 7 a 15 dias úteis',
    deliverables: [
      'Mini guia de marca (logo, paleta, tipografia)',
      'Copy de vendas completa',
      'Landing page responsiva desenvolvida',
      'Integração WhatsApp + tracking',
      'Otimização de performance e SEO',
    ],
    highlight: true,
    badge: 'Carro-Chefe',
    ctaText: 'Quero o carro-chefe',
    waMessage: WA_MESSAGES.pacoteIdentidade,
  },
  {
    id: 'manutencao',
    name: 'Cuidamos de Tudo',
    audience:
      'Para quem quer que a gente continue cuidando de tudo: site sempre no ar, rápido e atualizado — sem você precisar se preocupar.',
    priceFrom: PRICE_FROM.manutencao,
    period: '/mês',
    priceLabel: 'plano mensal',
    anchorPrice: { BRL: 300, EUR: 100 }, // ⚠️ EDITE AQUI o preço do ajuste avulso (fora do plano)
    anchorEyebrow: 'Compare',
    anchorBefore: 'Avulso, fora do plano, cada ajuste sai por',
    anchorAfter: '. No plano, a gente cuida da sua página a cada 15 dias — incluso.',
    deliverables: [
      'Ajustes quinzenais (2x/mês): textos, ofertas e imagens',
      'Hospedagem gerenciada e domínio sempre no ar',
      'Monitoramento, backups e atualizações de segurança',
      'Suporte prioritário com resposta rápida',
    ],
    ctaText: 'Quero esse cuidado',
    waMessage: WA_MESSAGES.pacoteManutencao,
  },
];

/** Formata o valor na moeda ("R$ 1.497" / "500 €"). */
export function formatPrice(value: number, currency: Currency): string {
  const locale = currency === 'EUR' ? 'pt-PT' : 'pt-BR';
  return value.toLocaleString(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  });
}

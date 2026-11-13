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
  manutencao: { BRL: 180, EUR: 45 }, // Plano "Cuidamos de Tudo" — por mês
} as const;

/** Hospedagem gerenciada obrigatória (avulsa) — ⚠️ EDITE AQUI. Inclusa no plano "Cuidamos de Tudo". */
export const HOSTING_PRICE = { BRL: 50, EUR: 15 };

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
  /** preço anual à vista (opcional), por moeda */
  annualPrice?: { BRL: number; EUR: number };
  /** ancoragem de valor: preço da intervenção avulsa (fora do plano), por moeda */
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

export type AddOn = {
  id: string;
  name: string;
  description: string;
  priceFrom: { BRL: number; EUR: number };
  /** rótulo do preço, ex.: "adicional único" */
  priceNote?: string;
  /** nota de posicionamento (quando faz sentido contratar) */
  note?: string;
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
      'Guia de marca (logo, paleta, tipografia)',
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
      'Para manter sua página sempre no ar, ultrarrápida e atualizada — sem você se preocupar com tecnologia.',
    priceFrom: PRICE_FROM.manutencao,
    period: '/mês',
    priceLabel: 'plano mensal',
    annualPrice: { BRL: 1800, EUR: 450 }, // à vista no ano
    anchorPrice: HOSTING_PRICE,
    anchorEyebrow: 'Compare',
    anchorBefore:
      'A Hospedagem Gerenciada avulsa, obrigatória para o site existir, custa',
    anchorAfter:
      '/mês. Neste plano, além da infraestrutura essencial, o suporte prioritário e as atualizações de conteúdo já estão inclusos.',
    deliverables: [
      'Hospedagem gerenciada em infraestrutura moderna (zero preocupação com servidores e DNS)',
      'Certificado SSL e domínio sempre monitorados',
      'Até 2 intervenções mensais de conteúdo (atualização de textos, troca de fotos de campanha ou ajustes de preços)',
      'Backups automáticos e atualizações de segurança',
      'Suporte prioritário via WhatsApp — canal direto com o desenvolvedor',
    ],
    ctaText: 'Quero esse cuidado',
    waMessage: WA_MESSAGES.pacoteManutencao,
  },
];

/** Módulos opcionais (add-ons) exibidos abaixo dos pacotes. */
export const ADDONS: AddOn[] = [
  {
    id: 'cms',
    name: 'Painel de Atualizações (CMS)',
    description:
      'Edite textos, fotos e preços você mesmo, em tempo real e sem tocar no código — painel moderno e intuitivo (Sanity.io).',
    priceFrom: { BRL: 500, EUR: 125 }, // ⚠️ EDITE AQUI o adicional do painel CMS
    priceNote: 'adicional único',
    note: 'Valor único de implementação. Para manter o painel no ar e com suporte, é preciso um plano mensal de manutenção ativo. Ideal para quem atualiza conteúdo com frequência.',
    ctaText: 'Quero o painel',
    waMessage: WA_MESSAGES.painelCMS,
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

/**
 * Configuração central do Max Digital Studio.
 * Fonte única para contatos, URL e links de WhatsApp.
 */

// URL base: domínio próprio (NEXT_PUBLIC_SITE_URL) > produção Vercel > localhost.
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

// WhatsApp — formato internacional só com dígitos, sem "+". (+351 = Portugal)
const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP || "351936212180";

export const SITE = {
  name: "Max Digital Studio",
  shortName: "Max Digital Studio",
  tagline: "Identidade Visual & Landing Pages",
  description:
    "Estúdio digital de identidade visual e landing pages de alta conversão. Design exclusivo, código ultrarrápido e foco em resultados — atendimento remoto para o Brasil e Portugal.",
  url: SITE_URL,
  whatsapp: WHATSAPP,
  email: "contato@maxdigitalstudio.com.br",
  location: "Brasil e Portugal",
  founder: "Felipe",
  founderYears: 6,
  social: {
    instagram: "https://instagram.com/max.digitalstudio",
    instagramHandle: "@max.digitalstudio",
  },
} as const;

/** Monta um link wa.me com mensagem opcional pré-preenchida. */
export function waLink(text?: string): string {
  const base = `https://wa.me/${SITE.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

/** Mensagens padrão por contexto de CTA. */
export const WA_MESSAGES = {
  default:
    "Olá, Felipe! Vim pelo site da Max Digital Studio e quero saber mais. Pode me ajudar?",
  hero:
    "Olá, Felipe! Vim pelo site da Max Digital Studio e quero uma página de alta conversão. Pode me ajudar?",
  proposal:
    "Olá, Felipe! Quero solicitar uma proposta pela Max Digital Studio.",
  pacoteLP:
    "Olá, Felipe! Tenho interesse no pacote de Landing Page de Alta Conversão da Max Digital Studio.",
  pacoteIdentidade:
    "Olá, Felipe! Tenho interesse no pacote Identidade + Landing Page da Max Digital Studio.",
  pacoteManutencao:
    "Olá, Felipe! Tenho interesse no plano de Retenção/Manutenção da Max Digital Studio.",
} as const;

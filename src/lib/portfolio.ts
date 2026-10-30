/**
 * Cases do portfólio, por nicho comercial (Desafio → Solução).
 * Os screenshots vivem em public/portfolio/<slug>-{desktop,mobile}.png
 * (gerados por `pnpm shots`). Os scores em METRICS são Lighthouse (lab, mobile)
 * medidos localmente — honestos e rotulados com MEASURED_AT.
 */

export type Metrics = {
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
};

export type Project = {
  slug: string;
  name: string;
  niche: string;
  url: string;
  challenge: string;
  solution: string;
};

export const MEASURED_AT = "outubro de 2026";

/** Preenchido por scripts/measure (Lighthouse). performance 0 = ainda não medido. */
export const METRICS: Record<string, Metrics> = {
  "amanda-beauty": { performance: 75, accessibility: 96, bestPractices: 100, seo: 100 },
  "a-casa-barbearia": { performance: 93, accessibility: 96, bestPractices: 100, seo: 100 },
  "la-casa-pastel": { performance: 92, accessibility: 96, bestPractices: 100, seo: 100 },
  "escolinha-encantada": { performance: 92, accessibility: 96, bestPractices: 100, seo: 100 },
  "sol-music": { performance: 87, accessibility: 95, bestPractices: 100, seo: 100 },
  "musica-e-brasil": { performance: 91, accessibility: 92, bestPractices: 100, seo: 100 },
};

export const PROJECTS: Project[] = [
  {
    slug: "amanda-beauty",
    name: "Amanda Domingues Beauty Studio",
    niche: "Saúde, Beleza & Estética",
    url: "https://lp-amanda-domingues-beauty-studio.vercel.app/",
    challenge:
      "Posicionar procedimentos de estética avançada com elegância para atrair clientes de alto poder aquisitivo.",
    solution:
      "Identidade visual minimalista e suave, destacando serviços, depoimentos e botão de agendamento no WhatsApp em evidência constante.",
  },
  {
    slug: "a-casa-barbearia",
    name: "A Casa Barbearia",
    niche: "Negócios Masculinos & Barbearias",
    url: "https://a-casa-barbearia.vercel.app/",
    challenge:
      "Destacar a atmosfera rústica e moderna do espaço e facilitar a marcação de horários sem atritos.",
    solution:
      "Design dark mode com tipografia marcante, apresentação clara da equipe e botão de agendamento em dois toques.",
  },
  {
    slug: "la-casa-pastel",
    name: "La Casa de Pastel Caraguá",
    niche: "Gastronomia & Delivery",
    url: "https://la-casa-de-pastel-caragua.vercel.app/",
    challenge:
      "Apresentar o cardápio completo de forma rápida no 4G móvel e direcionar pedidos sem taxas de marketplace.",
    solution:
      "Layout visual com fotos dos pratos, categorização ágil e encaminhamento do pedido formatado direto para o WhatsApp do restaurante.",
  },
  {
    slug: "escolinha-encantada",
    name: "Escolinha Encantada",
    niche: "Educação Infantil",
    url: "https://escolinha-encantada.vercel.app/",
    challenge:
      "Transmitir segurança, afeto e estrutura pedagógica para pais em busca de matrículas.",
    solution:
      "Cores acolhedoras, seções dedicadas à metodologia e formulário simplificado de agendamento de visita à escola.",
  },
  {
    slug: "sol-music",
    name: "Sol Music",
    niche: "Música, Cultura & Entretenimento",
    url: "https://sol-music-chi.vercel.app/",
    challenge:
      "Criar páginas imersivas com carregamento rápido de conteúdos visuais e sonoros.",
    solution:
      "Interface moderna, responsividade total e fluidez em telas de qualquer tamanho.",
  },
  {
    slug: "musica-e-brasil",
    name: "Música e Brasil",
    niche: "Música, Cultura & Entretenimento",
    url: "https://musica-e-brasil.vercel.app/",
    challenge:
      "Criar páginas imersivas com carregamento rápido de conteúdos visuais e sonoros.",
    solution:
      "Interface moderna, responsividade total e fluidez em telas de qualquer tamanho.",
  },
];

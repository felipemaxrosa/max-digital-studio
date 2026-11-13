/**
 * Cases do portfólio, por nicho comercial (Desafio → Solução).
 * Os screenshots vivem em public/portfolio/<slug>-{desktop,mobile}.png
 * (gerados por `pnpm shots`). Os scores em METRICS são Lighthouse (lab, mobile)
 * medidos localmente — performance é a mediana de 3 execuções; honestos e
 * rotulados com MEASURED_AT.
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
  /** destaque na home (vitrine curada); a /portfolio mostra todos */
  featured?: boolean;
};

export const MEASURED_AT = 'novembro de 2026';

/** Lighthouse CLI (mobile), mediana de 3 execuções. performance 0 = ainda não medido. */
export const METRICS: Record<string, Metrics> = {
  'amanda-beauty': {
    performance: 98,
    accessibility: 96,
    bestPractices: 100,
    seo: 100,
  },
  'maurilio-moreira': {
    performance: 87,
    accessibility: 96,
    bestPractices: 100,
    seo: 100,
  },
  'a-casa-barbearia': {
    performance: 94,
    accessibility: 96,
    bestPractices: 100,
    seo: 100,
  },
  'la-casa-pastel': {
    performance: 94,
    accessibility: 96,
    bestPractices: 100,
    seo: 100,
  },
  'dona-glace': {
    performance: 82,
    accessibility: 95,
    bestPractices: 100,
    seo: 100,
  },
  'escolinha-encantada': {
    performance: 84,
    accessibility: 96,
    bestPractices: 100,
    seo: 100,
  },
  'sol-music': {
    performance: 90,
    accessibility: 95,
    bestPractices: 100,
    seo: 100,
  },
  'musica-e-brasil': {
    performance: 94,
    accessibility: 92,
    bestPractices: 100,
    seo: 100,
  },
};

export const PROJECTS: Project[] = [
  {
    slug: 'amanda-beauty',
    name: 'Amanda Domingues Beauty Studio',
    niche: 'Saúde, Beleza & Estética',
    url: 'https://amandadominguesbeauty.pt/',
    challenge:
      'Posicionar procedimentos de estética avançada com elegância para atrair clientes de alto poder aquisitivo.',
    solution:
      'Identidade visual minimalista e suave, destacando serviços, depoimentos e botão de agendamento no WhatsApp em evidência constante.',
    featured: true,
  },
  {
    slug: 'maurilio-moreira',
    name: 'Vereador Maurílio Moreira',
    niche: 'Política & Mandato',
    url: 'https://lp-maurilio-moreira.vercel.app/',
    challenge:
      'Transmitir a seriedade de um mandato e comprovar entregas reais, aproximando o vereador do eleitor sem cair no "site de político" genérico.',
    solution:
      'Landing page institucional com narrativa de valores, um "placar do mandato" que comprova leis e obras entregues e um canal direto com o gabinete via WhatsApp — rápida, responsiva e confiável.',
    featured: true,
  },
  {
    slug: 'a-casa-barbearia',
    name: 'A Casa Barbearia',
    niche: 'Negócios Masculinos & Barbearias',
    url: 'https://a-casa-barbearia.vercel.app/',
    challenge:
      'Destacar a atmosfera rústica e moderna do espaço e facilitar a marcação de horários sem atritos.',
    solution:
      'Design dark mode com tipografia marcante, apresentação clara da equipe e botão de agendamento em dois toques.',
  },
  {
    slug: 'la-casa-pastel',
    name: 'La Casa de Pastel Caraguá',
    niche: 'Gastronomia & Delivery',
    url: 'https://la-casa-de-pastel-caragua.vercel.app/',
    challenge:
      'Apresentar o cardápio completo de forma rápida no 4G móvel e direcionar pedidos sem taxas de marketplace.',
    solution:
      'Layout visual com fotos dos pratos, categorização ágil e encaminhamento do pedido formatado direto para o WhatsApp do restaurante.',
  },
  {
    slug: 'escolinha-encantada',
    name: 'Escolinha Encantada',
    niche: 'Educação Infantil',
    url: 'https://escolinha-encantada.vercel.app/',
    challenge:
      'Transmitir segurança, afeto e estrutura pedagógica para pais em busca de matrículas.',
    solution:
      'Cores acolhedoras, seções dedicadas à metodologia e formulário simplificado de agendamento de visita à escola.',
  },
  {
    slug: 'sol-music',
    name: 'Sol Music',
    niche: 'Música, Cultura & Entretenimento',
    url: 'https://sol-music-chi.vercel.app/',
    challenge:
      'Criar páginas imersivas com carregamento rápido de conteúdos visuais e sonoros.',
    solution:
      'Interface moderna, responsividade total e fluidez em telas de qualquer tamanho.',
  },
  {
    slug: 'musica-e-brasil',
    name: 'Música e Brasil',
    niche: 'Música, Cultura & Entretenimento',
    url: 'https://musica-e-brasil.vercel.app/',
    challenge:
      'Criar páginas imersivas com carregamento rápido de conteúdos visuais e sonoros.',
    solution:
      'Interface moderna, responsividade total e fluidez em telas de qualquer tamanho.',
  },
  {
    slug: 'dona-glace',
    name: 'Dona Glacê',
    niche: 'Confeitaria Artesanal',
    url: 'https://lp-dona-glace.vercel.app/',
    challenge:
      'Despertar desejo pelos doces artesanais e transformar a vontade em pedido — transmitindo capricho, confiança e o lado afetivo da marca.',
    solution:
      'Landing page com fotografia apetitosa, doces organizados por ocasião, provas sociais (10 anos, +2.000 clientes) e pedido direto no WhatsApp com a confeiteira.',
    featured: true,
  },
];

/** Destaques da home (vitrine curada). A página /portfolio mostra todos. */
export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featured);

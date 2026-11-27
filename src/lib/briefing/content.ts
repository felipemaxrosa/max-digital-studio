/**
 * Central de Briefings — cópia centralizada (fonte única, pt). Preparado para
 * futura tradução pt-PT: nada de texto solto nos componentes.
 */
import type { Option, Service } from './types';

/** Versão do aviso de privacidade — registrada em cada submissão (§23). */
export const PRIVACY_NOTICE_VERSION = '2026-11-27';

/** Versão do schema de envio (§17) e do storage de rascunho (§15). */
export const SCHEMA_VERSION = 1;
export const DRAFT_VERSION = 1;

// ── Hub /briefing ────────────────────────────────────────────────
export const HUB = {
  eyebrow: 'CENTRAL DE PROJETOS',
  title: 'Grandes projetos começam com uma boa conversa.',
  subtitle:
    'Escolha a solução que melhor se adapta ao seu negócio. Queremos conhecer sua marca, seus objetivos e transformar suas ideias em realidade.',
  howTitle: 'Como funciona?',
  how: [
    {
      n: '01',
      title: 'Conte-nos sobre seu negócio.',
      text: 'Preencha o formulário com as informações do seu projeto.',
    },
    {
      n: '02',
      title: 'Analisamos suas necessidades.',
      text: 'Nossa equipe avaliará as informações para compreender seus objetivos.',
    },
    {
      n: '03',
      title: 'Vamos conversar.',
      text: 'Entraremos em contato para orientar você sobre os próximos passos.',
    },
  ],
  assistTitle: 'Ainda não sabe qual solução escolher?',
  assistText:
    'Estamos disponíveis para ajudar você a identificar o melhor caminho para o seu negócio.',
  assistCta: 'Conversar pelo WhatsApp',
} as const;

/** Cards de serviço do hub. `icon` casa com um ícone lucide-react no componente. */
export const SERVICE_CARDS: ReadonlyArray<{
  service: Service;
  icon: 'MonitorSmartphone' | 'PenTool' | 'Layers' | 'ScanSearch';
  title: string;
  description: string;
  estimate: string;
  note?: string;
  cta: string;
  href: string;
  featured?: boolean;
}> = [
  {
    service: 'landing-page',
    icon: 'MonitorSmartphone',
    title: 'Landing Page Profissional',
    description:
      'Uma presença digital profissional para apresentar seu negócio, destacar seus serviços e facilitar o contato com seus clientes.',
    estimate: '8–12 minutos',
    cta: 'Iniciar briefing',
    href: '/briefing/landing-page',
  },
  {
    service: 'identidade-visual',
    icon: 'PenTool',
    title: 'Identidade Visual Profissional',
    description:
      'Uma identidade autêntica, memorável e consistente, construída para transmitir a personalidade e o valor da sua marca.',
    estimate: '10–15 minutos',
    cta: 'Iniciar briefing',
    href: '/briefing/identidade-visual',
  },
  {
    service: 'projeto-completo',
    icon: 'Layers',
    title: 'Identidade Visual + Landing Page',
    description:
      'Uma solução integrada que conecta a identidade da sua marca a uma presença digital profissional e estratégica.',
    estimate: '15–20 minutos',
    cta: 'Iniciar briefing',
    href: '/briefing/projeto-completo',
    featured: true,
  },
  {
    service: 'diagnostico',
    icon: 'ScanSearch',
    title: 'Diagnóstico de Presença Digital',
    description:
      'Uma avaliação inicial para identificar oportunidades de melhoria na presença digital do seu negócio.',
    estimate: '3–5 minutos',
    note: 'Avaliação inicial gratuita',
    cta: 'Solicitar avaliação',
    href: '/briefing/diagnostico',
  },
];

export type ServiceCardData = (typeof SERVICE_CARDS)[number];

// ── Privacidade / revisão / sucesso ──────────────────────────────
export const PRIVACY = {
  notice:
    'Utilizaremos as informações fornecidas para analisar sua solicitação, compreender as necessidades do seu negócio e entrar em contato sobre o projeto.',
  consentLabel: 'Li e estou ciente da forma como meus dados serão utilizados.',
  marketingLabel:
    'Quero receber conteúdos e novidades da Max Digital Studio (opcional).',
  policyLinkLabel: 'política de privacidade',
  policyHref: '/privacidade',
} as const;

export const REVIEW = {
  nav: 'Revisão',
  title: 'Revise antes de enviar.',
  description:
    'Confira suas respostas. Você pode editar qualquer seção antes de enviar o briefing.',
  editLabel: 'Editar',
  submit: 'Enviar briefing',
  submitDiagnostico: 'Solicitar avaliação gratuita',
} as const;

export const SUCCESS = {
  title: 'Recebemos seu briefing!',
  description:
    'Obrigado por compartilhar as informações do seu projeto. Nossa equipe analisará suas respostas e entrará em contato para conversar sobre os próximos passos.',
  protocolLabel: 'Protocolo da solicitação',
  backToSite: 'Voltar ao site',
  whatsapp: 'Conversar pelo WhatsApp',
  neutralTitle: 'Nada por aqui ainda.',
  neutralText:
    'Esta página confirma o envio de um briefing. Comece um novo pela Central de Projetos.',
  neutralCta: 'Ir para a Central de Projetos',
} as const;

export const DRAFT_COPY = {
  saved: 'Rascunho salvo neste dispositivo',
  resumeTitle: 'Encontramos um rascunho',
  resumeText:
    'Você começou este briefing neste dispositivo. Deseja continuar de onde parou?',
  resume: 'Continuar',
  discard: 'Começar do zero',
  deviceOnly:
    'Seu progresso é salvo apenas neste navegador, sem dados de contato, e expira em 7 dias.',
} as const;

export const SUBMIT_ERROR = {
  title: 'Não conseguimos enviar agora.',
  text: 'Algo deu errado ao enviar seu briefing. Tente novamente ou fale com a gente no WhatsApp — seus dados não foram perdidos.',
  retry: 'Tentar novamente',
  whatsapp: 'Enviar pelo WhatsApp',
} as const;

export const EXIT = {
  title: 'Sair do briefing?',
  text: 'Suas respostas deste dispositivo ficam salvas como rascunho (sem dados de contato). Você pode continuar depois.',
  stay: 'Continuar preenchendo',
  leave: 'Sair mesmo assim',
} as const;

// ── Listas de opções reutilizadas pelos formulários ──────────────
export const PAISES: readonly Option[] = [
  { value: 'BR', label: 'Brasil' },
  { value: 'PT', label: 'Portugal' },
  { value: 'outro', label: 'Outro' },
];

export const MOEDAS: readonly Option[] = [
  { value: 'BRL', label: 'Real (R$)' },
  { value: 'EUR', label: 'Euro (€)' },
  { value: 'outra', label: 'Outra' },
];

export const SIM_NAO: readonly Option[] = [
  { value: 'sim', label: 'Sim' },
  { value: 'nao', label: 'Não' },
  { value: 'nao-sei', label: 'Ainda não sei' },
];

export const URGENCIA: readonly Option[] = [
  { value: 'alta', label: 'Alta — preciso o quanto antes' },
  { value: 'media', label: 'Média — tenho alguma flexibilidade' },
  { value: 'baixa', label: 'Baixa — sem pressa' },
  { value: 'nao-sei', label: 'Ainda não sei' },
];

export const OBJETIVOS_LP: readonly Option[] = [
  { value: 'apresentar-empresa', label: 'Apresentar minha empresa' },
  { value: 'divulgar-servicos', label: 'Divulgar meus serviços' },
  { value: 'orcamentos', label: 'Receber pedidos de orçamento' },
  { value: 'agendamentos', label: 'Receber agendamentos' },
  { value: 'contatos-whatsapp', label: 'Gerar contatos pelo WhatsApp' },
  { value: 'apresentar-produtos', label: 'Apresentar produtos' },
  { value: 'campanha', label: 'Divulgar uma campanha' },
  { value: 'credibilidade', label: 'Melhorar minha credibilidade digital' },
];

export const SECOES: readonly Option[] = [
  { value: 'apresentacao', label: 'Apresentação inicial' },
  { value: 'sobre', label: 'Sobre a empresa' },
  { value: 'servicos', label: 'Serviços' },
  { value: 'produtos', label: 'Produtos' },
  { value: 'portfolio', label: 'Portfólio' },
  { value: 'depoimentos', label: 'Depoimentos' },
  { value: 'galeria', label: 'Galeria de imagens' },
  { value: 'faq', label: 'Perguntas frequentes' },
  { value: 'localizacao', label: 'Localização' },
  { value: 'contato', label: 'Formulário de contato' },
  { value: 'orientacao', label: 'Preciso de orientação' },
];

export const FUNCIONALIDADES: readonly Option[] = [
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'orcamento', label: 'Formulário de orçamento' },
  { value: 'agendamento', label: 'Agendamento externo' },
  { value: 'mapa', label: 'Mapa de localização' },
  { value: 'redes', label: 'Integração com redes sociais' },
  { value: 'analytics', label: 'Integração com analytics' },
  { value: 'idiomas', label: 'Múltiplos idiomas' },
  { value: 'orientacao', label: 'Preciso de orientação' },
];

export const ESTILO_VISUAL: readonly Option[] = [
  { value: 'minimalista', label: 'Minimalista' },
  { value: 'moderno', label: 'Moderno' },
  { value: 'elegante', label: 'Elegante' },
  { value: 'premium', label: 'Premium' },
  { value: 'corporativo', label: 'Corporativo' },
  { value: 'criativo', label: 'Criativo' },
  { value: 'tradicional', label: 'Tradicional' },
  { value: 'tecnologico', label: 'Tecnológico' },
  { value: 'nao-sei', label: 'Ainda não sei' },
];

export const PERSONALIDADE: readonly Option[] = [
  { value: 'elegante', label: 'Elegante' },
  { value: 'sofisticada', label: 'Sofisticada' },
  { value: 'acessivel', label: 'Acessível' },
  { value: 'moderna', label: 'Moderna' },
  { value: 'tradicional', label: 'Tradicional' },
  { value: 'criativa', label: 'Criativa' },
  { value: 'minimalista', label: 'Minimalista' },
  { value: 'tecnologica', label: 'Tecnológica' },
  { value: 'acolhedora', label: 'Acolhedora' },
  { value: 'ousada', label: 'Ousada' },
  { value: 'luxuosa', label: 'Luxuosa' },
  { value: 'natural', label: 'Natural' },
  { value: 'corporativa', label: 'Corporativa' },
];

export const APLICACOES: readonly Option[] = [
  { value: 'instagram', label: 'Instagram' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'website', label: 'Website' },
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'cartoes', label: 'Cartões de visita' },
  { value: 'embalagens', label: 'Embalagens' },
  { value: 'fachada', label: 'Fachada' },
  { value: 'uniformes', label: 'Uniformes' },
  { value: 'impressos', label: 'Materiais impressos' },
  { value: 'documentos', label: 'Documentos comerciais' },
];

export const MARCA_NOVA_ATUALIZAR: readonly Option[] = [
  { value: 'nova', label: 'Criar uma marca nova' },
  { value: 'atualizar', label: 'Atualizar uma marca existente' },
  { value: 'nao-sei', label: 'Ainda não sei' },
];

export const DIFICULDADES_DIAG: readonly Option[] = [
  { value: 'sem-website', label: 'Meu negócio ainda não possui website' },
  { value: 'identidade', label: 'Minha identidade visual precisa ser melhorada' },
  { value: 'divulgar', label: 'Tenho dificuldade para divulgar meus serviços' },
  { value: 'profissionalismo', label: 'Minha presença digital não transmite profissionalismo' },
  { value: 'informacoes', label: 'Meus clientes têm dificuldade para encontrar informações' },
  { value: 'contato', label: 'Quero melhorar meus canais de contato' },
  { value: 'nao-sei', label: 'Ainda não sei o que preciso melhorar' },
];

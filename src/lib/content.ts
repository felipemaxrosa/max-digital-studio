/**
 * Copy da Home (fornecida pelo autor — fonte única, verbatim).
 * Editar aqui não toca no JSX.
 */

export const NAV = [
  { label: "Projetos", href: "/portfolio" },
  { label: "Diferenciais", href: "/#metodo" },
  { label: "Como Funciona", href: "/#processo" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contato", href: "/contato" },
] as const;

export const HERO = {
  eyebrow: "ESTRATÉGIA + DESIGN + ENGENHARIA",
  titleLead: "Sites que conectam ideias a ",
  titleAccent: "resultados reais.",
  subtitle:
    "Desenvolvemos identidades visuais marcantes e landing pages de altíssima performance projetadas para converter visitantes em clientes. Design exclusivo, código sob medida e carregamento instantâneo no celular do seu cliente.",
  ctaPrimary: "Quero uma página de alta conversão",
  ctaSecondary: "Explorar Projetos Recentes",
  proofs: [
    "Score 95+ no Google PageSpeed",
    "0.4s tempo médio de carregamento",
    "100% responsivo em qualquer tela",
  ],
} as const;

export const CONFLICT = {
  eyebrow: "O PROBLEMA DO MERCADO",
  title: "O seu site está gerando clientes ou apenas consumindo o seu dinheiro?",
  lead: "A maioria dos negócios perde vendas diariamente sem perceber. Um link confuso na bio do Instagram ou um site lento construído em plataformas pesadas afastam visitantes antes mesmo da primeira rolagem de tela.",
  cards: [
    {
      title: "A barreira dos 3 segundos",
      text: "Mais de 50% dos visitantes fecham a página se ela demorar mais de 3 segundos para abrir no 4G. Plataformas genéricas cheias de plugins custam leads todos os dias.",
    },
    {
      title: "O atrito visual que desvaloriza seu serviço",
      text: "Se o seu design parece amador ou improvisado, o cliente assume automaticamente que o seu serviço também é. A primeira impressão dita o valor que você pode cobrar.",
    },
    {
      title: "Tráfego sem direção",
      text: "Mandar o cliente para páginas desorganizadas ou links genéricos sem argumentos persuasivos faz o visitante se perder antes de clicar no botão de contato.",
    },
  ],
} as const;

export const METHOD = {
  eyebrow: "COMO TRABALHAMOS",
  title: "A união entre design refinado e engenharia de software de ponta.",
  blocks: [
    {
      title: "Engenharia Frontend Sob Medida",
      text: "Desenvolvido linha por linha com as tecnologias mais modernas da web. Sem templates engessados ou plataformas lentas. Páginas ultraleves que ranqueiam melhor no Google e entregam a melhor experiência no celular.",
      featured: true,
    },
    {
      title: "Identidade Visual & Design System",
      text: "Cores, tipografia, espaçamentos e hierarquia visual projetados para transmitir sofisticação, credibilidade executiva e autoridade imediata.",
    },
    {
      title: "Copywriting de Alta Persuasão",
      text: "Estrutura textual pensada para conduzir a leitura, quebrar objeções e direcionar o visitante diretamente para uma conversa de vendas no WhatsApp.",
    },
    {
      title: "Rastreamento & Analytics Integrados",
      text: "Configuração de Pixel, Google Analytics e eventos de clique para você acompanhar métricas e saber de onde vêm os contatos.",
    },
  ],
} as const;

export const PROCESS = {
  eyebrow: "FLUXO CLARO E TRANSPARENTE",
  title: "Do alinhamento inicial ao site no ar em 4 etapas diretas.",
  steps: [
    {
      n: "01",
      title: "Diagnóstico & Estratégia",
      text: "Mapeamos seu negócio, perfil de cliente e concorrentes para definir o ângulo de venda e a estrutura necessária.",
    },
    {
      n: "02",
      title: "Identidade Visual & Textos de Venda",
      text: "Criamos o guia visual (logo, paleta, tipografia) e redigimos a copy persuasiva da sua página para aprovação prévia.",
    },
    {
      n: "03",
      title: "Desenvolvimento & Performance",
      text: "Construção do código sob medida, garantindo responsividade mobile, otimizações de SEO e velocidade máxima.",
    },
    {
      n: "04",
      title: "Integração & Publicação",
      text: "Configuração do seu domínio oficial, testes de envio para o WhatsApp, validação das tags de rastreamento e entrega final.",
    },
  ],
} as const;

export const FOUNDER = {
  eyebrow: "QUEM CONSTRÓI SEU PROJETO",
  title: "Seu projeto desenhado e programado por quem domina a técnica.",
  paragraphs: [
    "Muito além de templates prontos ou ferramentas automáticas, o Max Digital Studio nasceu com a premissa de entregar projetos digitais executados com precisão.",
    "À frente do estúdio está Felipe, com mais de 6 anos de experiência sólida em Desenvolvimento Frontend para empresas de tecnologia. Essa bagagem técnica assegura que sua página não terá telas quebradas, botões com falha ou lentidão crônica. Cada linha de código e elemento visual são tratados como ativos estratégicos para a sua empresa.",
  ],
} as const;

export const FAQ = [
  {
    q: "Quanto tempo leva para o projeto ser entregue?",
    a: "O prazo médio para entrega de uma Landing Page com Identidade Visual é de 7 a 15 dias úteis, com etapas de validação intermediárias com você.",
  },
  {
    q: "Preciso pagar mensalidades de plataformas?",
    a: "Não. Ao desenvolver em código limpo sob medida, você não fica refém de mensalidades caras de ferramentas como Wix, Shopify ou Elementor Pro. Você mantém apenas os custos naturais e anuais do seu próprio domínio e infraestrutura.",
  },
  {
    q: "Eu não tenho logotipo nem textos, vocês criam tudo?",
    a: "Sim. Nosso pacote principal inclui tanto a criação da Identidade Visual mínima (logo, paleta de cores e tipografia) quanto a redação de vendas completa (copywriting).",
  },
  {
    q: "Já tenho um site antigo ou link de bio, é possível aproveitar o domínio?",
    a: "Sim. Fazemos toda a migração e redirecionamento do seu domínio atual para o novo site, mantendo o tráfego e garantindo que o seu público encontre a versão atualizada.",
  },
] as const;

export const FINAL_CTA = {
  title: "Pronto para transformar a presença digital do seu negócio?",
  text: "Agende uma conversa rápida e receba um diagnóstico da sua presença digital atual sem compromisso.",
  cta: "Solicitar Proposta pelo WhatsApp",
  microcopy:
    "Atendimento direto com o especialista • Resposta em até 2 horas em horário comercial",
} as const;

export const ABOUT = {
  eyebrow: "SOBRE O ESTÚDIO",
  title: "Engenharia e design a serviço do seu resultado.",
  intro:
    "A Max Digital Studio é um estúdio digital que transforma negócios em marcas fortes e páginas que realmente vendem. Trabalho remoto para o Brasil e Portugal, com padrão de engenharia de produto — não de template.",
  positioning: {
    eyebrow: "PARA QUEM É",
    title: "Feito para quem leva o próprio negócio a sério.",
    items: [
      {
        title: "Negócios novos",
        text: "Quem está começando e quer nascer com cara de profissional desde o primeiro clique.",
      },
      {
        title: "Prestadores de serviço",
        text: "Quem vive de indicação e precisa de uma presença digital que feche no WhatsApp.",
      },
      {
        title: "Marcas que querem escalar",
        text: "Quem já tem identidade, mas precisa de uma página rápida e persuasiva que converta de verdade.",
      },
    ],
  },
} as const;

export const FOOTER = {
  tagline: "Identidade Visual & Landing Pages",
  location: "Brasil e Portugal",
  signature:
    "© 2026 Max Digital Studio. Todos os direitos reservados. Código proprietário.",
} as const;

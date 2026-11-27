/**
 * Configuração declarativa dos formulários de briefing.
 * UMA fonte dirige: renderização (BriefingForm), validação por etapa
 * (validation.ts) e o schema Zod do servidor (schemas.ts). Campos reaproveitados
 * entre serviços são definidos uma única vez aqui.
 */
import type { Answers, FieldConfig, ServiceConfig, StepConfig } from './types';
import {
  APLICACOES,
  DIFICULDADES_DIAG,
  ESTILO_VISUAL,
  FUNCIONALIDADES,
  MARCA_NOVA_ATUALIZAR,
  MOEDAS,
  OBJETIVOS_LP,
  PAISES,
  PERSONALIDADE,
  SECOES,
  SIM_NAO,
  URGENCIA,
} from './content';

const SIM_NAO_BINARIO = SIM_NAO.filter((o) => o.value !== 'nao-sei');

// ── Blocos de campos reutilizáveis ───────────────────────────────

/** Contato comum dos formulários longos (LP, identidade, completo). */
const contactFull: FieldConfig[] = [
  { name: 'responsavel', label: 'Nome do responsável', type: 'text', group: 'contact', required: true, placeholder: 'Seu nome', maxLength: 120 },
  { name: 'empresa', label: 'Nome da empresa ou marca', type: 'text', group: 'contact', required: true, placeholder: 'Nome do negócio', maxLength: 160 },
  { name: 'email', label: 'E-mail', type: 'email', group: 'contact', required: true, placeholder: 'contato@empresa.com', maxLength: 160 },
  { name: 'whatsapp', label: 'Telefone / WhatsApp', type: 'phone', group: 'contact', required: true, maxLength: 40 },
  { name: 'pais', label: 'País', type: 'country', group: 'contact', required: true, options: PAISES },
  { name: 'cidade', label: 'Cidade / região', type: 'text', group: 'contact', placeholder: 'Opcional', maxLength: 120 },
  { name: 'segmento', label: 'Segmento de atuação', type: 'text', group: 'contact', required: true, placeholder: 'Ex.: estética, advocacia, restaurante…', maxLength: 160 },
  { name: 'descricaoNegocio', label: 'Descrição do negócio', type: 'textarea', group: 'business', required: true, placeholder: 'Conte em poucas linhas o que o seu negócio faz.', maxLength: 2000 },
  { name: 'instagram', label: 'Instagram', type: 'text', group: 'contact', placeholder: '@seuperfil', maxLength: 160 },
  { name: 'website', label: 'Website atual', type: 'url', group: 'contact', placeholder: 'https://', maxLength: 300 },
  { name: 'outrasRedes', label: 'Outras redes sociais', type: 'text', group: 'contact', placeholder: 'Opcional', maxLength: 300 },
];

/** Prazo e investimento — compartilhado por LP, identidade e completo (§10.6). */
const budgetStep: StepConfig = {
  id: 'investimento',
  nav: 'Investimento',
  title: 'Prazo e investimento.',
  description:
    'Essas informações nos ajudam a desenhar a melhor proposta. Sem compromisso — pode deixar em aberto.',
  fields: [
    { name: 'dataPublicacao', label: 'Existe uma data desejada para publicação / entrega?', type: 'text', group: 'budget', placeholder: 'Opcional — ex.: até o fim do mês', maxLength: 120 },
    { name: 'urgencia', label: 'Qual a urgência do projeto?', type: 'radio', group: 'budget', options: URGENCIA },
    { name: 'moeda', label: 'Moeda de referência', type: 'select', group: 'budget', options: MOEDAS },
    { name: 'investimentoValor', label: 'Estimativa de investimento', type: 'text', group: 'budget', placeholder: 'Opcional — valor ou faixa que tem em mente', maxLength: 120 },
    { name: 'investimentoObs', label: 'Sobre o investimento', type: 'checkbox-group', group: 'budget', options: [
      { value: 'nao-defini', label: 'Ainda não defini meu investimento' },
      { value: 'orientacao', label: 'Gostaria de receber orientação' },
    ] },
    { name: 'infoAdicional', label: 'Informações adicionais', type: 'textarea', group: 'budget', placeholder: 'Algo mais que devemos saber?', maxLength: 2000 },
  ],
};

const reviewPlaceholder = (): StepConfig => ({
  id: 'revisao',
  nav: 'Revisão',
  title: 'Revisão e envio.',
  fields: [],
});

// ── Landing Page Profissional (§10) ──────────────────────────────
const landingPage: ServiceConfig = {
  service: 'landing-page',
  label: 'Landing Page Profissional',
  title: 'Vamos construir sua presença digital.',
  description:
    'Conte-nos sobre seu negócio para desenvolvermos uma página alinhada aos seus objetivos e à experiência dos seus clientes.',
  estimate: '8–12 minutos',
  steps: [
    { id: 'negocio', nav: 'Seu negócio', title: 'Vamos conhecer seu negócio.', description: 'Precisamos de algumas informações para compreender seu projeto.', fields: contactFull },
    {
      id: 'objetivos', nav: 'Objetivos', title: 'Objetivos do projeto.', description: 'O que você espera que sua landing page faça pelo negócio.',
      fields: [
        { name: 'objetivos', label: 'Qual é o principal objetivo da sua landing page?', type: 'checkbox-group', group: 'project', required: true, allowOther: true, options: OBJETIVOS_LP, help: 'Pode escolher mais de uma.' },
        { name: 'acaoEsperada', label: 'Principal ação esperada do visitante', type: 'text', group: 'project', placeholder: 'Ex.: chamar no WhatsApp', maxLength: 200 },
        { name: 'problema', label: 'Problema que deseja resolver', type: 'textarea', group: 'project', maxLength: 1200 },
        { name: 'diferenciais', label: 'Diferenciais do negócio', type: 'textarea', group: 'project', maxLength: 1200 },
        { name: 'possuiPagina', label: 'Possui uma página atualmente?', type: 'radio', group: 'project', options: SIM_NAO_BINARIO },
        { name: 'melhoriasPaginaAtual', label: 'O que gostaria de melhorar na página atual?', type: 'textarea', group: 'project', maxLength: 1200, visibleIf: (a: Answers) => a.possuiPagina === 'sim' },
      ],
    },
    {
      id: 'publico', nav: 'Público-alvo', title: 'Público-alvo.', description: 'Quem você quer alcançar com a página.',
      fields: [
        { name: 'clientes', label: 'Quem são seus principais clientes?', type: 'textarea', group: 'project', maxLength: 1200 },
        { name: 'regiao', label: 'Qual região geográfica deseja alcançar?', type: 'text', group: 'project', maxLength: 200 },
        { name: 'necessidades', label: 'Quais necessidades seus clientes possuem?', type: 'textarea', group: 'project', maxLength: 1200 },
        { name: 'valorizam', label: 'O que seus clientes mais valorizam?', type: 'textarea', group: 'project', maxLength: 1200 },
        { name: 'concorrentes', label: 'Quem são seus principais concorrentes?', type: 'textarea', group: 'project', maxLength: 1200 },
        { name: 'concorrentesLinks', label: 'Links de concorrentes', type: 'textarea', group: 'references', placeholder: 'Opcional — um por linha', maxLength: 1200 },
      ],
    },
    {
      id: 'conteudo', nav: 'Funcionalidades', title: 'Conteúdo e funcionalidades.', description: 'O que a página precisa ter. Marque tudo que fizer sentido.',
      fields: [
        { name: 'secoes', label: 'Quais seções deseja incluir?', type: 'checkbox-group', group: 'project', allowOther: true, options: SECOES },
        { name: 'funcionalidades', label: 'Quais funcionalidades deseja?', type: 'checkbox-group', group: 'project', allowOther: true, options: FUNCIONALIDADES },
        { name: 'possuiTextos', label: 'Possui textos preparados?', type: 'radio', group: 'project', options: SIM_NAO },
        { name: 'possuiFotos', label: 'Possui fotos profissionais?', type: 'radio', group: 'project', options: SIM_NAO },
        { name: 'possuiDepoimentos', label: 'Possui depoimentos de clientes autorizados para publicação?', type: 'radio', group: 'project', options: SIM_NAO },
        { name: 'possuiDominio', label: 'Possui domínio próprio?', type: 'radio', group: 'project', options: SIM_NAO },
        { name: 'possuiHospedagem', label: 'Possui hospedagem?', type: 'radio', group: 'project', options: SIM_NAO },
        { name: 'precisaOrientacaoDominio', label: 'Necessita de orientação para domínio e hospedagem?', type: 'radio', group: 'project', options: SIM_NAO },
      ],
    },
    {
      id: 'referencias', nav: 'Referências', title: 'Identidade visual e referências.', description: 'Como a página deve se parecer.',
      fields: [
        { name: 'possuiIdentidade', label: 'Possui identidade visual?', type: 'radio', group: 'references', options: SIM_NAO },
        { name: 'possuiLogo', label: 'Possui logotipo?', type: 'radio', group: 'references', options: SIM_NAO },
        { name: 'coresAtuais', label: 'Cores utilizadas atualmente', type: 'text', group: 'references', maxLength: 200 },
        { name: 'coresEvitar', label: 'Existe alguma cor que deseja evitar?', type: 'text', group: 'references', maxLength: 200 },
        { name: 'estilo', label: 'Estilo visual desejado', type: 'checkbox-group', group: 'references', options: ESTILO_VISUAL, help: 'Pode escolher mais de um.' },
        { name: 'referenciasSites', label: 'Sites que utiliza como referência', type: 'textarea', group: 'references', placeholder: 'Opcional — um por linha', maxLength: 1200 },
        { name: 'referenciasGosto', label: 'O que gosta nessas referências?', type: 'textarea', group: 'references', maxLength: 1200 },
        { name: 'referenciasLinks', label: 'Links de materiais de referência', type: 'textarea', group: 'references', placeholder: 'Opcional — Drive, Pinterest, etc. Arquivos podem ser pedidos depois.', maxLength: 1200 },
      ],
    },
    budgetStep,
    reviewPlaceholder(),
  ],
};

// ── Identidade Visual (§11) ──────────────────────────────────────
const identidadeVisual: ServiceConfig = {
  service: 'identidade-visual',
  label: 'Identidade Visual Profissional',
  title: 'Vamos construir uma marca com personalidade.',
  description:
    'Queremos conhecer a essência do seu negócio para desenvolver uma identidade visual que represente seus valores e fortaleça sua comunicação.',
  estimate: '10–15 minutos',
  steps: [
    { id: 'negocio', nav: 'Seu negócio', title: 'Vamos conhecer seu negócio.', description: 'Precisamos de algumas informações para compreender seu projeto.', fields: contactFull },
    {
      id: 'essencia', nav: 'Essência', title: 'Essência da marca.', description: 'O que está por trás do seu negócio.',
      fields: [
        { name: 'origemNegocio', label: 'Como surgiu o negócio?', type: 'textarea', group: 'business', maxLength: 1500 },
        { name: 'proposito', label: 'Qual é o propósito da marca?', type: 'textarea', group: 'business', maxLength: 1500 },
        { name: 'oferece', label: 'O que a empresa oferece?', type: 'textarea', group: 'business', maxLength: 1500 },
        { name: 'valores', label: 'Quais são seus principais valores?', type: 'textarea', group: 'business', maxLength: 1200 },
        { name: 'diferenciais', label: 'O que diferencia a marca dos concorrentes?', type: 'textarea', group: 'business', maxLength: 1200 },
        { name: 'percepcao', label: 'Qual percepção deseja transmitir?', type: 'textarea', group: 'business', maxLength: 1200 },
        { name: 'slogan', label: 'Possui slogan?', type: 'text', group: 'business', maxLength: 200 },
        { name: 'significadoNome', label: 'História ou significado do nome', type: 'textarea', group: 'business', maxLength: 1200 },
      ],
    },
    {
      id: 'posicionamento', nav: 'Posicionamento', title: 'Público e posicionamento.',
      fields: [
        { name: 'publicoAlvo', label: 'Quem é o público-alvo?', type: 'textarea', group: 'project', maxLength: 1200 },
        { name: 'necessidades', label: 'Quais necessidades a marca atende?', type: 'textarea', group: 'project', maxLength: 1200 },
        { name: 'reconhecida', label: 'Como deseja ser reconhecida?', type: 'textarea', group: 'project', maxLength: 1200 },
        { name: 'descricaoClientes', label: 'Como gostaria que os clientes descrevessem a marca?', type: 'textarea', group: 'project', maxLength: 1200 },
        { name: 'concorrentes', label: 'Principais concorrentes', type: 'textarea', group: 'project', maxLength: 1200 },
        { name: 'referenciasMercado', label: 'Referências de mercado', type: 'textarea', group: 'references', maxLength: 1200 },
        { name: 'posicionamento', label: 'Qual posicionamento deseja construir?', type: 'textarea', group: 'project', maxLength: 1200 },
      ],
    },
    {
      id: 'personalidade', nav: 'Personalidade', title: 'Personalidade visual.', description: 'As características que a marca deve transmitir.',
      fields: [
        { name: 'personalidade', label: 'Selecione as características da marca', type: 'checkbox-group', group: 'references', options: PERSONALIDADE, help: 'Escolha as que mais combinam.' },
        { name: 'coresPreferidas', label: 'Cores preferidas', type: 'text', group: 'references', maxLength: 200 },
        { name: 'coresEvitar', label: 'Cores que deseja evitar', type: 'text', group: 'references', maxLength: 200 },
        { name: 'simbolos', label: 'Símbolos ou elementos desejados', type: 'textarea', group: 'references', maxLength: 800 },
        { name: 'elementosEvitar', label: 'Elementos que deseja evitar', type: 'textarea', group: 'references', maxLength: 800 },
        { name: 'tipografia', label: 'Preferências de tipografia', type: 'text', group: 'references', maxLength: 200 },
        { name: 'possuiIdentidade', label: 'Possui identidade visual atualmente?', type: 'radio', group: 'references', options: SIM_NAO_BINARIO },
        { name: 'marcaNovaAtualizar', label: 'Deseja criar uma nova marca ou atualizar uma existente?', type: 'radio', group: 'references', options: MARCA_NOVA_ATUALIZAR },
      ],
    },
    {
      id: 'aplicacoes', nav: 'Aplicações', title: 'Aplicações da marca.', description: 'Onde a identidade visual será usada. Tratamos isso como necessidades do seu negócio.',
      fields: [
        { name: 'aplicacoes', label: 'Em quais canais a identidade será utilizada?', type: 'checkbox-group', group: 'project', allowOther: true, options: APLICACOES },
        { name: 'referenciasVisuais', label: 'Referências visuais', type: 'textarea', group: 'references', placeholder: 'Opcional — um link por linha', maxLength: 1200 },
        { name: 'materiaisExistentes', label: 'Materiais existentes', type: 'textarea', group: 'references', maxLength: 1200 },
        { name: 'referenciasLinks', label: 'Links de materiais', type: 'textarea', group: 'references', placeholder: 'Opcional — Drive, Pinterest, etc. Arquivos podem ser pedidos depois.', maxLength: 1200 },
      ],
    },
    budgetStep,
    reviewPlaceholder(),
  ],
};

// ── Projeto Completo (§12) — reaproveita, sem duplicar ────────────
const projetoCompleto: ServiceConfig = {
  service: 'projeto-completo',
  label: 'Identidade Visual + Landing Page',
  title: 'Da essência da marca à sua presença digital.',
  description:
    'Vamos conhecer seu negócio para construir uma identidade visual e uma experiência digital conectadas aos mesmos objetivos.',
  estimate: '15–20 minutos',
  steps: [
    { id: 'negocio', nav: 'Seu negócio', title: 'Vamos conhecer seu negócio.', description: 'Informações de contato e do negócio — pediremos uma única vez.', fields: contactFull },
    {
      id: 'marca', nav: 'Marca', title: 'Essência e posicionamento da marca.',
      fields: [
        { name: 'proposito', label: 'Qual é o propósito da marca?', type: 'textarea', group: 'business', maxLength: 1500 },
        { name: 'valores', label: 'Quais são seus principais valores?', type: 'textarea', group: 'business', maxLength: 1200 },
        { name: 'diferenciais', label: 'O que diferencia a marca dos concorrentes?', type: 'textarea', group: 'business', maxLength: 1200 },
        { name: 'percepcao', label: 'Qual percepção deseja transmitir?', type: 'textarea', group: 'business', maxLength: 1200 },
        { name: 'slogan', label: 'Possui slogan?', type: 'text', group: 'business', maxLength: 200 },
        { name: 'posicionamento', label: 'Qual posicionamento deseja construir?', type: 'textarea', group: 'project', maxLength: 1200 },
      ],
    },
    {
      id: 'publico', nav: 'Público', title: 'Público-alvo e objetivos.',
      fields: [
        { name: 'publicoAlvo', label: 'Quem são seus principais clientes?', type: 'textarea', group: 'project', maxLength: 1200 },
        { name: 'regiao', label: 'Qual região geográfica deseja alcançar?', type: 'text', group: 'project', maxLength: 200 },
        { name: 'necessidades', label: 'Quais necessidades seus clientes possuem?', type: 'textarea', group: 'project', maxLength: 1200 },
        { name: 'concorrentes', label: 'Quem são seus principais concorrentes?', type: 'textarea', group: 'project', maxLength: 1200 },
      ],
    },
    {
      id: 'personalidade', nav: 'Identidade', title: 'Identidade e personalidade visual.',
      fields: [
        { name: 'personalidade', label: 'Selecione as características da marca', type: 'checkbox-group', group: 'references', options: PERSONALIDADE, help: 'Escolha as que mais combinam.' },
        { name: 'coresPreferidas', label: 'Cores preferidas', type: 'text', group: 'references', maxLength: 200 },
        { name: 'coresEvitar', label: 'Cores que deseja evitar', type: 'text', group: 'references', maxLength: 200 },
        { name: 'tipografia', label: 'Preferências de tipografia', type: 'text', group: 'references', maxLength: 200 },
        { name: 'possuiIdentidade', label: 'Possui identidade visual atualmente?', type: 'radio', group: 'references', options: SIM_NAO_BINARIO },
        { name: 'marcaNovaAtualizar', label: 'Deseja criar uma nova marca ou atualizar uma existente?', type: 'radio', group: 'references', options: MARCA_NOVA_ATUALIZAR },
      ],
    },
    {
      id: 'objetivos', nav: 'Objetivos', title: 'Objetivos da landing page.',
      fields: [
        { name: 'objetivos', label: 'Qual é o principal objetivo da sua landing page?', type: 'checkbox-group', group: 'project', required: true, allowOther: true, options: OBJETIVOS_LP, help: 'Pode escolher mais de uma.' },
        { name: 'acaoEsperada', label: 'Principal ação esperada do visitante', type: 'text', group: 'project', maxLength: 200 },
        { name: 'possuiPagina', label: 'Possui uma página atualmente?', type: 'radio', group: 'project', options: SIM_NAO_BINARIO },
        { name: 'melhoriasPaginaAtual', label: 'O que gostaria de melhorar na página atual?', type: 'textarea', group: 'project', maxLength: 1200, visibleIf: (a: Answers) => a.possuiPagina === 'sim' },
      ],
    },
    {
      id: 'conteudo', nav: 'Funcionalidades', title: 'Conteúdo e funcionalidades.',
      fields: [
        { name: 'secoes', label: 'Quais seções deseja incluir?', type: 'checkbox-group', group: 'project', allowOther: true, options: SECOES },
        { name: 'funcionalidades', label: 'Quais funcionalidades deseja?', type: 'checkbox-group', group: 'project', allowOther: true, options: FUNCIONALIDADES },
        { name: 'possuiTextos', label: 'Possui textos preparados?', type: 'radio', group: 'project', options: SIM_NAO },
        { name: 'possuiFotos', label: 'Possui fotos profissionais?', type: 'radio', group: 'project', options: SIM_NAO },
        { name: 'possuiDominio', label: 'Possui domínio próprio?', type: 'radio', group: 'project', options: SIM_NAO },
        { name: 'possuiHospedagem', label: 'Possui hospedagem?', type: 'radio', group: 'project', options: SIM_NAO },
      ],
    },
    {
      id: 'referencias', nav: 'Referências', title: 'Referências e materiais.',
      fields: [
        { name: 'referenciasSites', label: 'Sites e marcas de referência', type: 'textarea', group: 'references', placeholder: 'Opcional — um por linha', maxLength: 1200 },
        { name: 'referenciasGosto', label: 'O que gosta nessas referências?', type: 'textarea', group: 'references', maxLength: 1200 },
        { name: 'aplicacoes', label: 'Em quais canais a identidade será utilizada?', type: 'checkbox-group', group: 'project', allowOther: true, options: APLICACOES },
        { name: 'referenciasLinks', label: 'Links de materiais', type: 'textarea', group: 'references', placeholder: 'Opcional — Drive, Pinterest, etc. Arquivos podem ser pedidos depois.', maxLength: 1200 },
      ],
    },
    budgetStep,
    reviewPlaceholder(),
  ],
};

// ── Diagnóstico de Presença Digital (§13) — curto ────────────────
const diagnostico: ServiceConfig = {
  service: 'diagnostico',
  label: 'Diagnóstico de Presença Digital',
  title: 'Descubra novas oportunidades para o seu negócio.',
  description:
    'Solicite uma avaliação inicial gratuita da sua presença digital e identifique oportunidades de melhorar a forma como sua marca se apresenta na internet.',
  estimate: '3–5 minutos',
  steps: [
    {
      id: 'negocio', nav: 'Seu negócio', title: 'Seu negócio.', description: 'Só o essencial para falarmos com você.',
      fields: [
        { name: 'responsavel', label: 'Nome do responsável', type: 'text', group: 'contact', required: true, placeholder: 'Seu nome', maxLength: 120 },
        { name: 'empresa', label: 'Nome do negócio', type: 'text', group: 'contact', required: true, placeholder: 'Nome da empresa', maxLength: 160 },
        { name: 'email', label: 'E-mail', type: 'email', group: 'contact', required: true, placeholder: 'contato@empresa.com', maxLength: 160 },
        { name: 'whatsapp', label: 'WhatsApp', type: 'phone', group: 'contact', required: true, maxLength: 40 },
        { name: 'pais', label: 'País', type: 'country', group: 'contact', required: true, options: PAISES },
        { name: 'segmento', label: 'Segmento', type: 'text', group: 'contact', required: true, placeholder: 'Ex.: estética, advocacia…', maxLength: 160 },
      ],
    },
    {
      id: 'presenca', nav: 'Presença digital', title: 'Presença digital atual.', description: 'Onde sua marca está hoje. Preencha só o que tiver.',
      fields: [
        { name: 'instagram', label: 'Instagram', type: 'text', group: 'references', placeholder: '@seuperfil', maxLength: 200 },
        { name: 'facebook', label: 'Facebook', type: 'text', group: 'references', maxLength: 200 },
        { name: 'website', label: 'Website', type: 'url', group: 'references', placeholder: 'https://', maxLength: 300 },
        { name: 'google', label: 'Perfil da empresa no Google', type: 'text', group: 'references', maxLength: 200 },
        { name: 'outrasRedes', label: 'Outras redes sociais', type: 'text', group: 'references', maxLength: 300 },
        { name: 'dificuldade', label: 'Qual é sua principal dificuldade atualmente?', type: 'radio', group: 'project', required: true, allowOther: true, options: DIFICULDADES_DIAG },
        { name: 'melhoria', label: 'O que gostaria de melhorar na presença digital do seu negócio?', type: 'textarea', group: 'project', maxLength: 1500 },
      ],
    },
    reviewPlaceholder(),
  ],
};

export const SERVICE_CONFIGS: Record<string, ServiceConfig> = {
  'landing-page': landingPage,
  'identidade-visual': identidadeVisual,
  'projeto-completo': projetoCompleto,
  diagnostico,
};

export function getServiceConfig(service: string): ServiceConfig | undefined {
  return SERVICE_CONFIGS[service];
}

/** Todos os campos de um serviço (achatado), para schema/normalização/resumo. */
export function allFields(config: ServiceConfig): FieldConfig[] {
  return config.steps.flatMap((s) => s.fields);
}

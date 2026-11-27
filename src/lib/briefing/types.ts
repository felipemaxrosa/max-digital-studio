/**
 * Central de Briefings — tipos compartilhados.
 * A configuração declarativa (steps.ts) dirige renderização, validação por
 * etapa e revisão. Tipos de dados vêm inferidos dos schemas Zod (schemas.ts).
 */

export const SERVICES = [
  'landing-page',
  'identidade-visual',
  'projeto-completo',
  'diagnostico',
] as const;

export type Service = (typeof SERVICES)[number];

export function isService(v: unknown): v is Service {
  return typeof v === 'string' && (SERVICES as readonly string[]).includes(v);
}

/** Grupos lógicos — usados para agrupar o resumo no e-mail, storage e revisão. */
export type FieldGroup =
  | 'contact'
  | 'business'
  | 'project'
  | 'references'
  | 'budget'
  | 'privacy';

export type FieldType =
  | 'text'
  | 'email'
  | 'phone'
  | 'url'
  | 'textarea'
  | 'select'
  | 'country'
  | 'radio'
  | 'checkbox-group';

export type AnswerValue = string | string[] | boolean | undefined;

/** Estado plano do formulário: cada campo é indexado pelo seu `name`. */
export type Answers = Record<string, AnswerValue>;

export type Option = { value: string; label: string };

export interface FieldConfig {
  /** Chave única em `answers` e no schema do serviço. */
  name: string;
  label: string;
  type: FieldType;
  group: FieldGroup;
  required?: boolean;
  placeholder?: string;
  /** Texto de apoio curto abaixo do label. */
  help?: string;
  /** Para select/radio/checkbox-group. */
  options?: readonly Option[];
  /** Adiciona opção "Outro" + campo de texto livre associado (`<name>Outro`). */
  allowOther?: boolean;
  /** Pergunta condicional: só aparece (e só é exigida) quando retorna true. */
  visibleIf?: (a: Answers) => boolean;
  /** Teto de caracteres (textarea/text). Espelha os limites do servidor. */
  maxLength?: number;
}

export interface StepConfig {
  /** Slug estável da etapa (analytics `step_name`, âncora de edição na revisão). */
  id: string;
  /** Rótulo curto exibido no stepper lateral. */
  nav: string;
  title: string;
  description?: string;
  fields: FieldConfig[];
}

export interface ServiceConfig {
  service: Service;
  /** Rótulo humano ("Landing Page Profissional"). */
  label: string;
  title: string;
  description: string;
  /** Tempo estimado de preenchimento, ex.: "8–12 minutos". */
  estimate: string;
  steps: StepConfig[];
}

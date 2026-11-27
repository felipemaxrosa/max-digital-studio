/**
 * Validação por etapa dirigida pela configuração (steps.ts). Usada pelo motor
 * do formulário no cliente. O servidor valida de novo com Zod (schemas.ts).
 */
import type { Answers, AnswerValue, FieldConfig, ServiceConfig, StepConfig } from './types';

export type FieldErrors = Record<string, string>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const digits = (v: string) => v.replace(/\D/g, '');

export function isFieldVisible(field: FieldConfig, answers: Answers): boolean {
  return field.visibleIf ? field.visibleIf(answers) : true;
}

export function visibleFields(step: StepConfig, answers: Answers): FieldConfig[] {
  return step.fields.filter((f) => isFieldVisible(f, answers));
}

function isEmpty(v: AnswerValue): boolean {
  if (Array.isArray(v)) return v.length === 0;
  if (typeof v === 'string') return v.trim() === '';
  return v === undefined || v === false;
}

export function validateField(field: FieldConfig, answers: Answers): string | undefined {
  if (!isFieldVisible(field, answers)) return undefined;
  const value = answers[field.name];

  if (field.required && isEmpty(value)) {
    return field.type === 'checkbox-group' || field.type === 'radio'
      ? 'Selecione ao menos uma opção.'
      : 'Campo obrigatório.';
  }
  if (isEmpty(value)) return undefined; // opcional e vazio → tudo certo

  if (field.type === 'email' && typeof value === 'string' && !EMAIL_RE.test(value.trim())) {
    return 'Confere o e-mail — parece inválido.';
  }
  if (field.type === 'phone' && typeof value === 'string' && digits(value).length < 8) {
    return 'Confere o telefone — parece inválido.';
  }
  if (field.maxLength && typeof value === 'string' && value.length > field.maxLength) {
    return `Máximo de ${field.maxLength} caracteres.`;
  }
  return undefined;
}

/** Erros de uma etapa (apenas campos visíveis). */
export function validateStep(step: StepConfig, answers: Answers): FieldErrors {
  const errors: FieldErrors = {};
  for (const f of step.fields) {
    const err = validateField(f, answers);
    if (err) errors[f.name] = err;
  }
  return errors;
}

/** Índice da primeira etapa de dados inválida, ou -1 se todas válidas. */
export function firstInvalidStepIndex(config: ServiceConfig, answers: Answers): number {
  const dataSteps = config.steps.slice(0, -1); // última é a revisão (sem campos)
  for (let i = 0; i < dataSteps.length; i++) {
    if (Object.keys(validateStep(dataSteps[i], answers)).length > 0) return i;
  }
  return -1;
}

export function isBriefingComplete(config: ServiceConfig, answers: Answers): boolean {
  return firstInvalidStepIndex(config, answers) === -1;
}

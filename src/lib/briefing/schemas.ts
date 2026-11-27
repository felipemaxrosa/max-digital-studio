/**
 * Validação server-side (Zod 4). O schema de respostas de cada serviço é
 * DERIVADO da configuração (steps.ts), então todo campo renderizado é aceito e
 * nada fora dele é persistido (chaves desconhecidas são descartadas). Tipos de
 * dados são inferidos daqui — não duplicamos interfaces manualmente.
 */
import { z } from 'zod';
import { SERVICES, type Service } from './types';
import type { FieldConfig } from './types';
import { allFields, getServiceConfig } from './steps';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const digitsOk = (v: string) => v.replace(/\D/g, '').length >= 8;

function fieldToZod(field: FieldConfig): z.ZodTypeAny {
  // Só exigimos no servidor campos SEMPRE visíveis (sem condicional).
  const required = !!field.required && !field.visibleIf;

  if (field.type === 'checkbox-group') {
    const arr = z.array(z.string().trim().min(1).max(200)).max(60);
    return required ? arr.min(1) : arr.optional();
  }

  if (field.type === 'email') {
    const base = z.string().trim().max(field.maxLength ?? 200);
    return required
      ? base.min(1).refine((v) => EMAIL_RE.test(v), 'E-mail inválido.')
      : base.refine((v) => v === '' || EMAIL_RE.test(v), 'E-mail inválido.').optional();
  }

  if (field.type === 'phone') {
    const base = z.string().trim().max(field.maxLength ?? 40);
    return required
      ? base.min(1).refine(digitsOk, 'Telefone inválido.')
      : base.refine((v) => v === '' || digitsOk(v), 'Telefone inválido.').optional();
  }

  const max = field.maxLength ?? (field.type === 'textarea' ? 2000 : 300);
  const base = z.string().trim().max(max);
  return required ? base.min(1) : base.optional();
}

function buildAnswersSchema(service: Service): z.ZodObject {
  const config = getServiceConfig(service);
  if (!config) throw new Error(`Unknown briefing service: ${service}`);
  const shape: Record<string, z.ZodTypeAny> = {};
  for (const f of allFields(config)) {
    shape[f.name] = fieldToZod(f);
    if (f.allowOther) shape[`${f.name}Outro`] = z.string().trim().max(300).optional();
  }
  return z.object(shape); // chaves desconhecidas são removidas (segurança §24)
}

export const ANSWERS_SCHEMAS: Record<Service, z.ZodObject> = Object.fromEntries(
  SERVICES.map((s) => [s, buildAnswersSchema(s)]),
) as Record<Service, z.ZodObject>;

const sourceSchema = z
  .object({
    utm_source: z.string().max(200).optional(),
    utm_medium: z.string().max(200).optional(),
    utm_campaign: z.string().max(200).optional(),
    utm_content: z.string().max(200).optional(),
    utm_term: z.string().max(200).optional(),
    referrer: z.string().max(500).optional(),
  })
  .optional();

export const briefingEnvelopeSchema = z.object({
  schemaVersion: z.number().int().positive(),
  service: z.enum([...SERVICES] as [Service, ...Service[]]),
  locale: z.string().max(10).default('pt-BR'),
  privacyNoticeVersion: z.string().min(1).max(40),
  // Ciência da política é obrigatória (§23) — precisa ser exatamente true.
  privacyAccepted: z.literal(true),
  marketingOptIn: z.boolean().optional().default(false),
  idempotencyKey: z.string().min(8).max(100),
  source: sourceSchema,
});

export type BriefingEnvelope = z.infer<typeof briefingEnvelopeSchema>;

export interface ValidatedBriefing extends BriefingEnvelope {
  answers: Record<string, unknown>;
}

export type BriefingValidation =
  | { ok: true; value: ValidatedBriefing }
  | { ok: false; errors: Record<string, string> };

function flatten(err: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of err.issues) {
    const key = issue.path.length ? issue.path.join('.') : '_';
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}

/** Valida envelope + respostas do serviço indicado. Fonte de verdade do servidor. */
export function validateBriefingPayload(raw: unknown): BriefingValidation {
  const envelope = briefingEnvelopeSchema.safeParse(raw);
  if (!envelope.success) return { ok: false, errors: flatten(envelope.error) };

  const schema = ANSWERS_SCHEMAS[envelope.data.service];
  const rawAnswers =
    raw && typeof raw === 'object' && 'answers' in raw
      ? (raw as { answers: unknown }).answers
      : {};
  const answers = schema.safeParse(rawAnswers ?? {});
  if (!answers.success) return { ok: false, errors: flatten(answers.error) };

  return { ok: true, value: { ...envelope.data, answers: answers.data as Record<string, unknown> } };
}

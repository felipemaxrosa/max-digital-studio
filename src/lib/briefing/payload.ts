/**
 * Monta o payload enviado ao /api/briefing e lê a atribuição (UTMs/referrer).
 * Puro, exceto `readSource`/`newIdempotencyKey` que tocam window (com guards).
 */
import type { Answers, Service } from './types';
import { PRIVACY_NOTICE_VERSION, SCHEMA_VERSION } from './content';

export interface BriefingSource {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  referrer?: string;
}

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const;

/** Lê e sanitiza a origem a partir da URL atual e do referrer externo. */
export function readSource(): BriefingSource {
  if (typeof window === 'undefined') return {};
  const src: BriefingSource = {};
  try {
    const params = new URLSearchParams(window.location.search);
    for (const k of UTM_KEYS) {
      const v = params.get(k);
      if (v) src[k] = v.slice(0, 200);
    }
    if (typeof document !== 'undefined' && document.referrer) {
      try {
        const ref = new URL(document.referrer);
        if (ref.origin !== window.location.origin) src.referrer = document.referrer.slice(0, 500);
      } catch {
        /* referrer malformado → ignora */
      }
    }
  } catch {
    /* ignore */
  }
  return src;
}

export function newIdempotencyKey(): string {
  try {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
      return crypto.randomUUID();
    }
  } catch {
    /* ignore */
  }
  return `k-${Date.now()}-${Math.random().toString(36).slice(2, 12)}`;
}

export interface BuildPayloadArgs {
  service: Service;
  answers: Answers;
  idempotencyKey: string;
  privacyAccepted: boolean;
  marketingOptIn: boolean;
  source: BriefingSource;
  locale?: string;
}

export function buildPayload(args: BuildPayloadArgs) {
  return {
    schemaVersion: SCHEMA_VERSION,
    service: args.service,
    locale: args.locale ?? 'pt-BR',
    answers: args.answers,
    privacyNoticeVersion: PRIVACY_NOTICE_VERSION,
    privacyAccepted: args.privacyAccepted,
    marketingOptIn: args.marketingOptIn,
    idempotencyKey: args.idempotencyKey,
    source: args.source,
  };
}

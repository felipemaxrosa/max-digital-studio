/**
 * Rascunho local (localStorage), respeitando a privacidade (§15):
 * — por tipo de briefing e versão de schema;
 * — EXCLUI dados de contato (grupo 'contact') — nada de PII no dispositivo;
 * — expira em 7 dias;
 * — tolerante a storage indisponível (private mode, bloqueio) via try/catch.
 */
import type { Answers, Service } from './types';
import { DRAFT_VERSION } from './content';
import { allFields, getServiceConfig } from './steps';

const EXPIRY_MS = 7 * 24 * 60 * 60 * 1000;

function key(service: Service): string {
  return `mds-briefing-draft:v${DRAFT_VERSION}:${service}`;
}

/** Nomes de campos de contato (PII) que NUNCA são salvos localmente. */
function contactFieldNames(service: Service): Set<string> {
  const config = getServiceConfig(service);
  if (!config) return new Set();
  return new Set(allFields(config).filter((f) => f.group === 'contact').map((f) => f.name));
}

/** Remove PII de contato antes de salvar. */
export function stripPii(service: Service, answers: Answers): Answers {
  const pii = contactFieldNames(service);
  const out: Answers = {};
  for (const [k, v] of Object.entries(answers)) {
    if (!pii.has(k)) out[k] = v;
  }
  return out;
}

interface DraftRecord {
  version: number;
  service: Service;
  savedAt: number;
  answers: Answers;
}

export function saveDraft(service: Service, answers: Answers): void {
  if (typeof window === 'undefined') return;
  try {
    const record: DraftRecord = {
      version: DRAFT_VERSION,
      service,
      savedAt: Date.now(),
      answers: stripPii(service, answers),
    };
    window.localStorage.setItem(key(service), JSON.stringify(record));
  } catch {
    // storage indisponível → o briefing segue funcionando sem rascunho.
  }
}

export function loadDraft(service: Service): Answers | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(key(service));
    if (!raw) return null;
    const record = JSON.parse(raw) as DraftRecord;
    if (record.version !== DRAFT_VERSION) {
      clearDraft(service);
      return null;
    }
    if (Date.now() - record.savedAt > EXPIRY_MS) {
      clearDraft(service);
      return null;
    }
    return record.answers ?? null;
  } catch {
    return null;
  }
}

export function hasDraft(service: Service): boolean {
  return loadDraft(service) !== null;
}

export function clearDraft(service: Service): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(key(service));
  } catch {
    // ignore
  }
}

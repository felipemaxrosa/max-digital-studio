/**
 * Persistência durável do briefing atrás de uma interface (facilita futura
 * troca/integração com CRM — §21). Adapter atual: Neon (Postgres serverless).
 * Sem DATABASE_URL → getBriefingStore() retorna null e o briefing opera por
 * e-mail (a rota decide se a submissão foi mesmo recebida).
 *
 * server-only: só importado pela rota /api/briefing.
 */
import type { Service } from './types';

export interface BriefingRecord {
  protocol: string;
  service: Service;
  locale: string;
  country: string | null;
  contact: Record<string, string>;
  payload: Record<string, unknown>;
  source: Record<string, unknown>;
  privacyNoticeVersion: string;
  idempotencyKey: string;
}

export interface SaveResult {
  id: string;
  protocol: string;
}

export interface BriefingStore {
  save(record: BriefingRecord): Promise<SaveResult>;
}

/** Protocolo público e curto (não é PII). Ex.: MDS-7KQ2PA. */
export function generateProtocol(): string {
  // Sem caracteres ambíguos (0/O, 1/I).
  const alphabet = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
  let s = '';
  for (let i = 0; i < 6; i++) s += alphabet[Math.floor(Math.random() * alphabet.length)];
  return `MDS-${s}`;
}

class NeonBriefingStore implements BriefingStore {
  constructor(private readonly connectionString: string) {}

  async save(record: BriefingRecord): Promise<SaveResult> {
    const { neon } = await import('@neondatabase/serverless');
    const sql = neon(this.connectionString);

    // Tagged template parametriza os valores (seguro contra injeção).
    // ON CONFLICT torna o reenvio idempotente: a chave única já existe → nada
    // é inserido e buscamos a linha original para devolver o protocolo certo.
    const inserted = await sql`
      insert into briefings
        (protocol, service, locale, country, status, contact, payload, source,
         privacy_notice_version, idempotency_key)
      values
        (${record.protocol}, ${record.service}, ${record.locale}, ${record.country},
         'briefing_received',
         ${JSON.stringify(record.contact)}::jsonb,
         ${JSON.stringify(record.payload)}::jsonb,
         ${JSON.stringify(record.source)}::jsonb,
         ${record.privacyNoticeVersion}, ${record.idempotencyKey})
      on conflict (idempotency_key) do nothing
      returning id, protocol
    `;

    if (inserted.length > 0) {
      return { id: String(inserted[0].id), protocol: String(inserted[0].protocol) };
    }

    const existing = await sql`
      select id, protocol from briefings where idempotency_key = ${record.idempotencyKey} limit 1
    `;
    if (existing.length > 0) {
      return { id: String(existing[0].id), protocol: String(existing[0].protocol) };
    }

    throw new Error('Neon insert returned no row');
  }
}

/** Retorna o store configurado, ou null quando não há DATABASE_URL. */
export function getBriefingStore(): BriefingStore | null {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  return new NeonBriefingStore(url);
}

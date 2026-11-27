import { describe, it, expect } from 'vitest';
import { validateBriefingPayload, ANSWERS_SCHEMAS } from '../schemas';

function diagnosticoPayload(overrides: Record<string, unknown> = {}) {
  return {
    schemaVersion: 1,
    service: 'diagnostico',
    locale: 'pt-BR',
    privacyNoticeVersion: '2026-11-27',
    privacyAccepted: true,
    idempotencyKey: 'abcdefgh-1234',
    source: { utm_source: 'instagram' },
    answers: {
      responsavel: 'Maria Silva',
      empresa: 'Estética Bela',
      email: 'maria@bela.com',
      whatsapp: '+55 11 99999-9999',
      pais: 'BR',
      segmento: 'Estética',
      dificuldade: 'sem-website',
      melhoria: 'Quero um site.',
    },
    ...overrides,
  };
}

describe('validateBriefingPayload', () => {
  it('accepts a complete diagnostico payload', () => {
    const r = validateBriefingPayload(diagnosticoPayload());
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.value.service).toBe('diagnostico');
      expect(r.value.answers.email).toBe('maria@bela.com');
      expect(r.value.marketingOptIn).toBe(false); // default aplicado
    }
  });

  it('rejects when privacy is not accepted', () => {
    const r = validateBriefingPayload(diagnosticoPayload({ privacyAccepted: false }));
    expect(r.ok).toBe(false);
  });

  it('rejects an unknown service', () => {
    const r = validateBriefingPayload(diagnosticoPayload({ service: 'hacker' }));
    expect(r.ok).toBe(false);
  });

  it('rejects an invalid email in a required contact field', () => {
    const p = diagnosticoPayload();
    (p.answers as Record<string, unknown>).email = 'not-an-email';
    const r = validateBriefingPayload(p);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.errors.email).toBeTruthy();
  });

  it('rejects a missing required contact field', () => {
    const p = diagnosticoPayload();
    delete (p.answers as Record<string, unknown>).responsavel;
    const r = validateBriefingPayload(p);
    expect(r.ok).toBe(false);
  });

  it('strips unknown answer keys instead of persisting junk', () => {
    const p = diagnosticoPayload();
    (p.answers as Record<string, unknown>).__injected = '<script>';
    const r = validateBriefingPayload(p);
    expect(r.ok).toBe(true);
    if (r.ok) expect('__injected' in r.value.answers).toBe(false);
  });

  it('requires an idempotency key of reasonable length', () => {
    const r = validateBriefingPayload(diagnosticoPayload({ idempotencyKey: 'x' }));
    expect(r.ok).toBe(false);
  });

  it('accepts a landing-page payload with a checkbox objetivo', () => {
    const r = validateBriefingPayload({
      schemaVersion: 1,
      service: 'landing-page',
      privacyNoticeVersion: '2026-11-27',
      privacyAccepted: true,
      idempotencyKey: 'abcdefgh-1234',
      answers: {
        responsavel: 'João',
        empresa: 'Studio X',
        email: 'joao@x.com',
        whatsapp: '911222333',
        pais: 'PT',
        segmento: 'Fotografia',
        descricaoNegocio: 'Fotografia de casamento.',
        objetivos: ['divulgar-servicos', 'contatos-whatsapp'],
      },
    });
    expect(r.ok).toBe(true);
  });

  it('exposes an answers schema per service', () => {
    expect(Object.keys(ANSWERS_SCHEMAS).sort()).toEqual(
      ['diagnostico', 'identidade-visual', 'landing-page', 'projeto-completo'].sort(),
    );
  });
});

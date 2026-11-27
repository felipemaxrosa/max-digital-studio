import { describe, it, expect, beforeEach } from 'vitest';
import { saveDraft, loadDraft, clearDraft, hasDraft, stripPii } from '../draft';
import type { Answers } from '../types';

const answers: Answers = {
  responsavel: 'Maria',
  email: 'maria@x.com',
  whatsapp: '11999998888',
  empresa: 'Bela',
  pais: 'BR',
  segmento: 'Estética',
  melhoria: 'Quero um site',
  instagram: '@bela',
};

beforeEach(() => {
  window.localStorage.clear();
});

describe('stripPii', () => {
  it('removes contact-group PII and keeps the rest', () => {
    const clean = stripPii('diagnostico', answers);
    expect(clean.responsavel).toBeUndefined();
    expect(clean.email).toBeUndefined();
    expect(clean.whatsapp).toBeUndefined();
    expect(clean.empresa).toBeUndefined();
    // 'melhoria' (project) e 'instagram' (references) permanecem
    expect(clean.melhoria).toBe('Quero um site');
    expect(clean.instagram).toBe('@bela');
  });
});

describe('saveDraft / loadDraft', () => {
  it('persists a draft without any contact PII', () => {
    saveDraft('diagnostico', answers);
    const loaded = loadDraft('diagnostico');
    expect(loaded).not.toBeNull();
    expect(loaded?.email).toBeUndefined();
    expect(loaded?.melhoria).toBe('Quero um site');
    expect(hasDraft('diagnostico')).toBe(true);
  });

  it('clears a draft', () => {
    saveDraft('diagnostico', answers);
    clearDraft('diagnostico');
    expect(loadDraft('diagnostico')).toBeNull();
  });

  it('expires drafts older than 7 days', () => {
    const eightDaysAgo = Date.now() - 8 * 24 * 60 * 60 * 1000;
    window.localStorage.setItem(
      'mds-briefing-draft:v1:diagnostico',
      JSON.stringify({ version: 1, service: 'diagnostico', savedAt: eightDaysAgo, answers: { melhoria: 'x' } }),
    );
    expect(loadDraft('diagnostico')).toBeNull();
  });

  it('ignores drafts from an older schema version', () => {
    window.localStorage.setItem(
      'mds-briefing-draft:v1:diagnostico',
      JSON.stringify({ version: 0, service: 'diagnostico', savedAt: Date.now(), answers: { melhoria: 'x' } }),
    );
    expect(loadDraft('diagnostico')).toBeNull();
  });
});

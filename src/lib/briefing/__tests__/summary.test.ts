import { describe, it, expect } from 'vitest';
import type { Answers } from '../types';
import { getServiceConfig } from '../steps';
import { groupedAnswers, buildBriefingSummaryText, extractContact } from '../summary';

const diag = getServiceConfig('diagnostico')!;

const answers: Answers = {
  responsavel: 'Maria Silva',
  empresa: 'Estética Bela',
  email: 'maria@bela.com',
  whatsapp: '11999998888',
  pais: 'BR',
  segmento: 'Estética',
  dificuldade: 'sem-website',
  melhoria: 'Quero um site profissional.',
};

describe('groupedAnswers', () => {
  it('groups filled, visible answers into sections and resolves option labels', () => {
    const sections = groupedAnswers('diagnostico', answers);
    const contact = sections.find((s) => s.group === 'contact');
    const project = sections.find((s) => s.group === 'project');
    expect(contact?.items.find((i) => i.name === 'pais')?.value).toBe('Brasil');
    expect(project?.items.find((i) => i.name === 'dificuldade')?.value).toBe(
      'Meu negócio ainda não possui website',
    );
  });

  it('omits empty answers', () => {
    const sections = groupedAnswers('diagnostico', { responsavel: 'Ana' } as Answers);
    const all = sections.flatMap((s) => s.items.map((i) => i.name));
    expect(all).toContain('responsavel');
    expect(all).not.toContain('melhoria');
  });

  it('renders an "Outro" free-text value for radios', () => {
    const sections = groupedAnswers('diagnostico', {
      ...answers,
      dificuldade: 'outro',
      dificuldadeOutro: 'Preciso de um app',
    } as Answers);
    const project = sections.find((s) => s.group === 'project');
    expect(project?.items.find((i) => i.name === 'dificuldade')?.value).toBe('Outro: Preciso de um app');
  });
});

describe('buildBriefingSummaryText', () => {
  it('produces a readable plain-text summary', () => {
    const text = buildBriefingSummaryText(diag, answers);
    expect(text).toContain('Briefing — Diagnóstico de Presença Digital');
    expect(text).toContain('Maria Silva');
    expect(text).toContain('Meu negócio ainda não possui website');
  });
});

describe('extractContact', () => {
  it('pulls the contact fields', () => {
    const c = extractContact('diagnostico', answers);
    expect(c.nome).toBe('Maria Silva');
    expect(c.email).toBe('maria@bela.com');
    expect(c.empresa).toBe('Estética Bela');
  });
});

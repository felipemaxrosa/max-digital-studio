import { describe, it, expect } from 'vitest';
import type { Answers } from '../types';
import { getServiceConfig } from '../steps';
import {
  validateStep,
  firstInvalidStepIndex,
  isFieldVisible,
  visibleFields,
} from '../validation';

const landing = getServiceConfig('landing-page')!;
const diagnostico = getServiceConfig('diagnostico')!;

describe('validateStep', () => {
  it('flags required fields that are empty', () => {
    const errors = validateStep(landing.steps[0], {});
    expect(errors.responsavel).toBeTruthy();
    expect(errors.email).toBeTruthy();
    expect(errors.whatsapp).toBeTruthy();
    // campos opcionais não geram erro
    expect(errors.cidade).toBeUndefined();
  });

  it('accepts a valid first step', () => {
    const answers: Answers = {
      responsavel: 'Ana',
      empresa: 'Marca',
      email: 'ana@marca.com',
      whatsapp: '11999998888',
      pais: 'BR',
      segmento: 'Moda',
      descricaoNegocio: 'Loja de roupas.',
    };
    expect(Object.keys(validateStep(landing.steps[0], answers))).toHaveLength(0);
  });

  it('validates email and phone format', () => {
    const answers: Answers = {
      responsavel: 'Ana',
      empresa: 'Marca',
      email: 'bad',
      whatsapp: '123',
      pais: 'BR',
      segmento: 'Moda',
      descricaoNegocio: 'x',
    };
    const errors = validateStep(landing.steps[0], answers);
    expect(errors.email).toContain('e-mail');
    expect(errors.whatsapp).toContain('telefone');
  });

  it('requires at least one checkbox selection when required', () => {
    const objetivosStep = landing.steps[1];
    expect(validateStep(objetivosStep, {}).objetivos).toBeTruthy();
    expect(validateStep(objetivosStep, { objetivos: ['divulgar-servicos'] }).objetivos).toBeUndefined();
  });
});

describe('conditional fields', () => {
  const field = landing.steps[1].fields.find((f) => f.name === 'melhoriasPaginaAtual')!;

  it('is hidden until the trigger is set', () => {
    expect(isFieldVisible(field, {})).toBe(false);
    expect(isFieldVisible(field, { possuiPagina: 'sim' })).toBe(true);
  });

  it('excludes hidden fields from the visible list', () => {
    const visible = visibleFields(landing.steps[1], { possuiPagina: 'nao' });
    expect(visible.some((f) => f.name === 'melhoriasPaginaAtual')).toBe(false);
  });
});

describe('firstInvalidStepIndex', () => {
  it('returns 0 when the first step is incomplete', () => {
    expect(firstInvalidStepIndex(diagnostico, {})).toBe(0);
  });

  it('returns -1 when every data step is valid', () => {
    const answers: Answers = {
      responsavel: 'Ana',
      empresa: 'Marca',
      email: 'ana@marca.com',
      whatsapp: '11999998888',
      pais: 'BR',
      segmento: 'Moda',
      dificuldade: 'sem-website',
    };
    expect(firstInvalidStepIndex(diagnostico, answers)).toBe(-1);
  });
});

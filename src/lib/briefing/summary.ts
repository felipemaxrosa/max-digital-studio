/**
 * Agrupa e formata respostas para leitura humana — reutilizado na revisão (UI),
 * no e-mail interno e na mensagem de fallback do WhatsApp. Sem dependência de
 * framework (roda no cliente e no servidor).
 */
import type { Answers, FieldConfig, FieldGroup, ServiceConfig } from './types';
import { allFields, getServiceConfig } from './steps';
import { isFieldVisible } from './validation';

const GROUP_LABELS: Record<FieldGroup, string> = {
  contact: 'Contato',
  business: 'Sobre o negócio',
  project: 'Projeto',
  references: 'Referências e estilo',
  budget: 'Prazo e investimento',
  privacy: 'Privacidade',
};

const GROUP_ORDER: FieldGroup[] = ['contact', 'business', 'project', 'references', 'budget'];

function optionLabel(field: FieldConfig, value: string): string {
  if (value === 'outro') return 'Outro';
  return field.options?.find((o) => o.value === value)?.label ?? value;
}

/** Valor legível de um campo (resolve opções → rótulos, arrays → lista). */
export function formatValue(field: FieldConfig, answers: Answers): string {
  const raw = answers[field.name];
  if (raw === undefined || raw === '' || (Array.isArray(raw) && raw.length === 0)) return '';

  if (Array.isArray(raw)) {
    const parts = raw.map((v) => optionLabel(field, v));
    if (field.allowOther && raw.includes('outro')) {
      const other = answers[`${field.name}Outro`];
      if (typeof other === 'string' && other.trim()) {
        return parts.filter((p) => p !== 'Outro').concat(`Outro: ${other.trim()}`).join(', ');
      }
    }
    return parts.join(', ');
  }

  if (typeof raw === 'boolean') return raw ? 'Sim' : 'Não';

  if (field.type === 'radio' || field.type === 'select' || field.type === 'country') {
    const label = optionLabel(field, raw);
    if (raw === 'outro' && field.allowOther) {
      const other = answers[`${field.name}Outro`];
      if (typeof other === 'string' && other.trim()) return `Outro: ${other.trim()}`;
    }
    return label;
  }

  return String(raw).trim();
}

export interface SummaryItem {
  name: string;
  label: string;
  value: string;
}
export interface SummarySection {
  group: FieldGroup;
  title: string;
  items: SummaryItem[];
}

/** Seções preenchidas (ignora campos vazios e condicionais ocultos). */
export function groupedAnswers(service: string, answers: Answers): SummarySection[] {
  const config = getServiceConfig(service);
  if (!config) return [];
  const fields = allFields(config).filter(
    (f) => f.group !== 'privacy' && isFieldVisible(f, answers),
  );

  return GROUP_ORDER.map((group) => {
    const items = fields
      .filter((f) => f.group === group)
      .map((f) => ({ name: f.name, label: f.label, value: formatValue(f, answers) }))
      .filter((i) => i.value !== '');
    return { group, title: GROUP_LABELS[group], items };
  }).filter((s) => s.items.length > 0);
}

/** Texto plano do briefing — corpo do e-mail interno e fallback de WhatsApp. */
export function buildBriefingSummaryText(config: ServiceConfig, answers: Answers): string {
  const lines = [`Briefing — ${config.label}`, ''];
  for (const section of groupedAnswers(config.service, answers)) {
    lines.push(`• ${section.title}`);
    for (const item of section.items) lines.push(`  - ${item.label}: ${item.value}`);
    lines.push('');
  }
  return lines.join('\n').trim();
}

/** Extrai os campos de contato (para e-mail interno, reply-to, storage). */
export function extractContact(service: string, answers: Answers): {
  nome: string;
  email: string;
  whatsapp: string;
  empresa: string;
  pais: string;
} {
  const get = (k: string) => {
    const v = answers[k];
    return typeof v === 'string' ? v.trim() : '';
  };
  return {
    nome: get('responsavel'),
    email: get('email'),
    whatsapp: get('whatsapp'),
    empresa: get('empresa'),
    pais: get('pais'),
  };
}

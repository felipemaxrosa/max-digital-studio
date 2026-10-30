/**
 * Formulário "Monte sua proposta ideal" — fonte única de campos, validação e
 * resumo, compartilhada pelo cliente (ProposalForm) e pelo servidor (API route).
 * Sem dependência externa (mantém o bundle do cliente leve).
 */

export const PACOTE_OPTIONS = [
  { value: "lp", label: "LP de Alta Conversão" },
  { value: "identidade", label: "Identidade + Landing Page" },
  { value: "indeciso", label: "Ainda não sei" },
] as const;

export type ProposalInput = {
  nome: string;
  contato: string; // WhatsApp ou e-mail
  tipoNegocio: string;
  pacote: string;
  objetivo: string;
  prazo: string;
  investimento: string;
  mensagem: string;
  website: string; // honeypot (deve vir vazio)
};

export type FieldErrors = Partial<Record<keyof ProposalInput, string>>;

export type ValidationResult =
  | { ok: true; value: ProposalInput }
  | { ok: false; errors: FieldErrors };

export const EMPTY_PROPOSAL: ProposalInput = {
  nome: "",
  contato: "",
  tipoNegocio: "",
  pacote: "",
  objetivo: "",
  prazo: "",
  investimento: "",
  mensagem: "",
  website: "",
};

function str(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

function isEmailOrPhone(v: string): boolean {
  const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const digits = v.replace(/\D/g, "");
  return email || digits.length >= 8;
}

export function isEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

export function validateProposal(raw: Record<string, unknown>): ValidationResult {
  const value: ProposalInput = {
    nome: str(raw.nome),
    contato: str(raw.contato),
    tipoNegocio: str(raw.tipoNegocio),
    pacote: str(raw.pacote),
    objetivo: str(raw.objetivo),
    prazo: str(raw.prazo),
    investimento: str(raw.investimento),
    mensagem: str(raw.mensagem),
    website: str(raw.website),
  };

  const errors: FieldErrors = {};
  if (value.nome.length < 2) errors.nome = "Conta pra mim o seu nome.";
  if (!value.contato) errors.contato = "Deixa um WhatsApp ou e-mail pra eu te responder.";
  else if (!isEmailOrPhone(value.contato))
    errors.contato = "Parece inválido — confere o WhatsApp ou e-mail.";
  if (!value.pacote) errors.pacote = "Escolhe uma opção.";

  if (Object.keys(errors).length) return { ok: false, errors };
  return { ok: true, value };
}

export function pacoteLabel(value: string): string {
  return PACOTE_OPTIONS.find((o) => o.value === value)?.label ?? value;
}

/** Resumo legível — usado no corpo do e-mail e na mensagem pré-preenchida do WhatsApp. */
export function buildSummary(v: ProposalInput): string {
  const lines = [
    "Nova proposta — Max Digital Studio",
    "",
    `Nome: ${v.nome}`,
    `Contato: ${v.contato}`,
    `Pacote de interesse: ${pacoteLabel(v.pacote)}`,
  ];
  if (v.tipoNegocio) lines.push(`Negócio / nicho: ${v.tipoNegocio}`);
  if (v.objetivo) lines.push(`Objetivo principal: ${v.objetivo}`);
  if (v.prazo) lines.push(`Prazo desejado: ${v.prazo}`);
  if (v.investimento) lines.push(`Faixa de investimento: ${v.investimento}`);
  if (v.mensagem) lines.push("", `Mensagem: ${v.mensagem}`);
  return lines.join("\n");
}

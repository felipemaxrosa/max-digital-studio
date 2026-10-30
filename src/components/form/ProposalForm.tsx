"use client";

import { useState } from "react";
import { Button } from "@/components/ui";
import { WhatsAppIcon } from "@/components/icons";
import {
  EMPTY_PROPOSAL,
  PACOTE_OPTIONS,
  validateProposal,
  buildSummary,
  type ProposalInput,
  type FieldErrors,
} from "@/lib/proposal";
import { waLink } from "@/lib/site";

const fieldBase =
  "w-full rounded-xl border bg-[var(--color-slate)] px-4 py-3 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-muted)]/50 transition-colors focus:outline-none";

function fieldCls(err?: string) {
  return `${fieldBase} ${
    err
      ? "border-[#FB7185]"
      : "border-[var(--color-border-glass)] focus:border-[var(--color-accent)]"
  }`;
}

type Status = "idle" | "sending" | "sent";

export function ProposalForm() {
  const [form, setForm] = useState<ProposalInput>(EMPTY_PROPOSAL);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  function update<K extends keyof ProposalInput>(key: K, value: ProposalInput[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = validateProposal(form);
    if (!result.ok) {
      setErrors(result.errors);
      return;
    }
    setStatus("sending");
    try {
      await fetch("/api/proposta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.value),
      });
    } catch {
      // Falha de rede não perde o lead — o estado de sucesso oferece o WhatsApp.
    }
    setStatus("sent");
  }

  function handleWhatsApp() {
    const result = validateProposal(form);
    if (!result.ok) {
      setErrors(result.errors);
      return;
    }
    window.open(waLink(buildSummary(result.value)), "_blank", "noopener,noreferrer");
  }

  if (status === "sent") {
    return (
      <div className="flex flex-col items-start gap-4 rounded-[var(--radius-card)] border border-[color:color-mix(in_srgb,var(--color-accent)_40%,var(--color-border-glass))] bg-[var(--color-slate)]/60 p-8">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[linear-gradient(90deg,#2563EB,#38BDF8)] text-xl text-white">
          ✓
        </div>
        <h3 className="text-xl font-bold">Proposta recebida!</h3>
        <p className="text-sm leading-relaxed text-[var(--color-muted)]">
          Obrigado, {form.nome.split(" ")[0] || "tudo certo"}. Vou analisar e te respondo em
          até 2 horas em horário comercial. Quer adiantar? Me chama no WhatsApp com o resumo
          já preenchido.
        </p>
        <Button onClick={handleWhatsApp} variant="whatsapp" size="md">
          <WhatsAppIcon className="h-5 w-5" /> Adiantar pelo WhatsApp
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      {/* Honeypot anti-spam (oculto) */}
      <input
        type="text"
        name="website"
        value={form.website}
        onChange={(e) => update("website", e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="hidden"
      />

      <Field label="Seu nome" error={errors.nome} htmlFor="nome">
        <input
          id="nome"
          className={fieldCls(errors.nome)}
          value={form.nome}
          onChange={(e) => update("nome", e.target.value)}
          placeholder="Como posso te chamar?"
        />
      </Field>

      <Field label="WhatsApp ou e-mail" error={errors.contato} htmlFor="contato">
        <input
          id="contato"
          className={fieldCls(errors.contato)}
          value={form.contato}
          onChange={(e) => update("contato", e.target.value)}
          placeholder="(11) 99999-9999 ou voce@email.com"
        />
      </Field>

      <div>
        <span className="mb-1.5 block text-sm font-medium">Qual pacote chama mais atenção?</span>
        <div className="flex flex-wrap gap-2">
          {PACOTE_OPTIONS.map((o) => {
            const active = form.pacote === o.value;
            return (
              <button
                type="button"
                key={o.value}
                onClick={() => update("pacote", o.value)}
                aria-pressed={active}
                className={`rounded-xl border px-4 py-2 text-sm transition-colors ${
                  active
                    ? "border-transparent bg-[linear-gradient(90deg,#2563EB,#38BDF8)] font-medium text-white"
                    : "border-[var(--color-border-glass)] text-[var(--color-muted)] hover:text-[var(--color-ink)]"
                }`}
              >
                {o.label}
              </button>
            );
          })}
        </div>
        {errors.pacote && <p className="mt-1.5 text-xs text-[#FB7185]">{errors.pacote}</p>}
      </div>

      <Field label="Tipo de negócio / nicho" optional htmlFor="tipoNegocio">
        <input
          id="tipoNegocio"
          className={fieldCls()}
          value={form.tipoNegocio}
          onChange={(e) => update("tipoNegocio", e.target.value)}
          placeholder="Ex.: barbearia, estética, restaurante…"
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Objetivo principal" optional htmlFor="objetivo">
          <input
            id="objetivo"
            className={fieldCls()}
            value={form.objetivo}
            onChange={(e) => update("objetivo", e.target.value)}
            placeholder="Ex.: mais leads no WhatsApp"
          />
        </Field>
        <Field label="Prazo desejado" optional htmlFor="prazo">
          <input
            id="prazo"
            className={fieldCls()}
            value={form.prazo}
            onChange={(e) => update("prazo", e.target.value)}
            placeholder="Ex.: até o fim do mês"
          />
        </Field>
      </div>

      <Field label="Faixa de investimento" optional htmlFor="investimento">
        <input
          id="investimento"
          className={fieldCls()}
          value={form.investimento}
          onChange={(e) => update("investimento", e.target.value)}
          placeholder="Opcional — ajuda a desenhar a melhor proposta"
        />
      </Field>

      <Field label="Mensagem" optional htmlFor="mensagem">
        <textarea
          id="mensagem"
          rows={4}
          className={`${fieldCls()} resize-y`}
          value={form.mensagem}
          onChange={(e) => update("mensagem", e.target.value)}
          placeholder="Conta um pouco sobre o seu projeto…"
        />
      </Field>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button type="submit" variant="primary" size="lg" disabled={status === "sending"} className="w-full justify-center sm:w-auto">
          {status === "sending" ? "Enviando…" : "Enviar proposta →"}
        </Button>
        <Button type="button" onClick={handleWhatsApp} variant="whatsapp" size="lg" className="w-full justify-center sm:w-auto">
          <WhatsAppIcon className="h-5 w-5" /> Enviar pelo WhatsApp
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  optional,
  htmlFor,
  children,
}: {
  label: string;
  error?: string;
  optional?: boolean;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium">
        {label}
        {optional && (
          <span className="ml-2 font-mono text-[0.65rem] uppercase tracking-wider text-[var(--color-muted)]/60">
            opcional
          </span>
        )}
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs text-[#FB7185]">{error}</p>}
    </div>
  );
}

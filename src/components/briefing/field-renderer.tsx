"use client";

/**
 * Renderiza um campo do briefing a partir da sua configuração (FieldConfig).
 * Uma única fonte de UI para todos os formulários. Acessível: label associado,
 * fieldset/legend para grupos, erros com aria.
 */
import type { Answers, AnswerValue, FieldConfig } from "@/lib/briefing/types";
import { SelectField } from "./select-field";

const ERROR = "#FB7185";

const inputBase =
  "w-full rounded-xl border bg-[var(--color-slate)] px-4 py-3 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-muted)]/50 transition-colors focus:outline-none";

function inputCls(err?: string) {
  return `${inputBase} ${
    err
      ? "border-[#FB7185]"
      : "border-[var(--color-border-glass)] focus:border-[var(--color-accent)]"
  }`;
}

type Props = {
  field: FieldConfig;
  answers: Answers;
  error?: string;
  onChange: (name: string, value: AnswerValue) => void;
};

export function FieldView({ field, answers, error, onChange }: Props) {
  const value = answers[field.name];
  const errorId = error ? `${field.name}-error` : undefined;
  const helpId = field.help ? `${field.name}-help` : undefined;
  const describedBy = [helpId, errorId].filter(Boolean).join(" ") || undefined;
  const isGroup = field.type === "radio" || field.type === "checkbox-group";

  const labelNode = (
    <>
      {field.label}
      {!field.required && (
        <span className="ml-2 font-mono text-[0.65rem] uppercase tracking-wider text-[var(--color-muted)]/60">
          opcional
        </span>
      )}
    </>
  );

  return (
    <div role={isGroup ? undefined : undefined}>
      {isGroup ? (
        <fieldset>
          <legend className="mb-2 block text-sm font-medium text-[var(--color-ink)]">
            {labelNode}
          </legend>
          {field.help && (
            <p id={helpId} className="mb-2 text-xs text-[var(--color-muted)]">
              {field.help}
            </p>
          )}
          <Control field={field} value={value} answers={answers} onChange={onChange} describedBy={describedBy} />
        </fieldset>
      ) : (
        <>
          <label htmlFor={field.name} className="mb-1.5 block text-sm font-medium text-[var(--color-ink)]">
            {labelNode}
          </label>
          {field.help && (
            <p id={helpId} className="mb-1.5 text-xs text-[var(--color-muted)]">
              {field.help}
            </p>
          )}
          <Control field={field} value={value} answers={answers} onChange={onChange} error={error} describedBy={describedBy} />
        </>
      )}
      {error && (
        <p id={errorId} role="alert" className="mt-1.5 text-xs" style={{ color: ERROR }}>
          {error}
        </p>
      )}
    </div>
  );
}

function Control({
  field,
  value,
  answers,
  onChange,
  error,
  describedBy,
}: {
  field: FieldConfig;
  value: AnswerValue;
  answers: Answers;
  onChange: (name: string, value: AnswerValue) => void;
  error?: string;
  describedBy?: string;
}) {
  const str = typeof value === "string" ? value : "";

  switch (field.type) {
    case "textarea":
      return (
        <textarea
          id={field.name}
          rows={4}
          className={`${inputCls(error)} resize-y`}
          value={str}
          maxLength={field.maxLength}
          placeholder={field.placeholder}
          aria-describedby={describedBy}
          aria-invalid={error ? true : undefined}
          onChange={(e) => onChange(field.name, e.target.value)}
        />
      );

    case "select":
    case "country":
      return (
        <SelectField
          id={field.name}
          value={str}
          options={field.options ?? []}
          placeholder={field.placeholder ?? "Selecione…"}
          error={error}
          describedBy={describedBy}
          onChange={(v) => onChange(field.name, v)}
        />
      );

    case "radio":
      return <RadioGroup field={field} value={str} answers={answers} onChange={onChange} />;

    case "checkbox-group":
      return (
        <CheckboxGroup
          field={field}
          value={Array.isArray(value) ? value : []}
          answers={answers}
          onChange={onChange}
        />
      );

    default:
      return (
        <input
          id={field.name}
          type={field.type === "email" ? "email" : field.type === "phone" ? "tel" : field.type === "url" ? "url" : "text"}
          inputMode={field.type === "phone" ? "tel" : undefined}
          className={inputCls(error)}
          value={str}
          maxLength={field.maxLength}
          placeholder={field.placeholder}
          autoComplete={autoCompleteFor(field.name)}
          aria-describedby={describedBy}
          aria-invalid={error ? true : undefined}
          onChange={(e) => onChange(field.name, e.target.value)}
        />
      );
  }
}

const chipBase =
  "cursor-pointer rounded-xl border px-4 py-2 text-sm transition-colors select-none";
const chipOn = "border-transparent bg-[linear-gradient(90deg,#2563EB,#38BDF8)] font-medium text-white";
const chipOff =
  "border-[var(--color-border-glass)] text-[var(--color-muted)] hover:text-[var(--color-ink)] hover:border-[color:color-mix(in_srgb,var(--color-accent)_45%,transparent)]";

function withOther(field: FieldConfig) {
  const base = field.options ?? [];
  return field.allowOther ? [...base, { value: "outro", label: "Outro" }] : base;
}

function RadioGroup({
  field,
  value,
  answers,
  onChange,
}: {
  field: FieldConfig;
  value: string;
  answers: Answers;
  onChange: (name: string, value: AnswerValue) => void;
}) {
  const options = withOther(field);
  const otherSelected = field.allowOther && value === "outro";
  const otherVal = answers[`${field.name}Outro`];
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const on = value === o.value;
          return (
            <label key={o.value} className={`${chipBase} ${on ? chipOn : chipOff}`}>
              <input
                type="radio"
                name={field.name}
                value={o.value}
                checked={on}
                onChange={() => onChange(field.name, o.value)}
                className="sr-only"
              />
              {o.label}
            </label>
          );
        })}
      </div>
      {otherSelected && (
        <input
          type="text"
          aria-label="Especifique"
          placeholder="Especifique…"
          className={inputCls()}
          maxLength={300}
          value={typeof otherVal === "string" ? otherVal : ""}
          onChange={(e) => onChange(`${field.name}Outro`, e.target.value)}
        />
      )}
    </div>
  );
}

function CheckboxGroup({
  field,
  value,
  answers,
  onChange,
}: {
  field: FieldConfig;
  value: string[];
  answers: Answers;
  onChange: (name: string, value: AnswerValue) => void;
}) {
  const options = withOther(field);
  const toggle = (v: string) => {
    const next = value.includes(v) ? value.filter((x) => x !== v) : [...value, v];
    onChange(field.name, next);
  };
  const otherSelected = field.allowOther && value.includes("outro");
  const otherVal = answers[`${field.name}Outro`];
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const on = value.includes(o.value);
          return (
            <label key={o.value} className={`${chipBase} ${on ? chipOn : chipOff}`}>
              <input
                type="checkbox"
                name={field.name}
                value={o.value}
                checked={on}
                onChange={() => toggle(o.value)}
                className="sr-only"
              />
              {o.label}
            </label>
          );
        })}
      </div>
      {otherSelected && (
        <input
          type="text"
          aria-label="Especifique"
          placeholder="Especifique…"
          className={inputCls()}
          maxLength={300}
          value={typeof otherVal === "string" ? otherVal : ""}
          onChange={(e) => onChange(`${field.name}Outro`, e.target.value)}
        />
      )}
    </div>
  );
}

function autoCompleteFor(name: string): string | undefined {
  switch (name) {
    case "responsavel":
      return "name";
    case "email":
      return "email";
    case "whatsapp":
      return "tel";
    case "cidade":
      return "address-level2";
    case "empresa":
      return "organization";
    default:
      return undefined;
  }
}

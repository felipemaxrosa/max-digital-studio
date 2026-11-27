"use client";

import type { Answers, ServiceConfig } from "@/lib/briefing/types";
import { visibleFields } from "@/lib/briefing/validation";
import { formatValue } from "@/lib/briefing/summary";
import { REVIEW } from "@/lib/briefing/content";

export function BriefingReview({
  config,
  answers,
  onEdit,
}: {
  config: ServiceConfig;
  answers: Answers;
  onEdit: (stepIndex: number) => void;
}) {
  const dataSteps = config.steps.slice(0, -1);
  return (
    <div className="flex flex-col gap-4">
      {dataSteps.map((step, i) => {
        const items = visibleFields(step, answers)
          .map((f) => ({ label: f.label, value: formatValue(f, answers) }))
          .filter((x) => x.value !== "");
        return (
          <div
            key={step.id}
            className="rounded-[var(--radius-card)] border border-[var(--color-border-glass)] bg-[var(--color-slate)]/40 p-5"
          >
            <div className="mb-3 flex items-center justify-between gap-3">
              <h3 className="text-sm font-semibold text-[var(--color-ink)]">{step.title}</h3>
              <button
                type="button"
                onClick={() => onEdit(i)}
                className="shrink-0 rounded-md px-2 py-1 text-xs font-medium text-[var(--color-accent-alt)] transition-colors hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-cyan)]"
              >
                {REVIEW.editLabel}
                <span className="sr-only"> — {step.title}</span>
              </button>
            </div>
            {items.length ? (
              <dl className="flex flex-col gap-2.5">
                {items.map((it) => (
                  <div
                    key={it.label}
                    className="grid grid-cols-1 gap-0.5 sm:grid-cols-[minmax(0,40%)_1fr] sm:gap-4"
                  >
                    <dt className="text-xs text-[var(--color-muted)]">{it.label}</dt>
                    <dd className="whitespace-pre-wrap break-words text-sm text-[var(--color-ink)]">
                      {it.value}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p className="text-xs text-[var(--color-muted)]">Nada preenchido nesta etapa.</p>
            )}
          </div>
        );
      })}
    </div>
  );
}

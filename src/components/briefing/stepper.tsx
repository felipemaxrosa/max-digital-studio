"use client";

/** Indicadores de etapa: sidebar (desktop) e barra compacta (mobile). */

type StepMeta = { nav: string };

export function BriefingStepper({
  steps,
  current,
  maxReached,
  onNavigate,
}: {
  steps: StepMeta[];
  current: number;
  maxReached: number;
  onNavigate: (index: number) => void;
}) {
  return (
    <nav aria-label="Etapas do briefing" className="flex flex-col gap-1">
      <p className="mb-3 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-[var(--color-muted)]/70">
        {steps[steps.length - 1]?.nav === "Revisão" ? "Briefing" : "Etapas"}
      </p>
      <ol className="flex flex-col gap-0.5">
        {steps.map((step, i) => {
          const state = i === current ? "current" : i < current ? "done" : "upcoming";
          const reachable = i <= maxReached;
          const dotCls =
            state === "current"
              ? "bg-[linear-gradient(90deg,#2563EB,#38BDF8)] text-white"
              : state === "done"
                ? "bg-[color:color-mix(in_srgb,var(--color-accent)_30%,var(--color-slate-2))] text-[var(--color-ink)]"
                : "bg-[var(--color-slate-2)] text-[var(--color-muted)]";
          return (
            <li key={i}>
              <button
                type="button"
                disabled={!reachable}
                aria-current={state === "current" ? "step" : undefined}
                onClick={() => reachable && onNavigate(i)}
                className={`flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left text-sm transition-colors ${
                  reachable ? "cursor-pointer hover:bg-white/[0.03]" : "cursor-default opacity-60"
                }`}
              >
                <span
                  className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-medium ${dotCls}`}
                  aria-hidden
                >
                  {state === "done" ? "✓" : i + 1}
                </span>
                <span
                  className={
                    state === "current"
                      ? "font-medium text-[var(--color-ink)]"
                      : "text-[var(--color-muted)]"
                  }
                >
                  {step.nav}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function BriefingProgress({
  current,
  total,
  stepName,
}: {
  current: number;
  total: number;
  stepName: string;
}) {
  const pct = Math.round(((current + 1) / total) * 100);
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-[var(--color-accent-alt)]">
          Etapa {current + 1} / {total}
        </span>
        <span className="text-[var(--color-muted)]">{pct}%</span>
      </div>
      <div
        className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--color-slate-2)]"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Progresso: ${stepName}`}
      >
        <div
          className="h-full rounded-full bg-[linear-gradient(90deg,#2563EB,#38BDF8)] transition-[width] duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

"use client";

import { useEffect, useReducer, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui";
import { WhatsAppIcon } from "@/components/icons";
import { waLink } from "@/lib/site";
import { track, EVENTS } from "@/lib/analytics";
import type { Answers, AnswerValue, Service } from "@/lib/briefing/types";
import { getServiceConfig } from "@/lib/briefing/steps";
import { validateStep, firstInvalidStepIndex, visibleFields, type FieldErrors } from "@/lib/briefing/validation";
import { buildPayload, newIdempotencyKey, readSource } from "@/lib/briefing/payload";
import { saveDraft, loadDraft, clearDraft } from "@/lib/briefing/draft";
import { buildBriefingSummaryText } from "@/lib/briefing/summary";
import { DRAFT_COPY, REVIEW, SUBMIT_ERROR } from "@/lib/briefing/content";
import { FieldView } from "./field-renderer";
import { BriefingStepper, BriefingProgress } from "./stepper";
import { BriefingReview } from "./BriefingReview";
import { BriefingPrivacyNotice } from "./privacy-notice";

const SUCCESS_KEY = "mds-briefing-success";

type Status = "idle" | "submitting" | "error";

interface State {
  stepIndex: number;
  maxStep: number;
  answers: Answers;
  errors: FieldErrors;
  accepted: boolean;
  marketing: boolean;
  privacyError?: string;
  status: Status;
}

type Action =
  | { type: "set"; name: string; value: AnswerValue }
  | { type: "hydrate"; answers: Answers }
  | { type: "advance"; index: number }
  | { type: "back" }
  | { type: "goto"; index: number }
  | { type: "errors"; errors: FieldErrors }
  | { type: "accept"; value: boolean }
  | { type: "marketing"; value: boolean }
  | { type: "privacyError"; value?: string }
  | { type: "status"; value: Status };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "set": {
      const errors = { ...state.errors };
      delete errors[action.name];
      return { ...state, answers: { ...state.answers, [action.name]: action.value }, errors };
    }
    case "hydrate":
      return { ...state, answers: { ...state.answers, ...action.answers } };
    case "advance":
      return { ...state, stepIndex: action.index, maxStep: Math.max(state.maxStep, action.index), errors: {} };
    case "back":
      return { ...state, stepIndex: Math.max(0, state.stepIndex - 1), errors: {} };
    case "goto":
      return { ...state, stepIndex: action.index, errors: {}, status: state.status === "error" ? "idle" : state.status };
    case "errors":
      return { ...state, errors: action.errors };
    case "accept":
      return { ...state, accepted: action.value, privacyError: action.value ? undefined : state.privacyError };
    case "marketing":
      return { ...state, marketing: action.value };
    case "privacyError":
      return { ...state, privacyError: action.value };
    case "status":
      return { ...state, status: action.value };
    default:
      return state;
  }
}

export function BriefingForm({ service }: { service: Service }) {
  const router = useRouter();
  // Resolvido no cliente — a config contém funções (visibleIf) que não cruzam
  // a fronteira Server→Client como props.
  const config = getServiceConfig(service)!;
  const totalSteps = config.steps.length; // inclui a revisão
  const reviewIndex = totalSteps - 1;

  const [state, dispatch] = useReducer(reducer, null, (): State => ({
    stepIndex: 0,
    maxStep: 0,
    answers: {},
    errors: {},
    accepted: false,
    marketing: false,
    status: "idle",
  }));

  const [draftPrompt, setDraftPrompt] = useState(false);
  const [draftSaved, setDraftSaved] = useState(false);
  const pendingDraft = useRef<Answers | null>(null);
  const idempotencyKey = useRef<string>(newIdempotencyKey());
  const honeypot = useRef("");
  const headingRef = useRef<HTMLHeadingElement>(null);
  const startedRef = useRef(false);
  const reviewSeenRef = useRef(false);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onReview = state.stepIndex === reviewIndex;
  const currentStep = config.steps[state.stepIndex];

  // Analytics: início (uma vez) + rascunho existente.
  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    track(EVENTS.briefingStart, { service_type: config.service, total_steps: totalSteps });
    const draft = loadDraft(config.service);
    if (draft && Object.keys(draft).length > 0) {
      pendingDraft.current = draft;
      // Leitura única de localStorage na montagem (API só-cliente).
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDraftPrompt(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Autosave (debounce). Dispara só após o usuário mexer.
  useEffect(() => {
    if (Object.keys(state.answers).length === 0) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      saveDraft(config.service, state.answers);
      setDraftSaved(true);
    }, 600);
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, [state.answers, config.service]);

  // Foco acessível ao trocar de etapa + topo.
  useEffect(() => {
    headingRef.current?.focus();
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }, [state.stepIndex]);

  // Evita perda acidental (reload/fechar) enquanto houver respostas e não enviou.
  useEffect(() => {
    const hasAnswers = Object.keys(state.answers).length > 0;
    if (!hasAnswers || state.status === "submitting") return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [state.answers, state.status]);

  function onChange(name: string, value: AnswerValue) {
    dispatch({ type: "set", name, value });
  }

  function focusFirstError(errors: FieldErrors) {
    const first = Object.keys(errors)[0];
    if (first && typeof document !== "undefined") {
      requestAnimationFrame(() => document.getElementById(first)?.focus());
    }
  }

  function handleNext() {
    const errors = validateStep(currentStep, state.answers);
    if (Object.keys(errors).length > 0) {
      dispatch({ type: "errors", errors });
      focusFirstError(errors);
      return;
    }
    track(EVENTS.briefingStepCompleted, {
      service_type: config.service,
      step_number: state.stepIndex + 1,
      step_name: currentStep.id,
      total_steps: totalSteps,
    });
    const next = state.stepIndex + 1;
    dispatch({ type: "advance", index: next });
    if (next === reviewIndex && !reviewSeenRef.current) {
      reviewSeenRef.current = true;
      track(EVENTS.briefingReviewView, { service_type: config.service });
    }
  }

  function applyDraft() {
    if (pendingDraft.current) dispatch({ type: "hydrate", answers: pendingDraft.current });
    pendingDraft.current = null;
    setDraftPrompt(false);
  }

  function discardDraft() {
    clearDraft(config.service);
    pendingDraft.current = null;
    setDraftPrompt(false);
  }

  async function handleSubmit() {
    // Valida tudo; se algo falhar, pula pra primeira etapa inválida.
    const invalid = firstInvalidStepIndex(config, state.answers);
    if (invalid !== -1) {
      const errors = validateStep(config.steps[invalid], state.answers);
      dispatch({ type: "goto", index: invalid });
      dispatch({ type: "errors", errors });
      focusFirstError(errors);
      return;
    }
    if (!state.accepted) {
      dispatch({ type: "privacyError", value: "Confirme a ciência da política de privacidade para enviar." });
      return;
    }

    dispatch({ type: "status", value: "submitting" });
    const payload = {
      ...buildPayload({
        service: config.service,
        answers: state.answers,
        idempotencyKey: idempotencyKey.current,
        privacyAccepted: state.accepted,
        marketingOptIn: state.marketing,
        source: readSource(),
      }),
      website: honeypot.current, // honeypot (deve ir vazio)
    };

    try {
      const res = await fetch("/api/briefing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => null)) as
        | { ok: boolean; protocol?: string; error?: string }
        | null;

      if (res.ok && data?.ok) {
        try {
          sessionStorage.setItem(
            SUCCESS_KEY,
            JSON.stringify({ protocol: data.protocol ?? "", service: config.service }),
          );
        } catch {
          /* sessionStorage indisponível → a página de sucesso mostra estado genérico */
        }
        clearDraft(config.service);
        track(EVENTS.briefingSubmitSuccess, { service_type: config.service });
        router.push("/briefing/sucesso");
        return;
      }

      dispatch({ type: "status", value: "error" });
      track(EVENTS.briefingSubmitError, {
        service_type: config.service,
        error_code: data?.error ?? String(res.status),
      });
    } catch {
      dispatch({ type: "status", value: "error" });
      track(EVENTS.briefingSubmitError, { service_type: config.service, error_code: "network" });
    }
  }

  function whatsappFallback() {
    track(EVENTS.briefingWhatsappClick, { service_type: config.service });
    const text = buildBriefingSummaryText(config, state.answers);
    window.open(waLink(text), "_blank", "noopener,noreferrer");
  }

  const navSteps = config.steps.map((s) => ({ nav: s.nav }));

  return (
    <div className="mx-auto grid max-w-[980px] gap-8 lg:grid-cols-[210px_1fr] lg:gap-12">
      {/* Sidebar (desktop) */}
      <aside className="hidden lg:block">
        <div className="sticky top-24">
          <BriefingStepper
            steps={navSteps}
            current={state.stepIndex}
            maxReached={state.maxStep}
            onNavigate={(i) => dispatch({ type: "goto", index: i })}
          />
        </div>
      </aside>

      <div className="min-w-0">
        {/* Progresso (mobile) */}
        <div className="mb-6 lg:hidden">
          <BriefingProgress current={state.stepIndex} total={totalSteps} stepName={currentStep.nav} />
        </div>

        {/* Prompt de rascunho */}
        {draftPrompt && (
          <div className="mb-6 rounded-[var(--radius-card)] border border-[color:color-mix(in_srgb,var(--color-accent)_40%,var(--color-border-glass))] bg-[var(--color-slate)]/60 p-4">
            <p className="text-sm font-medium text-[var(--color-ink)]">{DRAFT_COPY.resumeTitle}</p>
            <p className="mt-1 text-sm text-[var(--color-muted)]">{DRAFT_COPY.resumeText}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Button type="button" variant="primary" size="sm" onClick={applyDraft}>
                {DRAFT_COPY.resume}
              </Button>
              <Button type="button" variant="glass" size="sm" onClick={discardDraft}>
                {DRAFT_COPY.discard}
              </Button>
            </div>
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (onReview) handleSubmit();
            else handleNext();
          }}
          noValidate
        >
          {/* Honeypot */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden
            className="hidden"
            onChange={(e) => (honeypot.current = e.target.value)}
          />

          <header className="mb-6">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-[var(--color-accent-alt)]">
              {onReview ? REVIEW.nav : currentStep.nav}
            </p>
            <h1
              ref={headingRef}
              tabIndex={-1}
              className="mt-2 text-2xl font-bold text-[var(--color-ink)] outline-none md:text-3xl"
            >
              {onReview ? REVIEW.title : currentStep.title}
            </h1>
            {(onReview ? REVIEW.description : currentStep.description) && (
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)] md:text-base">
                {onReview ? REVIEW.description : currentStep.description}
              </p>
            )}
          </header>

          {onReview ? (
            <div className="flex flex-col gap-5">
              <BriefingReview
                config={config}
                answers={state.answers}
                onEdit={(i) => dispatch({ type: "goto", index: i })}
              />
              <BriefingPrivacyNotice
                accepted={state.accepted}
                marketingOptIn={state.marketing}
                error={state.privacyError}
                onAccept={(v) => dispatch({ type: "accept", value: v })}
                onMarketing={(v) => dispatch({ type: "marketing", value: v })}
              />
              {state.status === "error" && (
                <div role="alert" className="rounded-[var(--radius-card)] border border-[#FB7185]/40 bg-[#FB7185]/10 p-4">
                  <p className="text-sm font-medium text-[var(--color-ink)]">{SUBMIT_ERROR.title}</p>
                  <p className="mt-1 text-sm text-[var(--color-muted)]">{SUBMIT_ERROR.text}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {visibleFields(currentStep, state.answers).map((field) => (
                <FieldView
                  key={field.name}
                  field={field}
                  answers={state.answers}
                  error={state.errors[field.name]}
                  onChange={onChange}
                />
              ))}
            </div>
          )}

          {/* Navegação */}
          <div className="mt-8 flex flex-col gap-3 border-t border-[var(--color-border-glass)] pt-5">
            <div className="flex items-center justify-between gap-3">
              {state.stepIndex > 0 ? (
                <Button type="button" variant="ghost" size="md" onClick={() => dispatch({ type: "back" })}>
                  ← Voltar
                </Button>
              ) : (
                <span />
              )}

              {onReview ? (
                <Button type="submit" variant="primary" size="lg" disabled={state.status === "submitting"}>
                  {state.status === "submitting"
                    ? "Enviando…"
                    : config.service === "diagnostico"
                      ? REVIEW.submitDiagnostico
                      : REVIEW.submit}{" "}
                  →
                </Button>
              ) : (
                <Button type="submit" variant="primary" size="lg">
                  Continuar →
                </Button>
              )}
            </div>

            <div className="flex items-center justify-between gap-3">
              <p aria-live="polite" className="text-xs text-[var(--color-muted)]/70">
                {draftSaved ? DRAFT_COPY.saved : ""}
              </p>
              {state.status === "error" && (
                <Button type="button" variant="whatsapp" size="sm" onClick={whatsappFallback}>
                  <WhatsAppIcon className="h-4 w-4" /> {SUBMIT_ERROR.whatsapp}
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

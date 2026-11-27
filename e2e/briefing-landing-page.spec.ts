import { test } from "@playwright/test";
import {
  mockBriefing,
  fillFullContact,
  continuar,
  stepContinue,
  pickOption,
  submitAndExpectSuccess,
} from "./helpers";

test("landing page: fluxo completo das 7 etapas", async ({ page }) => {
  await mockBriefing(page);
  await page.goto("/briefing/landing-page");

  // 1 — negócio
  await fillFullContact(page);
  await continuar(page);

  // 2 — objetivos (obrigatório)
  await page.getByRole("heading", { name: /Objetivos do projeto/ }).waitFor();
  await pickOption(page, "Divulgar meus serviços");
  await continuar(page);

  // 3-6 — opcionais
  await stepContinue(page, /Público-alvo/);
  await stepContinue(page, /Conteúdo e funcionalidades/);
  await stepContinue(page, /Identidade visual e referências/);
  await stepContinue(page, /Prazo e investimento/);

  // 7 — revisão + envio
  await submitAndExpectSuccess(page);
});

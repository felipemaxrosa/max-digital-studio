import { test } from "@playwright/test";
import {
  mockBriefing,
  fillFullContact,
  continuar,
  stepContinue,
  pickOption,
  submitAndExpectSuccess,
} from "./helpers";

test("projeto completo: fluxo completo das 9 etapas", async ({ page }) => {
  await mockBriefing(page);
  await page.goto("/briefing/projeto-completo");

  // 1 — negócio
  await fillFullContact(page);
  await continuar(page);

  // 2-4 — opcionais
  await stepContinue(page, /Essência e posicionamento da marca/);
  await stepContinue(page, /Público-alvo e objetivos/);
  await stepContinue(page, /Identidade e personalidade visual/);

  // 5 — objetivos da LP (obrigatório)
  await page.getByRole("heading", { name: /Objetivos da landing page/ }).waitFor();
  await pickOption(page, "Gerar contatos pelo WhatsApp");
  await continuar(page);

  // 6-8 — opcionais
  await stepContinue(page, /Conteúdo e funcionalidades/);
  await stepContinue(page, /Referências e materiais/);
  await stepContinue(page, /Prazo e investimento/);

  // 9 — revisão + envio
  await submitAndExpectSuccess(page);
});

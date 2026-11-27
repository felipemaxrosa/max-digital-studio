import { test } from "@playwright/test";
import { mockBriefing, fillFullContact, continuar, stepContinue, submitAndExpectSuccess } from "./helpers";

test("identidade visual: fluxo completo das 7 etapas", async ({ page }) => {
  await mockBriefing(page);
  await page.goto("/briefing/identidade-visual");

  // 1 — negócio
  await fillFullContact(page);
  await continuar(page);

  // 2-6 — todas opcionais
  await stepContinue(page, /Essência da marca/);
  await stepContinue(page, /Público e posicionamento/);
  await stepContinue(page, /Personalidade visual/);
  await stepContinue(page, /Aplicações da marca/);
  await stepContinue(page, /Prazo e investimento/);

  // 7 — revisão + envio
  await submitAndExpectSuccess(page);
});

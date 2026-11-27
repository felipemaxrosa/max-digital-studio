import { type Page, expect } from "@playwright/test";

/** Intercepta o POST do briefing — nenhum e-mail/DB real é tocado. */
export async function mockBriefing(page: Page) {
  await page.route("**/api/briefing", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ ok: true, protocol: "MDS-E2E99", persisted: true, emailed: false }),
    });
  });
}

/** Preenche a etapa 1 (contato completo) dos formulários longos. */
export async function fillFullContact(page: Page) {
  await expect(page.getByRole("heading", { name: /Vamos conhecer seu negócio/ })).toBeVisible();
  await page.getByLabel("Nome do responsável").fill("QA Playwright");
  await page.getByLabel("Nome da empresa ou marca").fill("Studio QA");
  await page.getByLabel("E-mail").fill("qa@example.com");
  await page.getByLabel("Telefone / WhatsApp").fill("11999990000");
  await page.getByRole("combobox", { name: "País" }).click();
  await page.getByRole("option", { name: "Brasil" }).click();
  await page.getByLabel("Segmento de atuação").fill("Teste");
  await page.getByLabel("Descrição do negócio").fill("Descrição de teste do negócio.");
}

export async function continuar(page: Page) {
  await page.getByRole("button", { name: /Continuar/ }).click();
}

/** Confere o título da etapa e avança. */
export async function stepContinue(page: Page, heading: RegExp) {
  await expect(page.getByRole("heading", { name: heading })).toBeVisible();
  await continuar(page);
}

/** Seleciona uma opção de checkbox/radio pelo texto do chip. */
export async function pickOption(page: Page, label: string) {
  await page.getByText(label, { exact: true }).click();
}

/** Na revisão: aceita a privacidade, envia e confirma o redirecionamento. */
export async function submitAndExpectSuccess(page: Page) {
  await expect(page.getByRole("heading", { name: /Revise antes de enviar/ })).toBeVisible();
  await page.getByLabel(/estou ciente/).check();
  await page.getByRole("button", { name: /Enviar briefing/ }).click();
  await expect(page).toHaveURL(/\/briefing\/sucesso/);
  await expect(page.getByText("MDS-E2E99")).toBeVisible();
  await expect(page.getByRole("heading", { name: /Recebemos seu briefing/ })).toBeVisible();
}

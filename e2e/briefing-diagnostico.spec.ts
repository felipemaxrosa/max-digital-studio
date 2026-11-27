import { test, expect } from "@playwright/test";

// Happy path do Diagnóstico. A rede do /api/briefing é mockada — nada externo
// é acessado e nenhum e-mail real é enviado.
test("diagnóstico: preenche, revisa e envia", async ({ page }) => {
  await page.route("**/api/briefing", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ ok: true, protocol: "MDS-E2E99", persisted: true, emailed: false }),
    });
  });

  await page.goto("/briefing/diagnostico");

  // Etapa 1 — contato
  await page.getByLabel("Nome do responsável").fill("QA Playwright");
  await page.getByLabel("Nome do negócio").fill("Studio QA");
  await page.getByLabel("E-mail").fill("qa@example.com");
  await page.getByLabel("WhatsApp").fill("11999990000");
  await page.getByLabel("País").selectOption("BR");
  await page.getByLabel("Segmento").fill("Teste");
  await page.getByRole("button", { name: /Continuar/ }).click();

  // Etapa 2 — presença digital
  await expect(page.getByRole("heading", { name: /Presença digital atual/ })).toBeVisible();
  await page.getByText("Meu negócio ainda não possui website").click();
  await page.getByRole("button", { name: /Continuar/ }).click();

  // Revisão + consentimento + envio
  await expect(page.getByRole("heading", { name: /Revise antes de enviar/ })).toBeVisible();
  await page.getByLabel(/estou ciente/).check();
  await page.getByRole("button", { name: /Solicitar avaliação gratuita/ }).click();

  // Confirmação
  await expect(page).toHaveURL(/\/briefing\/sucesso/);
  await expect(page.getByText("MDS-E2E99")).toBeVisible();
  await expect(page.getByRole("heading", { name: /Recebemos seu briefing/ })).toBeVisible();
});

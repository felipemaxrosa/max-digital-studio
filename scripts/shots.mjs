/**
 * Captura screenshots dos projetos do portfólio (author-time).
 * Rodar localmente: `pnpm dlx playwright install chromium && pnpm shots`.
 * Os PNGs vão para public/portfolio/ e SÃO commitados — o build da Vercel
 * NÃO roda este script.
 */
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const OUT = "public/portfolio";
mkdirSync(OUT, { recursive: true });

const PROJECTS = [
  { slug: "amanda-beauty", url: "https://amandadominguesbeauty.pt/" },
  { slug: "a-casa-barbearia", url: "https://a-casa-barbearia.vercel.app/" },
  { slug: "la-casa-pastel", url: "https://la-casa-de-pastel-caragua.vercel.app/" },
  { slug: "escolinha-encantada", url: "https://escolinha-encantada.vercel.app/" },
  { slug: "sol-music", url: "https://sol-music-chi.vercel.app/" },
  { slug: "musica-e-brasil", url: "https://musica-e-brasil.vercel.app/" },
];

const VIEWPORTS = {
  desktop: { width: 1440, height: 900, dsf: 1.5 },
  mobile: { width: 390, height: 844, dsf: 2 },
};

// Filtro opcional por slug: `pnpm shots amanda-beauty` regera só esse(s).
const only = process.argv.slice(2);
const targets = only.length ? PROJECTS.filter((p) => only.includes(p.slug)) : PROJECTS;

const browser = await chromium.launch();
for (const p of targets) {
  for (const [name, vp] of Object.entries(VIEWPORTS)) {
    const page = await browser.newPage({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: vp.dsf,
    });
    try {
      await page.goto(p.url, { waitUntil: "load", timeout: 60000 });
      await page.waitForTimeout(2500);
      await page.screenshot({ path: `${OUT}/${p.slug}-${name}.png` });
      console.log("ok", p.slug, name);
    } catch (e) {
      console.error("FAIL", p.slug, name, e.message);
    }
    await page.close();
  }
}
await browser.close();
console.log("done");

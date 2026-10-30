# Max Digital Studio

Site institucional do **Max Digital Studio** — estúdio de identidade visual e
landing pages de alta conversão. Multi-página, dark, com foco em performance e
WhatsApp como CTA primário.

🔗 Produção: `https://maxdigitalstudio.com.br` · 📩 `contato@maxdigitalstudio.com.br` · 📱 `@max.digitalstudio`

---

## Stack

- **Next.js 16** (App Router) + **React 19**
- **Tailwind CSS 4** (zero-config — tokens em `@theme` no `globals.css`)
- **TypeScript** · **pnpm** · deploy na **Vercel**
- **Resend** (e-mail do formulário) · **Playwright** (screenshots do portfólio, dev-time)

Requisitos: **Node ≥ 20.9** e **pnpm ≥ 10**.

---

## Rodando localmente

```bash
pnpm install
cp .env.example .env.local   # ajuste os valores
pnpm dev                     # http://localhost:3000
```

### Scripts

| Comando | O que faz |
|---|---|
| `pnpm dev` | Servidor de desenvolvimento |
| `pnpm build` | Build de produção |
| `pnpm start` | Sobe o build de produção |
| `pnpm lint` | ESLint |
| `pnpm shots` | Regera os screenshots do portfólio (ver abaixo) |

---

## Estrutura

```
src/
  app/
    (site)/            # páginas públicas (layout com navbar/footer/whatsapp)
      page.tsx         # HOME (8 dobras)
      portfolio/  sobre/  contato/
    api/proposta/      # backend do formulário
    layout.tsx  globals.css  robots.ts  sitemap.ts  opengraph-image.tsx
    icon.png  apple-icon.png
  components/
    layout/ ui/ sections/ form/ seo/ icons/ portfolio/
  lib/
    site.ts       # contatos, URL, WhatsApp  ← dados globais
    content.ts    # textos da Home (copy)
    pricing.ts    # pacotes e preços "a partir de"  ← EDITE AQUI os valores
    portfolio.ts  # cases por nicho + scores Lighthouse
    proposal.ts   # campos + validação do formulário
public/
  brand/           # logo (símbolo, lockup, glow)
  portfolio/       # screenshots dos 6 projetos (desktop + mobile, commitados)
scripts/shots.mjs  # pipeline de screenshots
brand-assets/      # arquivos de origem da identidade visual
```

---

## Onde editar o quê

- **Textos da Home** → `src/lib/content.ts`
- **Preços dos pacotes** → `src/lib/pricing.ts` (constantes `PRICE_FROM` no topo)
- **Projetos do portfólio** (nicho, desafio, solução, scores) → `src/lib/portfolio.ts`
- **Contatos / WhatsApp / redes** → `src/lib/site.ts`
- **Cores, fontes, animações** → `src/app/globals.css` (bloco `@theme`)

> Convenção: `globals.css` guarda só tokens/fontes/tipografia; os componentes
> são estilizados com classes Tailwind direto nas tags.

---

## Variáveis de ambiente

Veja `.env.example`. Em produção, configure na Vercel:

| Variável | Descrição |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL pública oficial (metadata, canonical, sitemap) |
| `NEXT_PUBLIC_WHATSAPP` | WhatsApp internacional, só dígitos, sem `+` |
| `CONTACT_TO_EMAIL` | Destino do formulário |
| `CONTACT_FROM_EMAIL` | Remetente (domínio verificado no Resend) |
| `RESEND_API_KEY` | Chave do Resend (opcional — sem ela, o formulário cai no WhatsApp) |

---

## Formulário "Monte sua proposta ideal"

- `POST /api/proposta` valida (com honeypot anti-spam) e, se `RESEND_API_KEY`
  estiver setada, envia o resumo por e-mail.
- **Nunca falha duro:** sem a chave ou em caso de erro, a UI oferece o envio
  pelo WhatsApp com a mensagem já preenchida — o lead não se perde.

---

## Portfólio (screenshots + performance)

Os mockups usam prints reais dos 6 sites, gerados localmente e **commitados**
em `public/portfolio/` (o build da Vercel não roda o Playwright).

```bash
pnpm dlx playwright install chromium   # 1ª vez
pnpm shots                             # regenera os 12 PNGs
```

Os scores Lighthouse exibidos nos cards estão em `src/lib/portfolio.ts`
(medidos em laboratório, mobile) — remeça quando atualizar os projetos.

---

## Deploy (Vercel)

1. Import do repositório `felipemaxrosa/max-digital-studio` na Vercel
   (Next.js e pnpm são detectados automaticamente — sem `vercel.json`).
2. Configure as variáveis de ambiente (tabela acima).
3. Adicione o domínio `maxdigitalstudio.com.br` e aponte o DNS.
4. (Para e-mail) verifique o domínio no Resend e use um `CONTACT_FROM_EMAIL`
   do domínio verificado.

---

Código proprietário © Max Digital Studio.

# Central de Briefings

Central de captação de briefings comerciais: um hub (`/briefing`) e quatro
formulários multi-step especializados. Cada submissão é validada, persistida de
forma durável (quando o banco está configurado) e notificada por e-mail.

## Rotas

| Rota | Tipo | Indexação |
|---|---|---|
| `/briefing` | Hub (Server Component) | `index, follow` + sitemap |
| `/briefing/landing-page` | Formulário (7 etapas) | `noindex, follow` |
| `/briefing/identidade-visual` | Formulário (7 etapas) | `noindex, follow` |
| `/briefing/projeto-completo` | Formulário (9 etapas) | `noindex, follow` |
| `/briefing/diagnostico` | Formulário (3 etapas) | `noindex, follow` |
| `/briefing/sucesso` | Confirmação (Client) | `noindex, follow` |
| `POST /api/briefing` | Route handler (nodejs) | — |

O segmento vive em `src/app/briefing/` (fora do grupo `(site)`) com chrome
enxuto próprio (`BriefingHeader`/`BriefingFooter`). O `noindex` é default do
layout; o hub sobrescreve para `index`.

## Arquitetura

Camada de domínio em `src/lib/briefing/` (dirige tudo a partir de UMA config):

- **`types.ts`** — tipos de config (FieldConfig/StepConfig/ServiceConfig), `Service`.
- **`content.ts`** — cópia centralizada (hub, privacidade, sucesso, listas de opções) + `PRIVACY_NOTICE_VERSION`, `SCHEMA_VERSION`, `DRAFT_VERSION`.
- **`steps.ts`** — configuração declarativa das etapas/campos por serviço (campos reaproveitados definidos uma vez). Perguntas condicionais via `visibleIf`.
- **`validation.ts`** — validação por etapa dirigida pela config (cliente).
- **`schemas.ts`** — Zod (servidor). O schema de respostas é **derivado** de `steps.ts`, então todo campo renderizado é aceito e lixo é descartado. Tipos inferidos (`z.infer`).
- **`summary.ts`** — agrupa/formata respostas (revisão, e-mail, WhatsApp).
- **`draft.ts`** — rascunho local (localStorage), **sem PII de contato**, expira em 7 dias.
- **`payload.ts`** — monta o payload do POST + lê UTMs/referrer sanitizados.
- **`store.ts`** — interface `BriefingStore` + adapter Neon + `generateProtocol()`.

Componentes em `src/components/briefing/`: `BriefingForm` (motor `useReducer`),
`field-renderer`, `stepper` (sidebar desktop + barra mobile), `BriefingReview`,
`privacy-notice`, `BriefingServiceCard`, `BriefingSuccess`, chrome e tracker.

As páginas (Server Components) passam apenas a string `service` ao `BriefingForm`
(Client), que resolve a config internamente — as funções `visibleIf` não cruzam a
fronteira RSC.

## Fluxo de submissão

1. Cliente valida tudo; monta `{schemaVersion, service, locale, answers, privacyNoticeVersion, privacyAccepted, marketingOptIn, source, idempotencyKey}` + honeypot `website`.
2. `POST /api/briefing`: limite de 64 KB → honeypot → Zod → normaliza → gera protocolo + timestamp → `store.save()` (se configurado) → Resend (interno + cliente).
3. **Honestidade:** responde `ok:true` apenas se **persistiu OU enviou e-mail**; senão `502 delivery_failed` e a UI mostra erro + fallback de WhatsApp (sem navegar para sucesso).
4. Sucesso → grava protocolo one-time em `sessionStorage`, limpa rascunho, `router.push('/briefing/sucesso')`. Acesso direto ao sucesso → estado neutro (nenhum dado em query string).

Idempotência: `idempotencyKey` único por sessão do formulário; o insert usa
`ON CONFLICT (idempotency_key) DO NOTHING` e devolve o protocolo original.

## Persistência (Neon / Postgres)

Atrás da interface `BriefingStore`. Sem `DATABASE_URL`, o store é `null` e o
briefing opera só por e-mail.

Setup:
1. Criar projeto grátis no [Neon](https://neon.tech) (ou adicionar via Vercel Marketplace, que define `DATABASE_URL`).
2. Aplicar a migração: `psql "$DATABASE_URL" -f db/migrations/0001_briefings.sql` (ou colar no SQL Editor do Neon).
3. Definir `DATABASE_URL` (connection string "pooled") no `.env.local` e na Vercel.

Tabela `briefings` com `status` default `briefing_received` (pipeline comercial §21),
`contact`/`payload`/`source` em `jsonb`, `idempotency_key` único.

## E-mail (Resend)

Reaproveita a integração existente. Variáveis: `RESEND_API_KEY`,
`CONTACT_FROM_EMAIL` (domínio verificado), `BRIEFING_TO_EMAIL` (default
`CONTACT_TO_EMAIL`). Templates em `src/lib/email.ts`:
`buildBriefingInternalHtml` (resumo completo) e `buildBriefingClientHtml`
(confirmação, sem promessa de prazo). Falha de e-mail não apaga o que já foi
persistido.

## Analytics

Eventos em `src/lib/analytics.ts` (`EVENTS.briefing*`), roteados por `track()`
(GA4 + Meta, consent-gated). **Sem PII** — só `service_type`, `step_number`,
`step_name`, `total_steps`, `error_code`. `briefing_submit_success` → Meta `Lead`.

## Rascunhos

`localStorage`, chave `mds-briefing-draft:v1:<service>`. Exclui o grupo de
contato (PII), expira em 7 dias, tudo em try/catch. Limpo após submissão.
Um banner oferece continuar/descartar quando há rascunho.

## Variáveis de ambiente

| Var | Server-only | Efeito se vazia |
|---|---|---|
| `DATABASE_URL` | sim (secreto) | sem persistência durável (só e-mail) |
| `RESEND_API_KEY` | sim (secreto) | sem e-mail (só persistência) |
| `BRIEFING_TO_EMAIL` | sim | usa `CONTACT_TO_EMAIL` |

Reaproveita `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL`, `NEXT_PUBLIC_WHATSAPP`,
`NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_META_PIXEL_ID`.

Com `DATABASE_URL` **e** `RESEND_API_KEY` vazios, uma submissão retorna `502`
(nada foi recebido de forma confiável) — comportamento proposital.

## Dev local atrás de proxy TLS (Netskope)

Nesta máquina o Netskope intercepta TLS com um CA próprio, então o Node rejeita a
conexão HTTPS com o Neon (`SELF_SIGNED_CERT_IN_CHAIN`). Produção (Vercel) não é
afetada. Para o `pnpm dev` e scripts falarem com o Neon localmente, aponte o CA:

```bash
# exporta o CA do Netskope uma vez
security find-certificate -a -e certadmin@netskope.com -p /Library/Keychains/System.keychain > "$HOME/.netskope-ca.pem"
# e use ao rodar dev / migração
NODE_EXTRA_CA_CERTS="$HOME/.netskope-ca.pem" pnpm dev
```

Aplicar/rodar migração sem psql: `NODE_EXTRA_CA_CERTS="$HOME/.netskope-ca.pem"
node --env-file=.env.local scripts/apply-migration.mjs db/migrations/0001_briefings.sql`.

## Testes

- `pnpm test` — Vitest (schemas, validação, rascunho, resumo, rota, e o fluxo do formulário).
- `pnpm test:e2e` — Playwright (`e2e/`), requer `pnpm exec playwright install chromium`.
- `pnpm typecheck`, `pnpm lint`, `pnpm build`.

## Limitações e pendências

- **Neon:** projeto + `DATABASE_URL` + migração são passos manuais (não há credenciais inventadas). Até lá: modo e-mail.
- **Jurídico:** texto de privacidade/retenção/base legal é neutro e precisa de validação (§23). `PRIVACY_NOTICE_VERSION` registra a versão aceita.
- **Rate limiting:** não implementado. Em serverless, usar Upstash/edge (não depender de memória). Honeypot + limite de payload + idempotência já aplicados.
- **CAPTCHA/Turnstile:** não configurado (opcional).
- **Uploads binários:** adiados — os formulários coletam links de referência (§16). Habilitar depois com Neon/armazenamento.
- **Saída acidental:** `beforeunload` cobre reload/fechar; navegação in-app não é interceptada (o autosave de rascunho protege o conteúdo não sensível).
- **pt-PT:** cópia centralizada, mas single-pt por ora.

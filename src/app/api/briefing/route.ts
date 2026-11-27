import { NextResponse } from "next/server";
import { validateBriefingPayload } from "@/lib/briefing/schemas";
import { getServiceConfig } from "@/lib/briefing/steps";
import type { Answers } from "@/lib/briefing/types";
import {
  groupedAnswers,
  extractContact,
  buildBriefingSummaryText,
} from "@/lib/briefing/summary";
import { getBriefingStore, generateProtocol } from "@/lib/briefing/store";
import { buildBriefingInternalHtml, buildBriefingClientHtml } from "@/lib/email";
import { isEmail } from "@/lib/proposal";

export const runtime = "nodejs";

const MAX_BYTES = 64 * 1024; // §24 limite de tamanho do payload

export async function POST(req: Request) {
  const text = await req.text().catch(() => null);
  if (text === null) return NextResponse.json({ ok: false }, { status: 400 });
  if (text.length > MAX_BYTES) {
    return NextResponse.json({ ok: false, error: "payload_too_large" }, { status: 413 });
  }

  let raw: Record<string, unknown>;
  try {
    raw = JSON.parse(text);
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // Honeypot: bot preencheu o campo oculto → finge sucesso e descarta.
  if (typeof raw.website === "string" && raw.website.trim()) {
    return NextResponse.json({ ok: true, protocol: generateProtocol(), persisted: false, emailed: false });
  }

  const result = validateBriefingPayload(raw);
  if (!result.ok) {
    return NextResponse.json({ ok: false, errors: result.errors }, { status: 422 });
  }

  const { value } = result;
  const config = getServiceConfig(value.service);
  if (!config) {
    return NextResponse.json({ ok: false, error: "unknown_service" }, { status: 422 });
  }

  const answers = value.answers as Answers;
  const contact = extractContact(value.service, answers);
  const protocol = generateProtocol();

  // 1) Persistência durável (se configurada). Idempotente por idempotencyKey.
  let persisted = false;
  let finalProtocol = protocol;
  const store = getBriefingStore();
  if (store) {
    try {
      const saved = await store.save({
        protocol,
        service: value.service,
        locale: value.locale,
        country: contact.pais || null,
        contact: {
          nome: contact.nome,
          email: contact.email,
          whatsapp: contact.whatsapp,
          empresa: contact.empresa,
        },
        payload: value.answers,
        source: value.source ?? {},
        privacyNoticeVersion: value.privacyNoticeVersion,
        idempotencyKey: value.idempotencyKey,
      });
      persisted = true;
      finalProtocol = saved.protocol;
    } catch (err) {
      // Não loga PII — só protocolo e serviço.
      console.error(
        `[briefing] persistência falhou (protocol=${protocol}, service=${value.service}):`,
        err instanceof Error ? err.message : err,
      );
    }
  }

  // 2) Notificações por e-mail (reutiliza Resend). Falha aqui não apaga o que
  //    já foi persistido; a confirmação depende de persistido OU enviado.
  let emailed = false;
  const key = process.env.RESEND_API_KEY;
  if (key) {
    const fromEmail = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";
    const from = fromEmail.includes("<") ? fromEmail : `Max Digital Studio <${fromEmail}>`;
    const to =
      process.env.BRIEFING_TO_EMAIL ||
      process.env.CONTACT_TO_EMAIL ||
      "contato@maxdigitalstudio.com.br";
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(key);
      const sections = groupedAnswers(value.service, answers);

      await resend.emails.send({
        from,
        to,
        replyTo: isEmail(contact.email) ? contact.email : undefined,
        subject: `Novo briefing recebido — ${config.label} — ${contact.empresa || contact.nome}`,
        text: buildBriefingSummaryText(config, answers),
        html: buildBriefingInternalHtml({
          serviceLabel: config.label,
          protocol: finalProtocol,
          receivedAt: new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" }),
          contact,
          sections,
        }),
      });
      emailed = true;

      // Confirmação ao cliente (se o e-mail for válido). Falha isolada.
      if (isEmail(contact.email)) {
        try {
          await resend.emails.send({
            from,
            to: contact.email,
            subject: "Recebemos seu briefing | Max Digital Studio",
            html: buildBriefingClientHtml({
              nome: contact.nome,
              serviceLabel: config.label,
              protocol: finalProtocol,
            }),
          });
        } catch (err) {
          console.error("[briefing] e-mail de confirmação ao cliente falhou:", err instanceof Error ? err.message : err);
        }
      }
    } catch (err) {
      console.error("[briefing] envio via Resend falhou:", err instanceof Error ? err.message : err);
    }
  }

  // 3) Honestidade (§17/§19): só é "recebido" com persistência OU entrega de e-mail.
  if (!persisted && !emailed) {
    return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true, protocol: finalProtocol, persisted, emailed });
}

import { NextResponse } from "next/server";
import { validateProposal, buildSummary, isEmail } from "@/lib/proposal";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let raw: Record<string, unknown>;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // Honeypot: bot preencheu campo oculto → finge sucesso e descarta.
  if (typeof raw.website === "string" && raw.website.trim()) {
    return NextResponse.json({ ok: true, emailed: false });
  }

  const result = validateProposal(raw);
  if (!result.ok) {
    return NextResponse.json({ ok: false, errors: result.errors }, { status: 422 });
  }

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || "contato@maxdigitalstudio.com.br";
  const from = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";

  // Sem chave configurada → o lead nunca se perde: a UI cai pro WhatsApp.
  if (!key) {
    console.warn("[proposta] RESEND_API_KEY ausente — pulando envio de e-mail.");
    return NextResponse.json({ ok: true, emailed: false });
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(key);
    const { value } = result;
    await resend.emails.send({
      from,
      to,
      replyTo: isEmail(value.contato) ? value.contato : undefined,
      subject: `Nova proposta — ${value.nome}`,
      text: buildSummary(value),
    });
    return NextResponse.json({ ok: true, emailed: true });
  } catch (err) {
    console.error("[proposta] falha no envio via Resend:", err);
    // Não falha duro: a UI oferece o fallback de WhatsApp.
    return NextResponse.json({ ok: true, emailed: false });
  }
}

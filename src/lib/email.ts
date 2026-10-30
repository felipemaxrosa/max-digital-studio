/**
 * Template HTML do e-mail de novo lead (server-only — não entra no bundle do cliente).
 * HTML "email-safe": tabelas + estilos inline, logo via URL absoluta.
 */
import { SITE } from "./site";
import { pacoteLabel, type ProposalInput } from "./proposal";

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function row(label: string, value: string): string {
  if (!value) return "";
  return `<tr>
    <td style="padding:11px 0;border-bottom:1px solid #eef1f5;font-size:13px;color:#8a93a1;width:42%;vertical-align:top;">${esc(label)}</td>
    <td style="padding:11px 0;border-bottom:1px solid #eef1f5;font-size:14px;color:#0b0d12;font-weight:600;vertical-align:top;">${esc(value)}</td>
  </tr>`;
}

export function buildEmailHtml(v: ProposalInput): string {
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.contato);
  const replyHref = isEmail
    ? `mailto:${v.contato}`
    : `https://wa.me/${v.contato.replace(/\D/g, "")}`;
  const replyLabel = isEmail ? "Responder por e-mail" : "Responder no WhatsApp";

  const rows = [
    row("Nome", v.nome),
    row("Contato", v.contato),
    row("Pacote de interesse", pacoteLabel(v.pacote)),
    row("Negócio / nicho", v.tipoNegocio),
    row("Objetivo principal", v.objetivo),
    row("Prazo desejado", v.prazo),
    row("Faixa de investimento", v.investimento),
  ].join("");

  const messageBlock = v.mensagem
    ? `<div style="margin-top:22px;">
         <div style="font-size:13px;color:#8a93a1;margin-bottom:6px;">Mensagem</div>
         <div style="font-size:14px;color:#0b0d12;line-height:1.6;background:#f4f6f9;border-radius:10px;padding:14px 16px;">${esc(v.mensagem).replace(/\n/g, "<br>")}</div>
       </div>`
    : "";

  return `<!doctype html>
<html lang="pt-BR"><body style="margin:0;padding:0;background:#0b0d12;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0b0d12;padding:24px 12px;font-family:Arial,Helvetica,sans-serif;">
<tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:100%;background:#ffffff;border-radius:16px;overflow:hidden;">
  <tr><td style="background:#090A0F;padding:26px 32px;" align="left">
    <img src="${SITE.url}/brand/logo-lockup.png" alt="Max Digital Studio" height="32" style="height:32px;display:block;border:0;" />
  </td></tr>
  <tr><td style="height:4px;background:#2563EB;background:linear-gradient(90deg,#2563EB,#38BDF8);font-size:0;line-height:0;">&nbsp;</td></tr>
  <tr><td style="padding:30px 32px;">
    <h1 style="margin:0 0 4px;font-size:20px;color:#0b0d12;">Nova proposta recebida 🎯</h1>
    <p style="margin:0 0 22px;font-size:14px;color:#5b6472;">Chegou um lead pelo formulário do site.</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows}</table>
    ${messageBlock}
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:26px;"><tr><td style="border-radius:10px;background:#2563EB;background:linear-gradient(90deg,#2563EB,#38BDF8);">
      <a href="${replyHref}" style="display:inline-block;padding:12px 26px;font-size:14px;font-weight:bold;color:#ffffff;text-decoration:none;">${replyLabel} &rarr;</a>
    </td></tr></table>
  </td></tr>
  <tr><td style="padding:16px 32px;background:#f4f6f9;color:#8a93a1;font-size:12px;" align="center">
    Enviado pelo site <a href="${SITE.url}" style="color:#2563EB;text-decoration:none;">maxdigitalstudio.com.br</a>
  </td></tr>
</table>
</td></tr>
</table>
</body></html>`;
}

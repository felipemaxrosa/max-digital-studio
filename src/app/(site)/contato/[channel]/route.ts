import { redirect, notFound } from 'next/navigation';
import { waLink, CONTACT_CHANNEL_MESSAGES, type ContactChannel } from '@/lib/site';

/**
 * Links de atribuição por rede social: /contato/<canal> redireciona (307)
 * para o WhatsApp com a mensagem que nomeia o canal de origem.
 * redirect()/notFound() lançam (NEXT_REDIRECT), então ficam fora de try/catch.
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ channel: string }> },
) {
  const { channel } = await params;
  const slug = channel.toLowerCase() as ContactChannel; // tolera maiúsculas no link
  const message = CONTACT_CHANNEL_MESSAGES[slug];

  if (!message) notFound(); // canal desconhecido → 404 do app

  redirect(waLink(message)); // 307 → https://wa.me/<num>?text=...
}

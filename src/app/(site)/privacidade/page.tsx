import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Como a Max Digital Studio coleta, usa e protege os seus dados — cookies, Google Analytics, Meta Pixel e os dados do formulário de contato.",
  alternates: { canonical: "/privacidade" },
};

export default function PrivacidadePage() {
  return (
    <section className="mx-auto max-w-[820px] px-4 sm:px-6 lg:px-8 py-20 md:py-28">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-cyan)]">
        Legal
      </p>
      <h1 className="mt-3 text-3xl font-bold md:text-4xl">Política de Privacidade</h1>
      <p className="mt-3 text-sm text-[var(--color-muted)]">
        Última atualização: outubro de 2026.
      </p>

      <div className="mt-10 flex flex-col gap-8 text-[var(--color-muted)] leading-relaxed [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-[var(--color-ink)] [&_a]:text-[var(--color-cyan)] [&_a]:underline [&_a]:underline-offset-2 [&_strong]:text-[var(--color-ink)]">
        <p>
          Esta política explica como a <strong>{SITE.name}</strong> trata os dados de quem
          visita <strong>{SITE.url.replace("https://", "")}</strong> ou entra em contato
          conosco. Levamos a sua privacidade a sério e seguimos a LGPD (Brasil) e o RGPD
          (Portugal/União Europeia).
        </p>

        <div className="flex flex-col gap-3">
          <h2>1. Quem é o responsável</h2>
          <p>
            A {SITE.name} é um estúdio digital de identidade visual e landing pages, com
            atendimento remoto. Responsável pelo tratamento dos dados — contato para
            qualquer assunto de privacidade:{" "}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h2>2. Quais dados coletamos</h2>
          <p>
            <strong>Dados que você nos fornece</strong> — ao preencher o formulário
            &quot;Monte sua proposta ideal&quot; ou ao falar conosco: nome, WhatsApp ou
            e-mail, tipo de negócio, objetivo, prazo, faixa de investimento (opcional) e a
            mensagem que você escrever.
          </p>
          <p>
            <strong>Dados de navegação</strong> — quando você consente com os cookies:
            páginas visitadas, origem do acesso, tipo de dispositivo e interações (cliques
            em botões), coletados via Google Analytics e Meta Pixel.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h2>3. Como usamos os dados</h2>
          <p>
            Usamos os dados de contato apenas para responder, elaborar propostas e prestar o
            serviço. Os dados de navegação servem para entender a audiência, melhorar o site
            e medir a eficácia de campanhas de marketing. Não vendemos os seus dados.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h2>4. Cookies e tecnologias de medição</h2>
          <p>
            Usamos <strong>Google Analytics (GA4)</strong> e <strong>Meta Pixel</strong>.
            Eles <strong>só são ativados após o seu consentimento</strong> no banner de
            cookies — se você recusar, nenhum desses cookies é carregado. Você pode mudar de
            ideia a qualquer momento limpando os dados do site no seu navegador.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h2>5. Com quem compartilhamos</h2>
          <p>
            Compartilhamos dados apenas com prestadores que viabilizam o serviço, como
            operadores: <strong>Google</strong> (Analytics), <strong>Meta</strong> (Pixel),
            <strong> Resend</strong> (envio do e-mail do formulário) e <strong>Vercel</strong>{" "}
            (hospedagem do site). Esses serviços podem processar dados fora do seu país,
            sempre sujeitos às respectivas políticas de proteção de dados.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h2>6. Base legal</h2>
          <p>
            Tratamos os dados de contato com base na execução de medidas pré-contratuais e no
            legítimo interesse de responder você. Os cookies de análise e marketing têm como
            base o <strong>seu consentimento</strong>.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h2>7. Seus direitos</h2>
          <p>
            Você pode solicitar acesso, correção, exclusão ou portabilidade dos seus dados,
            além de revogar o consentimento a qualquer momento. Para exercer qualquer
            direito, escreva para <a href={`mailto:${SITE.email}`}>{SITE.email}</a> — nós
            respondemos no menor prazo possível.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h2>8. Retenção</h2>
          <p>
            Guardamos os dados de contato apenas pelo tempo necessário para atender à sua
            solicitação e cumprir obrigações legais. Dados de navegação seguem os prazos de
            retenção do Google Analytics e da Meta.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h2>9. Alterações nesta política</h2>
          <p>
            Podemos atualizar esta política periodicamente. A data de &quot;última
            atualização&quot; no topo indica a versão vigente.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h2>10. Contato</h2>
          <p>
            Dúvidas sobre privacidade ou sobre os seus dados? Fale com a {SITE.name} em{" "}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
          </p>
        </div>
      </div>
    </section>
  );
}

"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useConsent } from "./ConsentProvider";

// ID do GA4 — pode ser sobrescrito por NEXT_PUBLIC_GA_ID; cai no padrão da conta.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-Z8NH8HTECB";

// Só carrega em produção (evita poluir as métricas com acessos de desenvolvimento).
const enabled = process.env.NODE_ENV === "production" && Boolean(GA_ID);

export function Analytics() {
  const pathname = usePathname();
  const { consent } = useConsent();
  const firstView = useRef(true);

  // Carrega só com consentimento aceito. O gtag('config') envia o page_view
  // inicial; aqui cuidamos das navegações SPA, pulando a 1ª execução.
  useEffect(() => {
    if (!enabled || consent !== "accepted") return;
    if (firstView.current) {
      firstView.current = false;
      return;
    }
    if (typeof window.gtag !== "function") return;
    window.gtag("event", "page_view", {
      page_path: pathname,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname, consent]);

  if (!enabled || consent !== "accepted") return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
      </Script>
    </>
  );
}

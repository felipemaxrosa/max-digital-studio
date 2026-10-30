"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

// ID do GA4 — pode ser sobrescrito por NEXT_PUBLIC_GA_ID; cai no padrão da conta.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-Z8NH8HTECB";

// Só carrega em produção (evita poluir as métricas com acessos de desenvolvimento).
const enabled = process.env.NODE_ENV === "production" && Boolean(GA_ID);

export function Analytics() {
  const pathname = usePathname();
  const firstView = useRef(true);

  // O gtag('config') já envia o page_view inicial; aqui cuidamos só das
  // navegações client-side (SPA do App Router), pulando a montagem.
  useEffect(() => {
    if (!enabled) return;
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
  }, [pathname]);

  if (!enabled) return null;

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

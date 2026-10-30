"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Controlador de scroll-reveal. Revela elementos [data-reveal] setando
 * data-revealed="true" (as transições vivem nas classes utilitárias do
 * SectionReveal). Re-observa a cada troca de rota (SPA não dispara `load`);
 * na carga inicial adia para o evento `load` para não disputar com a hidratação.
 */
export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    let io: IntersectionObserver | null = null;
    let raf = 0;

    const reveal = (el: Element) => el.setAttribute("data-revealed", "true");

    const run = () => {
      const els = Array.from(
        document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-revealed])"),
      );
      if (!els.length) return;
      const vh = window.innerHeight || document.documentElement.clientHeight || 0;
      const pending: HTMLElement[] = [];
      els.forEach((el) => {
        if (el.getBoundingClientRect().top < vh * 0.9) reveal(el);
        else pending.push(el);
      });
      if (!pending.length) return;
      if (!("IntersectionObserver" in window)) {
        pending.forEach(reveal);
        return;
      }
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              reveal(entry.target);
              io?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 },
      );
      pending.forEach((e) => io!.observe(e));
    };

    if (document.readyState === "complete") {
      raf = requestAnimationFrame(run);
    } else {
      window.addEventListener("load", run, { once: true });
    }

    return () => {
      io?.disconnect();
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("load", run);
    };
  }, [pathname]);

  return null;
}

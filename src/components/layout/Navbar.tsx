"use client";

import { useState } from "react";
import Link from "next/link";
import { LogoMark, Button } from "@/components/ui";
import { NAV } from "@/lib/content";
import { waLink, WA_MESSAGES } from "@/lib/site";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border-glass)] bg-[var(--color-obsidian)]/80 backdrop-blur-md">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2.5"
            aria-label="Max Digital Studio — Início"
          >
            <LogoMark id="nav" className="h-8 w-8" />
            <span className="flex flex-col leading-none">
              <span className="font-display text-lg font-bold tracking-tight text-[var(--color-ink)]">
                MAX
              </span>
              <span className="font-mono text-[0.55rem] uppercase tracking-[0.25em] text-[var(--color-muted)]">
                Digital Studio
              </span>
            </span>
          </Link>

          {/* Nav desktop */}
          <nav className="hidden items-center gap-7 md:flex" aria-label="Navegação principal">
            {NAV.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="text-sm font-medium text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* CTA desktop */}
          <div className="hidden md:block">
            <Button
              href={waLink(WA_MESSAGES.default)}
              variant="primary"
              size="sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              Iniciar Projeto →
            </Button>
          </div>

          {/* Toggle mobile */}
          <button
            className="rounded-md p-2 text-[var(--color-ink)] md:hidden"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
          >
            <span
              className="mb-1 block h-0.5 w-5 bg-current transition-transform"
              style={{ transform: open ? "rotate(45deg) translate(2px, 6px)" : undefined }}
            />
            <span
              className="mb-1 block h-0.5 w-5 bg-current transition-opacity"
              style={{ opacity: open ? 0 : 1 }}
            />
            <span
              className="block h-0.5 w-5 bg-current transition-transform"
              style={{ transform: open ? "rotate(-45deg) translate(2px, -6px)" : undefined }}
            />
          </button>
        </div>

        {/* Nav mobile */}
        {open && (
          <nav
            className="flex flex-col gap-1 border-t border-[var(--color-border-glass)] pt-3 pb-4 md:hidden"
            aria-label="Navegação mobile"
          >
            {NAV.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="py-2 text-base font-medium text-[var(--color-ink)] transition-colors hover:text-[var(--color-cyan)]"
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            ))}
            <Button
              href={waLink(WA_MESSAGES.default)}
              variant="primary"
              size="md"
              className="mt-3 w-full justify-center"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
            >
              Iniciar Projeto →
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
}

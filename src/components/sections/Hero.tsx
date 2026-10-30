import { Button, TechBadge, RadialGlow, LogoMark } from "@/components/ui";
import { HERO } from "@/lib/content";
import { waLink, WA_MESSAGES } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Atmosfera — glows radiais */}
      <RadialGlow
        className="-top-32 left-1/2 h-[560px] w-[560px] -translate-x-1/2"
        color="rgba(37,99,235,0.28)"
      />
      <RadialGlow
        className="top-24 -right-24 h-[420px] w-[420px]"
        color="rgba(56,189,248,0.16)"
      />

      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
          {/* Texto */}
          <div className="flex flex-col items-start gap-6">
            <TechBadge dot>{HERO.eyebrow}</TechBadge>

            <h1 className="text-4xl font-bold leading-[1.05] text-balance sm:text-5xl lg:text-6xl">
              {HERO.titleLead}
              <span className="bg-[linear-gradient(90deg,#2563EB,#38BDF8)] bg-clip-text text-transparent">
                {HERO.titleAccent}
              </span>
            </h1>

            <p className="max-w-xl text-base leading-relaxed text-[var(--color-muted)] text-pretty md:text-lg">
              {HERO.subtitle}
            </p>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Button
                href={waLink(WA_MESSAGES.hero)}
                variant="primary"
                size="lg"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                {HERO.ctaPrimary} →
              </Button>
              <Button href="/#vitrine" variant="glass" size="lg" className="w-full sm:w-auto">
                {HERO.ctaSecondary} ↓
              </Button>
            </div>

            <ul className="flex flex-col flex-wrap gap-x-6 gap-y-2 pt-2 sm:flex-row">
              {HERO.proofs.map((p) => (
                <li
                  key={p}
                  className="flex items-center gap-2 font-mono text-xs text-[var(--color-muted)]"
                >
                  <span className="text-[var(--color-cyan)]" aria-hidden>
                    ✓
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>

          {/* Logo animado em painel de vidro */}
          <div className="relative flex items-center justify-center">
            <div className="relative aspect-square w-full max-w-sm rounded-[var(--radius-card)] border border-[var(--color-border-glass)] bg-gradient-to-b from-white/[0.05] to-transparent p-12 backdrop-blur-sm">
              <RadialGlow
                className="inset-0 m-auto h-[65%] w-[65%] motion-safe:animate-glow"
                color="rgba(56,189,248,0.4)"
              />
              <LogoMark
                id="hero"
                className="h-full w-full drop-shadow-[0_0_45px_rgba(56,189,248,0.4)] motion-safe:animate-float"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

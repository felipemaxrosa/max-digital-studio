import { Button, TechBadge, RadialGlow, PhoneMockup } from "@/components/ui";
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

          {/* Showcase 3D — projetos em telemóveis inclinados */}
          <div className="relative flex items-center justify-center">
            <RadialGlow
              className="right-0 top-1/2 h-[400px] w-[400px] -translate-y-1/2 motion-safe:animate-glow"
              color="rgba(37,99,235,0.42)"
            />
            <RadialGlow
              className="bottom-4 left-4 h-52 w-52"
              color="rgba(56,189,248,0.22)"
            />
            <div className="relative mx-auto h-[440px] w-full max-w-md [perspective:1400px]">
              {/* telemóvel de trás */}
              <div className="absolute left-0 top-[10%] w-[46%] [transform:rotateY(-22deg)_rotateX(8deg)]">
                <div className="motion-safe:animate-float" style={{ animationDelay: "0.9s" }}>
                  <PhoneMockup
                    src="/portfolio/sol-music-mobile.png"
                    alt="Projeto Sol Music em dispositivo móvel"
                  />
                </div>
              </div>
              {/* telemóvel da frente */}
              <div className="absolute right-0 top-[22%] w-[52%] [transform:rotateY(-22deg)_rotateX(8deg)]">
                <div className="motion-safe:animate-float">
                  <PhoneMockup
                    src="/portfolio/amanda-beauty-mobile.png"
                    alt="Projeto Amanda Domingues Beauty Studio em dispositivo móvel"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

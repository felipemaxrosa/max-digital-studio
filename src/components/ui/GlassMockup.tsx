import Image from "next/image";

/** Mockup flutuante em vidro: screenshot num frame de navegador com sombra profunda. */
type Props = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
};

export function GlassMockup({ src, alt, className = "", priority = false }: Props) {
  return (
    <div
      className={`overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border-glass)] bg-[var(--color-slate-2)] shadow-[0_24px_60px_-24px_rgba(0,0,0,0.8)] ${className}`}
    >
      {/* Barra de navegador */}
      <div className="flex items-center gap-1.5 border-b border-[var(--color-border-glass)] px-3 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
      </div>
      <Image
        src={src}
        alt={alt}
        width={1440}
        height={900}
        sizes="(max-width: 768px) 100vw, 420px"
        priority={priority}
        className="h-auto w-full"
      />
    </div>
  );
}

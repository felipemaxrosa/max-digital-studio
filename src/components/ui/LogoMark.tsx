import Image from "next/image";

/**
 * LogoMark — símbolo "M" oficial da Max Digital Studio (PNG com fundo removido).
 * Dimensione pela altura via className (ex.: "h-7 w-auto"); o glow/float são
 * aplicados pelo pai com utilitários Tailwind (drop-shadow + motion-safe:animate-float).
 */
type Props = {
  className?: string;
  priority?: boolean;
  alt?: string;
};

// Proporção intrínseca do arquivo public/brand/logo-symbol.png
const W = 781;
const H = 606;

export function LogoMark({ className, priority = false, alt = "Max Digital Studio" }: Props) {
  return (
    <Image
      src="/brand/logo-symbol.png"
      alt={alt}
      width={W}
      height={H}
      priority={priority}
      className={className}
    />
  );
}

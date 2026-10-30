/**
 * LogoMark — símbolo "M" da Max Digital Studio em SVG inline.
 * Vetor nítido em qualquer densidade; o gradiente azul→cyan é a assinatura
 * de energia da marca. O glow/float são aplicados pelo componente pai via
 * utilitários Tailwind (ex.: drop-shadow + motion-safe:animate-float).
 *
 * `id` deve ser único por instância na página (ids de gradiente SVG são globais).
 */
type Props = {
  id?: string;
  className?: string;
  title?: string;
};

export function LogoMark({ id = "mds", className, title = "Max Digital Studio" }: Props) {
  const grad = `${id}-grad`;
  const edge = `${id}-edge`;

  return (
    <svg
      viewBox="0 0 128 128"
      role="img"
      aria-label={title}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={grad} x1="0" y1="0.1" x2="1" y2="0.9">
          <stop offset="0" stopColor="#38BDF8" />
          <stop offset="0.5" stopColor="#3B82F6" />
          <stop offset="1" stopColor="#2563EB" />
        </linearGradient>
        <linearGradient id={edge} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7DD3FC" stopOpacity="0.9" />
          <stop offset="0.4" stopColor="#7DD3FC" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Silhueta do "M" — duas pernas + vale central com recorte interno */}
      <path
        d="M12 112 V24 H34 L64 72 L94 24 H116 V112 H94 V58 L72 92 H56 L34 58 V112 Z"
        fill={`url(#${grad})`}
      />
      {/* Brilho sutil nas bordas superiores (dá a sensação de ribbon 3D) */}
      <path
        d="M12 24 H34 L64 72 L94 24 H116 V33 H98 L64 86 L30 33 H12 Z"
        fill={`url(#${edge})`}
      />
    </svg>
  );
}

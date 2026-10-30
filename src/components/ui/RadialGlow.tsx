/**
 * Glow radial decorativo (atmosfera). Posicionado/dimensionado pelo pai via
 * className (ex.: "top-0 left-1/2 h-[520px] w-[520px] -translate-x-1/2").
 * Puramente decorativo: aria-hidden + pointer-events-none.
 */
type Props = {
  className?: string;
  color?: string;
};

export function RadialGlow({
  className = "",
  color = "rgba(37,99,235,0.28)",
}: Props) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute -z-10 rounded-full blur-[100px] ${className}`}
      style={{ background: `radial-gradient(circle, ${color}, transparent 70%)` }}
    />
  );
}

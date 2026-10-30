/**
 * Card — superfície de vidro (bento) com hover border-glow opcional.
 * Base para os cards de dor, blocos do método e grid de cases.
 */
type Props = {
  children: React.ReactNode;
  className?: string;
  /** desliga o efeito de hover (ex.: cards estáticos) */
  glow?: boolean;
};

export function Card({ children, className = "", glow = true }: Props) {
  const hover = glow
    ? "transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-[color:color-mix(in_srgb,var(--color-accent)_55%,transparent)] hover:shadow-[var(--shadow-glow)]"
    : "";
  return (
    <div
      className={`rounded-[var(--radius-card)] border border-[var(--color-border-glass)] bg-[var(--color-slate)]/60 p-6 ${hover} ${className}`}
    >
      {children}
    </div>
  );
}

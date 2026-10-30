/** Selo técnico em monospace — ex.: [ ESTRATÉGIA + DESIGN + ENGENHARIA ] */
type Props = {
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
};

export function TechBadge({ children, className = "", dot = false }: Props) {
  return (
    <span
      className={`inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-[var(--color-muted)] border border-[var(--color-border-glass)] rounded-full px-3 py-1.5 ${className}`}
    >
      {dot && (
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-cyan)] shadow-[0_0_8px_var(--color-cyan)]" />
      )}
      {children}
    </span>
  );
}

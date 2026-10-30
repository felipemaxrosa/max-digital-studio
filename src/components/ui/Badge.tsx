/** Pílula genérica para rótulos (ex.: nicho, "Carro-Chefe"). */
type Props = {
  children: React.ReactNode;
  className?: string;
};

export function Badge({ children, className = "" }: Props) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${className}`}
    >
      {children}
    </span>
  );
}

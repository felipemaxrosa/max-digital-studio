/**
 * Wrapper de scroll-reveal. Começa invisível/deslocado e é revelado pelo
 * controlador client `ScrollReveal`, que alterna data-revealed="true".
 * Respeita prefers-reduced-motion via variante motion-reduce (aparece já pronto).
 * É um Server Component — apenas marcação; a lógica roda no controlador.
 */
type Props = {
  children: React.ReactNode;
  className?: string;
  /** atraso em ms para efeito escalonado */
  delay?: number;
};

export function SectionReveal({ children, className = "", delay = 0 }: Props) {
  return (
    <div
      data-reveal
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={`opacity-0 translate-y-5 transition-[opacity,transform] duration-700 ease-out data-[revealed=true]:opacity-100 data-[revealed=true]:translate-y-0 motion-reduce:opacity-100 motion-reduce:translate-y-0 motion-reduce:transition-none ${className}`}
    >
      {children}
    </div>
  );
}

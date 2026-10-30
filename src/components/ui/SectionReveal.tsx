/**
 * Wrapper de scroll-reveal. Começa escondido/deslocado e é revelado pelo
 * controlador client `ScrollReveal`, que alterna data-revealed="true".
 * Respeita prefers-reduced-motion (aparece já pronto, sem transição).
 * É um Server Component — apenas marcação; a lógica roda no controlador.
 */
type Variant = "up" | "left" | "right" | "scale";

const hidden: Record<Variant, string> = {
  up: "opacity-0 translate-y-10",
  left: "opacity-0 -translate-x-12",
  right: "opacity-0 translate-x-12",
  scale: "opacity-0 scale-95",
};

const shown: Record<Variant, string> = {
  up: "data-[revealed=true]:opacity-100 data-[revealed=true]:translate-y-0",
  left: "data-[revealed=true]:opacity-100 data-[revealed=true]:translate-x-0",
  right: "data-[revealed=true]:opacity-100 data-[revealed=true]:translate-x-0",
  scale: "data-[revealed=true]:opacity-100 data-[revealed=true]:scale-100",
};

type Props = {
  children: React.ReactNode;
  className?: string;
  /** atraso em ms para efeito escalonado */
  delay?: number;
  /** direção/estilo do reveal */
  variant?: Variant;
};

export function SectionReveal({ children, className = "", delay = 0, variant = "up" }: Props) {
  return (
    <div
      data-reveal
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={`${hidden[variant]} transition-[opacity,transform] duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[opacity,transform] ${shown[variant]} motion-reduce:translate-x-0 motion-reduce:translate-y-0 motion-reduce:scale-100 motion-reduce:opacity-100 motion-reduce:transition-none ${className}`}
    >
      {children}
    </div>
  );
}

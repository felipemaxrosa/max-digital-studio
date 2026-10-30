import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import Link from "next/link";

type Variant = "primary" | "glass" | "ghost" | "whatsapp";
type Size = "sm" | "md" | "lg";

interface ButtonBaseProps {
  variant?: Variant;
  size?: Size;
}

type ButtonProps = ButtonBaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };
type LinkProps = ButtonBaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
type Props = ButtonProps | LinkProps;

const variantStyles: Record<Variant, string> = {
  // CTA principal — gradiente de assinatura azul→cyan
  primary:
    "text-white bg-[linear-gradient(90deg,#2563EB,#38BDF8)] shadow-[0_0_30px_-8px_rgba(37,99,235,0.6)] hover:brightness-110 hover:shadow-[0_0_44px_-6px_rgba(56,189,248,0.6)]",
  // Secundário — vidro com borda que brilha no hover
  glass:
    "text-[var(--color-ink)] border border-[var(--color-border-glass)] bg-white/[0.03] backdrop-blur-sm hover:border-[var(--color-accent)] hover:bg-white/[0.06]",
  // Terciário — texto
  ghost:
    "text-[var(--color-muted)] hover:text-[var(--color-ink)] underline underline-offset-4 decoration-[var(--color-border-glass)] hover:decoration-[var(--color-cyan)]",
  // WhatsApp — verde da marca do WhatsApp
  whatsapp:
    "text-[#06130b] font-semibold bg-[#25D366] hover:bg-[#1FBE59] shadow-[0_0_30px_-10px_rgba(37,211,102,0.7)]",
};

const sizeStyles: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-[0.95rem]",
  lg: "px-7 py-3.5 text-base",
};

const base =
  "inline-flex items-center justify-center gap-2 font-sans font-medium rounded-xl transition-[filter,background-color,border-color,box-shadow,color] duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-cyan)] focus-visible:outline-offset-3 disabled:opacity-50 disabled:cursor-not-allowed";

export function Button({ variant = "primary", size = "md", ...props }: Props) {
  const className = `${base} ${variantStyles[variant]} ${sizeStyles[size]} ${
    (props as ButtonBaseProps & { className?: string }).className ?? ""
  }`;

  if ("href" in props && props.href) {
    const { href, variant: _v, size: _s, className: _c, ...rest } = props as LinkProps;
    // Links externos (wa.me, http) usam <a> nativo; internos usam <Link>.
    const external = /^https?:\/\//.test(href) || href.startsWith("tel:") || href.startsWith("mailto:");
    if (external) {
      return <a href={href} className={className} {...rest} />;
    }
    return <Link href={href} className={className} {...rest} />;
  }

  const { variant: _v, size: _s, className: _c, ...rest } = props as ButtonProps;
  return <button className={className} {...rest} />;
}

import { TechBadge } from "./TechBadge";

type Props = {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className = "",
}: Props) {
  const alignCls =
    align === "center"
      ? "items-center text-center mx-auto max-w-2xl"
      : "items-start text-left";
  return (
    <div className={`flex flex-col gap-4 ${alignCls} ${className}`}>
      {eyebrow && <TechBadge dot>{eyebrow}</TechBadge>}
      <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className="text-[var(--color-muted)] text-base md:text-lg leading-relaxed text-pretty">
          {subtitle}
        </p>
      )}
    </div>
  );
}

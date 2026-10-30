import Image from "next/image";

/** Moldura de smartphone com screenshot mobile de um projeto. */
type Props = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
};

export function PhoneMockup({ src, alt, className = "", priority = false }: Props) {
  return (
    <div
      className={`relative rounded-[1.9rem] border border-white/10 bg-[#05070c] p-1.5 shadow-[0_40px_90px_-24px_rgba(0,0,0,0.95)] ${className}`}
    >
      <div className="relative overflow-hidden rounded-[1.5rem]">
        {/* notch */}
        <span className="absolute left-1/2 top-2 z-10 h-1.5 w-10 -translate-x-1/2 rounded-full bg-black/70 ring-1 ring-white/10" />
        <Image
          src={src}
          alt={alt}
          width={390}
          height={844}
          sizes="(max-width: 768px) 45vw, 230px"
          priority={priority}
          className="h-auto w-full"
        />
      </div>
    </div>
  );
}

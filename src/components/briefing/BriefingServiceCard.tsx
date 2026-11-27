import { MonitorSmartphone, PenTool, Layers, ScanSearch } from "lucide-react";
import { Card, Button } from "@/components/ui";
import { EVENTS } from "@/lib/analytics";
import type { ServiceCardData } from "@/lib/briefing/content";

const ICONS = { MonitorSmartphone, PenTool, Layers, ScanSearch } as const;

export function BriefingServiceCard({ card }: { card: ServiceCardData }) {
  const Icon = ICONS[card.icon];
  return (
    <Card
      glow
      className={
        card.featured
          ? "border-[color:color-mix(in_srgb,var(--color-accent)_55%,var(--color-border-glass))]"
          : ""
      }
    >
      <div className="flex h-full flex-col">
        <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-slate-2)] text-[var(--color-accent-alt)]">
          <Icon className="h-5 w-5" aria-hidden />
        </div>
        <h3 className="text-lg font-semibold text-[var(--color-ink)]">{card.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">{card.description}</p>

        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[var(--color-muted)]">
          <span>Tempo estimado: {card.estimate}</span>
          {card.note && (
            <span className="font-medium text-[var(--color-accent-alt)]">{card.note}</span>
          )}
        </div>

        <div className="mt-auto pt-6">
          <Button
            href={card.href}
            variant={card.featured ? "primary" : "glass"}
            size="md"
            className="w-full justify-center"
            event={EVENTS.briefingServiceSelected}
            eventParams={{ service_type: card.service }}
          >
            {card.cta} →
          </Button>
        </div>
      </div>
    </Card>
  );
}

import type { Metadata } from "next";
import { BriefingForm } from "@/components/briefing";

export const metadata: Metadata = {
  title: "Briefing — Diagnóstico de Presença Digital",
  description: "Solicite uma avaliação inicial gratuita da sua presença digital.",
};

export default function DiagnosticoBriefing() {
  return (
    <div className="mx-auto max-w-[1100px] px-4 py-12 sm:px-6 md:py-16 lg:px-8">
      <BriefingForm service="diagnostico" />
    </div>
  );
}

import type { Metadata } from "next";
import { BriefingForm } from "@/components/briefing";

export const metadata: Metadata = {
  title: "Briefing — Projeto Completo",
  description: "Identidade visual e landing page conectadas aos mesmos objetivos.",
};

export default function ProjetoCompletoBriefing() {
  return (
    <div className="mx-auto max-w-[1100px] px-4 py-12 sm:px-6 md:py-16 lg:px-8">
      <BriefingForm service="projeto-completo" />
    </div>
  );
}

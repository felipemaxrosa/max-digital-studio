import type { Metadata } from "next";
import { BriefingForm } from "@/components/briefing";

export const metadata: Metadata = {
  title: "Briefing — Identidade Visual",
  description: "Conte sobre a essência da sua marca para desenvolvermos sua identidade visual.",
};

export default function IdentidadeVisualBriefing() {
  return (
    <div className="mx-auto max-w-[1100px] px-4 py-12 sm:px-6 md:py-16 lg:px-8">
      <BriefingForm service="identidade-visual" />
    </div>
  );
}

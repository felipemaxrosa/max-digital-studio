import type { Metadata } from "next";
import { BriefingForm } from "@/components/briefing";

export const metadata: Metadata = {
  title: "Briefing — Landing Page",
  description: "Conte sobre seu negócio para desenvolvermos sua landing page.",
};

export default function LandingPageBriefing() {
  return (
    <div className="mx-auto max-w-[1100px] px-4 py-12 sm:px-6 md:py-16 lg:px-8">
      <BriefingForm service="landing-page" />
    </div>
  );
}

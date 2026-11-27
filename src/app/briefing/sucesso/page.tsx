import type { Metadata } from "next";
import { BriefingSuccess } from "@/components/briefing";

export const metadata: Metadata = {
  title: "Briefing enviado",
};

export default function BriefingSucessoPage() {
  return (
    <div className="mx-auto max-w-[1100px] px-4 py-20 sm:px-6 md:py-28 lg:px-8">
      <BriefingSuccess />
    </div>
  );
}

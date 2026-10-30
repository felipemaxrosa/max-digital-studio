import type { Metadata } from "next";
import {
  Hero,
  Conflict,
  Method,
  PortfolioShowcase,
  Process,
  Pricing,
  Founder,
  Faq,
  FinalCta,
} from "@/components/sections";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: {
    absolute:
      "Max Digital Studio — Identidade Visual & Landing Pages de Alta Conversão",
  },
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <JsonLd />
      <Hero />
      <Conflict />
      <Method />
      <PortfolioShowcase />
      <Process />
      <Pricing />
      <Founder />
      <Faq />
      <FinalCta />
    </>
  );
}

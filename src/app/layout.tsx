import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";
import { Analytics } from "@/components/Analytics";
import { MetaPixel } from "@/components/MetaPixel";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    template: "%s · Max Digital Studio",
    default: "Max Digital Studio — Identidade Visual & Landing Pages de Alta Conversão",
  },
  description: SITE.description,
  openGraph: {
    siteName: SITE.name,
    title: "Max Digital Studio — Identidade Visual & Landing Pages",
    description: SITE.description,
    locale: "pt_BR",
    type: "website",
    url: SITE.url,
  },
  twitter: {
    card: "summary_large_image",
    title: "Max Digital Studio — Identidade Visual & Landing Pages",
    description: SITE.description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${geist.variable} ${inter.variable} ${geistMono.variable}`}
    >
      {/* suppressHydrationWarning: extensões de browser injetam atributos no
          <body> antes da hidratação, causando mismatch benigno. */}
      <body suppressHydrationWarning>
        {children}
        <Analytics />
        <MetaPixel />
      </body>
    </html>
  );
}

import { SITE } from "@/lib/site";

/** Dados estruturados (ProfessionalService) para a Home e o Contato. */
export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE.name,
    description: SITE.description,
    url: SITE.url,
    email: SITE.email,
    image: `${SITE.url}/brand/logo-glow.png`,
    areaServed: "BR",
    priceRange: "$$",
    sameAs: [SITE.social.instagram],
    founder: { "@type": "Person", name: SITE.founder },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      url: `${SITE.url}/contato`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

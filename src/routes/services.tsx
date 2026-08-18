import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/layout/PageHero";
import { ServiceShowcase } from "@/components/sections/services/ServiceShowcase";
import { CTASection } from "@/components/sections/home/CTASection";
import { Process } from "@/components/sections/home/Process";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services & Capabilities — Nexora" },
      {
        name: "description",
        content:
          "Branding, high-performance web systems, custom SaaS, mobile apps, AI automation, and performance marketing — Nexora's practice areas.",
      },
      { property: "og:title", content: "Services & Capabilities — Nexora" },
      {
        property: "og:description",
        content:
          "Integrated growth capabilities engineered as one system: brand, software, AI automation and performance marketing.",
      },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Capabilities & Services"
        title={
          <>
            Integrated growth capabilities.{" "}
            <span className="text-gradient-primary italic">One accountable system.</span>
          </>
        }
        lead="Modular practices engineered to operate independently or compound as an end-to-end growth system."
      />
      <ServiceShowcase />
      <Process />
      <CTASection />
    </>
  );
}

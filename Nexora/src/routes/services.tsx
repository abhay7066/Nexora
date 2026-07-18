import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/layout/PageHero";
import { Solutions } from "@/components/sections/home/Solutions";
import { CTASection } from "@/components/sections/home/CTASection";
import { Process } from "@/components/sections/home/Process";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Nexora" },
      {
        name: "description",
        content:
          "Branding, websites, custom software, mobile apps, AI automation, performance marketing and consulting — Nexora's seven practice areas.",
      },
      { property: "og:title", content: "Services — Nexora" },
      {
        property: "og:description",
        content:
          "Seven practice areas engineered as one growth system: brand, software, AI automation and marketing.",
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
        eyebrow="Services"
        title={
          <>
            Seven practice areas.{" "}
            <span className="text-gradient-primary italic">One growth system.</span>
          </>
        }
        lead="Strong practices individually — compounding in combination. Engage one, or engage the system."
      />
      <Solutions />
      <Process />
      <CTASection />
    </>
  );
}

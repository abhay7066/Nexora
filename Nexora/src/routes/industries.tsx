import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/layout/PageHero";
import { IndustriesSection } from "@/components/sections/home/IndustriesSection";
import { CTASection } from "@/components/sections/home/CTASection";

export const Route = createFileRoute("/industries")({
  head: () => ({
    meta: [
      { title: "Industries — Nexora" },
      {
        name: "description",
        content:
          "Nexora partners with manufacturing, real estate, healthcare, D2C, startups and SMEs to build long-term growth systems.",
      },
      { property: "og:title", content: "Industries — Nexora" },
      {
        property: "og:description",
        content: "The industries we build long-term growth systems for.",
      },
      { property: "og:url", content: "/industries" },
    ],
    links: [{ rel: "canonical", href: "/industries" }],
  }),
  component: IndustriesPage,
});

function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title={
          <>
            Built for the businesses{" "}
            <span className="text-gradient-primary italic">shaping tomorrow.</span>
          </>
        }
        lead="Deep expertise across the sectors where brand, software and automation compound the fastest."
      />
      <IndustriesSection />
      <CTASection />
    </>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/layout/PageHero";
import { CTASection } from "@/components/sections/home/CTASection";
import { WhyNexora } from "@/components/sections/home/WhyNexora";
import { Process } from "@/components/sections/home/Process";
import { StorySection } from "@/components/sections/about/StorySection";
import { ValuesSection } from "@/components/sections/about/ValuesSection";
import { StatsSection } from "@/components/sections/about/StatsSection";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Nexora" },
      {
        name: "description",
        content:
          "Nexora is an AI-powered business growth company. Meet the operators behind the work.",
      },
      { property: "og:title", content: "About — Nexora" },
      {
        property: "og:description",
        content:
          "An AI-powered growth partner built by operators — brand, software, automation and marketing under one roof.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Nexora"
        title={
          <>
            Operators, not vendors.{" "}
            <span className="text-gradient-primary italic">Partners, not projects.</span>
          </>
        }
        lead="We were tired of watching great businesses stall because their branding, software, marketing and automation lived in four different rooms. Nexora exists to put them in one."
      />
      <StatsSection />
      <StorySection />
      <ValuesSection />
      <WhyNexora />
      <Process />
      <CTASection />
    </>
  );
}

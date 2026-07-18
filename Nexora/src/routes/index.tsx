import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/sections/home/Hero";
import { GrowthChallenge } from "@/components/sections/home/GrowthChallenge";
import { BusinessStruggle } from "@/components/sections/home/BusinessStruggle";
import { WhyNexora } from "@/components/sections/home/WhyNexora";
import { GrowthFramework } from "@/components/sections/home/GrowthFramework";
import { IndustriesSection } from "@/components/sections/home/IndustriesSection";
import { Solutions } from "@/components/sections/home/Solutions";
import { FeaturedWork } from "@/components/sections/home/FeaturedWork";
import { Process } from "@/components/sections/home/Process";
import { Testimonials } from "@/components/sections/home/Testimonials";
import { InsightsSection } from "@/components/sections/home/InsightsSection";
import { CTASection } from "@/components/sections/home/CTASection";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Hero />
      <GrowthChallenge />
      <BusinessStruggle />
      <WhyNexora />
      <GrowthFramework />
      <IndustriesSection />
      <Solutions />
      <FeaturedWork />
      <Process />
      <Testimonials />
      <InsightsSection />
      <CTASection />
    </>
  );
}

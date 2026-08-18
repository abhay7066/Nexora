import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/sections/home/Hero";
import { GrowthChallenge } from "@/components/sections/home/GrowthChallenge";
import { WhyNexora } from "@/components/sections/home/WhyNexora";
import { CapabilitiesOverview } from "@/components/sections/home/CapabilitiesOverview";
import { FoundationalCommitments } from "@/components/sections/home/FoundationalCommitments";
import { CTASection } from "@/components/sections/home/CTASection";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Hero />
      <GrowthChallenge />
      <WhyNexora />
      <CapabilitiesOverview />
      <FoundationalCommitments />
      <CTASection />
    </>
  );
}

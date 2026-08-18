import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Bot, Sparkles, Globe, Code2 } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { fadeUp, stagger, viewportOnce } from "@/hooks/useMotion";
import { Button } from "@/components/ui/button";

const PILLARS = [
  {
    num: "01",
    title: "AI & Workflow Automation",
    icon: Bot,
    tagline: "Autonomous AI agents, Meta WhatsApp API bots, and custom LLM integrations that slash operating cost.",
    highlights: ["Autonomous AI Agents", "WhatsApp API Bots", "LLM Integrations"],
  },
  {
    num: "02",
    title: "Brand Strategy & Positioning",
    icon: Sparkles,
    tagline: "Category positioning, visual identity systems, and brand voice guidelines that earn trust instantly.",
    highlights: ["Category Positioning", "Visual Identity", "Messaging & Voice"],
  },
  {
    num: "03",
    title: "Software & Web Systems",
    icon: Globe,
    tagline: "SEO-optimized, ultra-fast marketing websites and headless storefronts engineered for conversion and speed.",
    highlights: ["Headless Storefronts", "Marketing Sites", "SEO Architecture"],
  },
  {
    num: "04",
    title: "SaaS & Internal Tools",
    icon: Code2,
    tagline: "Tailored SaaS web apps, customer portals, and internal telemetry tools built around your business operations.",
    highlights: ["SaaS Web Platforms", "Admin Portals", "Custom APIs"],
  },
];

export function CapabilitiesOverview() {
  return (
    <Section className="border-t border-border/40">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow="Core Capabilities"
          title={
            <>
              Four pillars.{" "}
              <span className="text-gradient-primary">One integrated engine.</span>
            </>
          }
          lead="We combine AI automation, brand positioning, software systems, and custom SaaS into one growth engine."
        />
        <Button asChild variant="outline" className="rounded-full border-border hover:border-primary/40 font-medium">
          <Link to="/services" className="flex items-center gap-1.5 text-xs font-mono">
            <span>Explore Full Services</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </Button>
      </div>

      {/* Compact 4-Pillar Grid */}
      <motion.div
        variants={stagger(0.08, 0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {PILLARS.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <motion.div
              key={pillar.num}
              variants={fadeUp}
              className="surface-card group flex flex-col justify-between p-7 border border-border/60 hover:border-primary/40 transition-all duration-300 rounded-2xl"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary border border-primary/20">
                    <Icon className="size-5" />
                  </div>
                  <span className="font-mono text-xs font-semibold text-muted-foreground/70">
                    {pillar.num}
                  </span>
                </div>

                <h3 className="mt-6 font-display text-xl font-semibold text-foreground tracking-tight group-hover:text-primary transition-colors">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {pillar.tagline}
                </p>
              </div>

              {/* Pill tags */}
              <div className="mt-6 pt-4 border-t border-border/40 flex flex-wrap gap-1.5">
                {pillar.highlights.map((h) => (
                  <span
                    key={h}
                    className="rounded-md bg-surface border border-border/60 px-2 py-0.5 text-[11px] font-mono text-muted-foreground"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </Section>
  );
}

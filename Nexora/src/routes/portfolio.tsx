import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CTASection } from "@/components/sections/home/CTASection";
import { PORTFOLIO_ITEMS } from "@/constants/work";
import { fadeUp, stagger, viewportOnce } from "@/hooks/useMotion";
import { Layers, Sparkles } from "lucide-react";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Our Work & Project Showcase — Nexora" },
      {
        name: "description",
        content:
          "Explore selected client work from Nexora — custom web apps, brand systems, D2C storefronts, and internal automation portals.",
      },
      { property: "og:title", content: "Work & Portfolio — Nexora" },
      {
        property: "og:description",
        content: "Selected client deliverables across branding, software engineering, AI, and growth.",
      },
      { property: "og:url", content: "/portfolio" },
    ],
    links: [{ rel: "canonical", href: "/portfolio" }],
  }),
  component: PortfolioPage,
});

function PortfolioPage() {
  return (
    <>
      <PageHero
        eyebrow="Selected Work & Deliverables"
        title={
          <>
            Shipped products & <span className="text-gradient-primary italic">growth systems.</span>
          </>
        }
        lead="A visual showcase of software platforms, brand identities, automated engines, and digital experiences we've engineered."
      />

      <Section>
        <motion.ul
          variants={stagger(0.08, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {PORTFOLIO_ITEMS.map((item) => (
            <motion.li
              key={item.id}
              variants={fadeUp}
              className="surface-card group overflow-hidden flex flex-col justify-between border border-border/60 hover:border-primary/40 transition-all duration-300"
            >
              {/* Top Banner Card Header */}
              <div className="relative aspect-[16/10] overflow-hidden border-b border-border/50 bg-surface/50 p-6 flex flex-col justify-between">
                <div className="absolute inset-0 grid-bg opacity-40" />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(circle at 70% 20%, oklch(0.45 0.16 300 / 0.15), transparent 70%)",
                  }}
                />
                <div className="relative z-10 flex items-center justify-between">
                  <span className="rounded-full bg-background/80 backdrop-blur border border-border/60 px-3 py-1 text-[11px] font-mono font-medium text-primary">
                    {item.featuredYear}
                  </span>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
                    {item.client}
                  </span>
                </div>

                <div className="relative z-10">
                  <div className="font-display text-4xl sm:text-5xl font-bold text-foreground tracking-tight">
                    {item.impactMetric}
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-widest font-medium text-primary">
                    {item.impactLabel}
                  </div>
                </div>
              </div>

              {/* Card Body & Deliverables */}
              <div className="p-7 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground font-mono">
                    {item.category}
                  </div>
                  <h3 className="mt-2 font-display text-2xl text-foreground font-semibold leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {item.tagline}
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-border/30">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground mb-2">
                    <Layers className="size-3.5 text-primary" />
                    <span>Scope of Work</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {item.deliverables.map((del) => (
                      <span
                        key={del}
                        className="inline-flex items-center gap-1 rounded-md border border-border/60 bg-surface/80 px-2.5 py-1 text-[11px] font-mono text-muted-foreground"
                      >
                        <Sparkles className="size-2.5 text-primary" />
                        {del}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </Section>
      <CTASection />
    </>
  );
}

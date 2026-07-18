import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CTASection } from "@/components/sections/home/CTASection";
import { INSIGHTS } from "@/constants/insights";
import { fadeUp, stagger, viewportOnce } from "@/hooks/useMotion";

export const Route = createFileRoute("/insights")({
  head: () => ({
    meta: [
      { title: "Insights — Nexora" },
      {
        name: "description",
        content:
          "Field notes on branding, software, AI automation and performance marketing — from the operator's chair.",
      },
      { property: "og:title", content: "Insights — Nexora" },
      {
        property: "og:description",
        content: "Perspectives on growth from operators, not observers.",
      },
      { property: "og:url", content: "/insights" },
    ],
    links: [{ rel: "canonical", href: "/insights" }],
  }),
  component: InsightsPage,
});

function InsightsPage() {
  return (
    <>
      <PageHero
        eyebrow="Insights"
        title={
          <>
            Notes from <span className="text-gradient-primary italic">the operator's chair.</span>
          </>
        }
        lead="Perspectives on how modern businesses actually build durable growth."
      />

      <Section>
        <motion.ul
          variants={stagger(0.06, 0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {INSIGHTS.map((i) => (
            <motion.li
              key={i.slug}
              variants={fadeUp}
              className="surface-card group flex h-full flex-col gap-5 p-8 transition-colors hover:border-primary/30"
            >
              <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-muted-foreground">
                <span className="text-primary">{i.category}</span>
                <span className="size-1 rounded-full bg-border" />
                <span>{i.readTime}</span>
              </div>
              <h3 className="font-display text-2xl leading-snug text-foreground">{i.title}</h3>
              <p className="text-sm text-muted-foreground">{i.excerpt}</p>
              <div className="mt-auto pt-4 text-xs text-muted-foreground">{i.date}</div>
            </motion.li>
          ))}
        </motion.ul>
      </Section>
      <CTASection />
    </>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CTASection } from "@/components/sections/home/CTASection";
import { CASE_STUDIES } from "@/constants/work";
import { fadeUp, stagger, viewportOnce } from "@/hooks/useMotion";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — Nexora" },
      {
        name: "description",
        content:
          "Selected work from Nexora — brands, products and growth systems built for ambitious businesses.",
      },
      { property: "og:title", content: "Portfolio — Nexora" },
      {
        property: "og:description",
        content: "Selected work across branding, software, AI and marketing.",
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
        eyebrow="Selected work"
        title={
          <>
            A portfolio of{" "}
            <span className="text-gradient-primary italic">measurable outcomes.</span>
          </>
        }
        lead="A snapshot of the brands, products and growth systems we've shipped alongside our partners."
      />

      <Section>
        <motion.ul
          variants={stagger(0.08, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-6 md:grid-cols-2"
        >
          {CASE_STUDIES.map((cs) => (
            <motion.li
              key={cs.slug}
              variants={fadeUp}
              className="surface-card group overflow-hidden"
            >
              <div className="relative aspect-[16/10] overflow-hidden border-b border-border">
                <div className="absolute inset-0 grid-bg opacity-60" />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(circle at 20% 30%, oklch(0.82 0.14 78 / 0.35), transparent 60%)",
                  }}
                />
                <div className="absolute bottom-6 left-6">
                  <div className="font-display text-6xl text-foreground">{cs.metric}</div>
                  <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                    {cs.metricLabel}
                  </div>
                </div>
              </div>
              <div className="p-8">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">
                  {cs.category}
                </div>
                <h3 className="mt-3 font-display text-2xl text-foreground">{cs.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{cs.summary}</p>
                <div className="mt-6 text-sm font-medium text-primary">{cs.client}</div>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </Section>
      <CTASection />
    </>
  );
}

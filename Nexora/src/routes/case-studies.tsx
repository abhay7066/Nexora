import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CTASection } from "@/components/sections/home/CTASection";
import { CASE_STUDIES } from "@/constants/work";
import { fadeUp, stagger, viewportOnce } from "@/hooks/useMotion";

export const Route = createFileRoute("/case-studies")({
  head: () => ({
    meta: [
      { title: "Case Studies — Nexora" },
      {
        name: "description",
        content:
          "In-depth case studies: how Nexora helped ambitious businesses grow through branding, software, AI and marketing.",
      },
      { property: "og:title", content: "Case Studies — Nexora" },
      {
        property: "og:description",
        content: "How we've delivered measurable growth outcomes.",
      },
      { property: "og:url", content: "/case-studies" },
    ],
    links: [{ rel: "canonical", href: "/case-studies" }],
  }),
  component: CaseStudiesPage,
});

function CaseStudiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Case studies"
        title={
          <>
            Growth systems, <span className="text-gradient-primary italic">in the wild.</span>
          </>
        }
        lead="A closer look at how we diagnose, architect, build and compound growth with our partners."
      />

      <Section>
        <motion.ul
          variants={stagger(0.08, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="flex flex-col gap-5"
        >
          {CASE_STUDIES.map((cs) => (
            <motion.li key={cs.slug} variants={fadeUp}>
              <article className="surface-card group grid gap-8 p-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] md:p-10">
                <div className="flex flex-col justify-between gap-6">
                  <div>
                    <div className="text-xs uppercase tracking-widest text-muted-foreground">
                      {cs.category}
                    </div>
                    <div className="mt-2 text-sm font-medium text-primary">{cs.client}</div>
                  </div>
                  <div>
                    <div className="font-display text-6xl text-foreground sm:text-7xl">
                      {cs.metric}
                    </div>
                    <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                      {cs.metricLabel}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="font-display text-2xl leading-snug text-foreground sm:text-3xl">
                    {cs.title}
                  </h3>
                  <p className="mt-4 text-base text-muted-foreground">{cs.summary}</p>
                </div>
              </article>
            </motion.li>
          ))}
        </motion.ul>
      </Section>
      <CTASection />
    </>
  );
}

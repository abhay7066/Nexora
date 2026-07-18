import { motion } from "framer-motion";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ArrowLink } from "@/components/common/ArrowLink";
import { FEATURED_WORK } from "@/constants/work";
import { fadeUp, stagger, viewportOnce } from "@/hooks/useMotion";

export function FeaturedWork() {
  return (
    <Section>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow="Featured work"
          title={
            <>
              Outcomes we've shipped for{" "}
              <span className="text-gradient-primary">ambitious teams.</span>
            </>
          }
        />
        <ArrowLink to="/case-studies">All case studies</ArrowLink>
      </div>

      <motion.ul
        variants={stagger(0.1, 0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mt-14 grid gap-5 lg:grid-cols-3"
      >
        {FEATURED_WORK.map((cs) => (
          <motion.li
            key={cs.slug}
            variants={fadeUp}
            className="surface-card group flex h-full flex-col overflow-hidden"
          >
            <div className="relative aspect-[4/3] overflow-hidden border-b border-border">
              <div className="absolute inset-0 grid-bg opacity-60" />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(circle at 30% 30%, oklch(0.82 0.14 78 / 0.35), transparent 60%)",
                }}
              />
              <div className="absolute bottom-6 left-6">
                <div className="font-display text-5xl text-foreground sm:text-6xl">{cs.metric}</div>
                <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                  {cs.metricLabel}
                </div>
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-3 p-7">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">
                {cs.category}
              </div>
              <h3 className="font-display text-xl text-foreground">{cs.title}</h3>
              <p className="text-sm text-muted-foreground">{cs.summary}</p>
              <div className="mt-auto pt-4 text-sm font-medium text-primary">{cs.client}</div>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </Section>
  );
}

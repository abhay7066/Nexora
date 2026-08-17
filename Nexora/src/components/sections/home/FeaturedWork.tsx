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
        <ArrowLink to="/portfolio">Explore all work</ArrowLink>
      </div>

      <motion.ul
        variants={stagger(0.1, 0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mt-14 grid gap-5 lg:grid-cols-3"
      >
        {FEATURED_WORK.map((item) => {
          const key = item.id || item.slug || item.title;
          const metric = item.impactMetric || item.metric;
          const metricLabel = item.impactLabel || item.metricLabel;
          const description = item.tagline || item.summary;

          return (
            <motion.li
              key={key}
              variants={fadeUp}
              className="surface-card group flex h-full flex-col overflow-hidden border border-border/60 hover:border-primary/40 transition-all duration-300 rounded-2xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden border-b border-border/50 bg-surface/50 p-6 flex flex-col justify-between">
                <div className="absolute inset-0 grid-bg opacity-60" />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 30%, oklch(0.45 0.16 300 / 0.15), transparent 60%)",
                  }}
                />
                <div className="relative z-10 flex justify-end">
                  <span className="rounded-full bg-background/80 border border-border/60 px-3 py-1 text-[11px] font-mono text-primary font-medium">
                    {item.featuredYear || "Featured"}
                  </span>
                </div>
                <div className="relative z-10">
                  <div className="font-display text-5xl font-bold text-foreground sm:text-6xl">{metric}</div>
                  <div className="mt-1 text-xs uppercase tracking-widest text-primary font-medium">
                    {metricLabel}
                  </div>
                </div>
              </div>
              <div className="flex flex-1 flex-col justify-between p-7">
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground font-mono">
                    {item.category}
                  </div>
                  <h3 className="mt-2 font-display text-xl font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-border/30 text-sm font-medium text-primary flex items-center justify-between">
                  <span>{item.client}</span>
                  <span className="text-xs font-mono text-muted-foreground font-normal">View Project →</span>
                </div>
              </div>
            </motion.li>
          );
        })}
      </motion.ul>
    </Section>
  );
}

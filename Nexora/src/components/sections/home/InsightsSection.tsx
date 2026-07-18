import { motion } from "framer-motion";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ArrowLink } from "@/components/common/ArrowLink";
import { INSIGHTS } from "@/constants/insights";
import { fadeUp, stagger, viewportOnce } from "@/hooks/useMotion";

export function InsightsSection() {
  return (
    <Section>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow="Insights"
          title={
            <>
              Perspectives from <span className="text-gradient-primary">the operator's chair.</span>
            </>
          }
        />
        <ArrowLink to="/insights">All insights</ArrowLink>
      </div>

      <motion.ul
        variants={stagger(0.08, 0.08)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mt-14 grid gap-5 md:grid-cols-3"
      >
        {INSIGHTS.map((i) => (
          <motion.li
            key={i.slug}
            variants={fadeUp}
            className="group surface-card flex h-full flex-col gap-5 p-7 transition-colors hover:border-primary/30"
          >
            <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-muted-foreground">
              <span className="text-primary">{i.category}</span>
              <span className="size-1 rounded-full bg-border" />
              <span>{i.readTime}</span>
            </div>
            <h3 className="font-display text-xl leading-snug text-foreground">{i.title}</h3>
            <p className="text-sm text-muted-foreground">{i.excerpt}</p>
            <div className="mt-auto pt-4 text-xs text-muted-foreground">{i.date}</div>
          </motion.li>
        ))}
      </motion.ul>
    </Section>
  );
}

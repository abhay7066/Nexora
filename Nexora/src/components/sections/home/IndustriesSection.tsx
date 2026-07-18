import { motion } from "framer-motion";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ArrowLink } from "@/components/common/ArrowLink";
import { INDUSTRIES } from "@/constants/industries";
import { fadeUp, stagger, viewportOnce } from "@/hooks/useMotion";

export function IndustriesSection() {
  return (
    <Section>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow="Industries"
          title={
            <>
              Built for the businesses{" "}
              <span className="text-gradient-primary">shaping the next decade.</span>
            </>
          }
        />
        <ArrowLink to="/industries">All industries</ArrowLink>
      </div>

      <motion.ul
        variants={stagger(0.05, 0.06)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3"
      >
        {INDUSTRIES.map((industry) => {
          const Icon = industry.icon;
          return (
            <motion.li
              key={industry.slug}
              variants={fadeUp}
              className="group relative flex flex-col gap-4 bg-background p-8 transition-colors hover:bg-surface"
            >
              <div className="grid size-11 place-items-center rounded-lg border border-border bg-surface text-primary transition-colors group-hover:border-primary/40">
                <Icon className="size-5" />
              </div>
              <h3 className="font-display text-xl text-foreground">{industry.name}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {industry.description}
              </p>
            </motion.li>
          );
        })}
      </motion.ul>
    </Section>
  );
}

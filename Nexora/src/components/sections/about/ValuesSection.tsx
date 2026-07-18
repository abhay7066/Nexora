import { motion } from "framer-motion";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { VALUES } from "@/constants/about";
import { fadeUp, stagger, viewportOnce } from "@/hooks/useMotion";

export function ValuesSection() {
  return (
    <Section>
      <SectionHeading
        eyebrow="What we stand for"
        title={
          <>
            Six principles that{" "}
            <span className="text-gradient-primary italic">shape every engagement.</span>
          </>
        }
        lead="Not values on a wall. Operating principles we hire against, review quarterly, and fire ourselves against."
      />
      <motion.ul
        variants={stagger(0.06, 0.12)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
      >
        {VALUES.map((v) => {
          const Icon = v.icon;
          return (
            <motion.li
              key={v.title}
              variants={fadeUp}
              className="surface-card group flex h-full flex-col gap-5 p-8 transition-colors hover:border-primary/30"
            >
              <div className="grid size-11 place-items-center rounded-lg border border-border bg-surface text-primary">
                <Icon className="size-5" />
              </div>
              <h3 className="font-display text-2xl text-foreground">{v.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{v.description}</p>
            </motion.li>
          );
        })}
      </motion.ul>
    </Section>
  );
}

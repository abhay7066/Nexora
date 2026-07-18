import { motion } from "framer-motion";
import { Section } from "@/components/layout/Section";
import { STATS } from "@/constants/about";
import { fadeUp, stagger, viewportOnce } from "@/hooks/useMotion";

export function StatsSection() {
  return (
    <Section>
      <motion.dl
        variants={stagger(0.05, 0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {STATS.map((s) => (
          <motion.div
            key={s.label}
            variants={fadeUp}
            className="surface-card flex flex-col gap-3 p-8"
          >
            <dt className="flex items-baseline gap-2">
              <span className="font-display text-5xl text-gradient-primary sm:text-6xl">
                {s.value}
              </span>
              <span className="text-sm uppercase tracking-widest text-muted-foreground">
                {s.label}
              </span>
            </dt>
            <dd className="text-sm text-muted-foreground">{s.detail}</dd>
          </motion.div>
        ))}
      </motion.dl>
    </Section>
  );
}

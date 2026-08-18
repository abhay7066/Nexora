import { motion } from "framer-motion";
import { Section } from "@/components/layout/Section";
import { STATS } from "@/constants/about";
import { fadeUp, stagger, viewportOnce } from "@/hooks/useMotion";

export function StatsSection() {
  return (
    <Section className="py-8">
      <motion.dl
        variants={stagger(0.08, 0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {STATS.map((s) => (
          <motion.div
            key={s.label}
            variants={fadeUp}
            className="surface-card flex flex-col justify-between h-full p-7 border border-border/60 hover:border-primary/30 transition-all duration-300"
          >
            <div className="flex flex-col gap-2">
              <dt className="flex flex-col gap-2">
                <span className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-gradient-primary">
                  {s.value}
                </span>
                <span className="text-base font-semibold text-foreground tracking-tight leading-snug">
                  {s.label}
                </span>
              </dt>
              <dd className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {s.detail}
              </dd>
            </div>
          </motion.div>
        ))}
      </motion.dl>
    </Section>
  );
}

import { motion } from "framer-motion";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { PROCESS_STEPS } from "@/constants/process";
import { fadeUp, stagger, viewportOnce } from "@/hooks/useMotion";

export function Process() {
  return (
    <Section>
      <SectionHeading
        eyebrow="How we work"
        title={
          <>
            A process built to <span className="text-gradient-primary">compound.</span>
          </>
        }
        lead="From diagnosis to compounding growth — one clear operating rhythm across every engagement."
      />

      <motion.ol
        variants={stagger(0.1, 0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2 lg:grid-cols-4"
      >
        {PROCESS_STEPS.map((s) => (
          <motion.li
            key={s.step}
            variants={fadeUp}
            className="relative flex flex-col gap-5 bg-background p-8"
          >
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-primary">{s.step}</span>
              <span className="h-px flex-1 bg-border" />
            </div>
            <h3 className="font-display text-2xl text-foreground">{s.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{s.description}</p>
          </motion.li>
        ))}
      </motion.ol>
    </Section>
  );
}

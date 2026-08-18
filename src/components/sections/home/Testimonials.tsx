import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { TESTIMONIALS } from "@/constants/testimonials";
import { fadeUp, stagger, viewportOnce } from "@/hooks/useMotion";

export function Testimonials() {
  return (
    <Section>
      <SectionHeading
        eyebrow="What partners say"
        title={
          <>
            Trusted by operators, <span className="text-gradient-primary">not observers.</span>
          </>
        }
      />

      <motion.ul
        variants={stagger(0.1, 0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mt-14 grid gap-5 lg:grid-cols-3"
      >
        {TESTIMONIALS.map((t) => (
          <motion.li
            key={t.name}
            variants={fadeUp}
            className="surface-card flex h-full flex-col gap-6 p-7"
          >
            <Quote className="size-6 text-primary/60" />
            <blockquote className="font-display text-lg leading-snug text-foreground">
              "{t.quote}"
            </blockquote>
            <div className="mt-auto border-t border-border pt-5">
              <div className="text-sm font-medium text-foreground">{t.name}</div>
              <div className="text-xs text-muted-foreground">
                {t.role} · {t.company}
              </div>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </Section>
  );
}

import { motion } from "framer-motion";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { STORY } from "@/constants/about";
import { fadeUp, stagger, viewportOnce } from "@/hooks/useMotion";

export function StorySection() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Our story"
        title={
          <>
            From operators, <span className="text-gradient-primary italic">for operators.</span>
          </>
        }
        lead="Nexora wasn't started in a strategy deck. It grew out of the frustration of watching great teams stall in the gaps between agencies."
      />

      <ol className="mt-16 relative border-l border-border pl-8 sm:pl-12">
        {STORY.map((chapter, i) => (
          <motion.li
            key={chapter.year}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            custom={i}
            className="relative pb-14 last:pb-0"
          >
            <span
              aria-hidden
              className="absolute -left-[41px] top-2 grid size-4 place-items-center rounded-full border border-primary/40 bg-background sm:-left-[57px]"
            >
              <span className="size-1.5 rounded-full bg-primary" />
            </span>
            <div className="eyebrow text-primary">{chapter.year}</div>
            <h3 className="mt-4 font-display text-3xl text-foreground sm:text-4xl">
              {chapter.title}
            </h3>
            <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
              {chapter.body}
            </p>
          </motion.li>
        ))}
      </ol>

      {/* Motion wrapper to enable stagger via parent — kept simple with individual fadeUps above */}
      <motion.div
        variants={stagger(0, 0)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      />
    </Section>
  );
}

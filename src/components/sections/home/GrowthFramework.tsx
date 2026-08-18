import { motion } from "framer-motion";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { fadeUp, stagger, viewportOnce } from "@/hooks/useMotion";

const PILLARS = [
  {
    label: "Position",
    title: "Brand & Positioning",
    body: "Turn your business into the obvious choice in your category.",
  },
  {
    label: "Build",
    title: "Software & Product",
    body: "Websites, apps and internal tools engineered for scale.",
  },
  {
    label: "Automate",
    title: "AI & Operations",
    body: "AI agents and workflow automation that compound leverage.",
  },
  {
    label: "Grow",
    title: "Performance Marketing",
    body: "Predictable pipeline measured against unit economics.",
  },
];

export function GrowthFramework() {
  return (
    <Section>
      <SectionHeading
        eyebrow="The Nexora Framework"
        title={
          <>
            One framework. Four levers.{" "}
            <span className="text-gradient-primary">Compounding growth.</span>
          </>
        }
        lead="We don't sell services. We build growth systems — where brand, product, automation and marketing move together."
      />
      <motion.ol
        variants={stagger(0.15, 0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-4"
      >
        {PILLARS.map((p, i) => (
          <motion.li
            key={p.label}
            variants={fadeUp}
            className="surface-card group relative overflow-hidden p-7"
          >
            <div className="flex items-baseline justify-between">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                {String(i + 1).padStart(2, "0")} · {p.label}
              </span>
            </div>
            <h3 className="mt-8 font-display text-2xl text-foreground">{p.title}</h3>
            <p className="mt-3 text-sm text-muted-foreground">{p.body}</p>
            <div
              aria-hidden
              className="absolute -bottom-16 -right-16 size-40 rounded-full bg-primary/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
            />
          </motion.li>
        ))}
      </motion.ol>
    </Section>
  );
}

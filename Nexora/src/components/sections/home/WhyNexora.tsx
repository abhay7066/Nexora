import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { fadeUp, stagger, viewportOnce } from "@/hooks/useMotion";

const REASONS = [
  {
    title: "Operators, not vendors",
    body: "We've built and scaled businesses ourselves. Every recommendation ties back to your P&L.",
  },
  {
    title: "Under one roof",
    body: "Brand, product, automation and paid — one accountable team, no hand-off friction.",
  },
  {
    title: "AI-native from day one",
    body: "We ship the automation layer most agencies still outsource or ignore.",
  },
  {
    title: "Measured in outcomes",
    body: "Pipeline, revenue, retention — the only metrics that matter live on the wall.",
  },
  {
    title: "Senior by default",
    body: "You work with the people building the work — not with account managers.",
  },
  {
    title: "Long-term partners",
    body: "We're built to be your growth partner for years, not a project vendor.",
  },
];

export function WhyNexora() {
  return (
    <Section>
      <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
        <SectionHeading
          eyebrow="Why Nexora"
          title={
            <>
              Different from an <span className="text-gradient-primary">ordinary agency.</span>
            </>
          }
          lead="Six reasons the best businesses treat us as their long-term growth partner."
        />
        <motion.ul
          variants={stagger(0.05, 0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-x-8 gap-y-8 sm:grid-cols-2"
        >
          {REASONS.map((r) => (
            <motion.li key={r.title} variants={fadeUp} className="flex gap-4">
              <CheckCircle2 className="mt-1 size-5 shrink-0 text-primary" />
              <div>
                <h3 className="text-base font-medium text-foreground">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.body}</p>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </Section>
  );
}

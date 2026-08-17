import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck, Zap, Target, Handshake } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { fadeUp, stagger, viewportOnce } from "@/hooks/useMotion";

const REASONS = [
  {
    num: "01",
    title: "Operators, not vendors",
    icon: ShieldCheck,
    body: "We've built and scaled tech businesses ourselves. Every recommendation ties back directly to your bottom line P&L.",
  },
  {
    num: "02",
    title: "Extended team",
    icon: Zap,
    body: "Brand, software, AI automation, and paid acquisition — one unified accountable team with zero hand-off friction.",
  },
  {
    num: "03",
    title: "Measured in outcomes",
    icon: Target,
    body: "Pipeline speed, recurring revenue, and retention — transparent metrics tied directly to actual business growth.",
  },
  {
    num: "04",
    title: "Long-term growth partner",
    icon: Handshake,
    body: "We are structured as an embedded growth partner for years, providing continuous telemetry and optimization.",
  },
];

export function WhyNexora() {
  return (
    <Section>
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] items-start">
        <SectionHeading
          eyebrow="Why Nexora"
          title={
            <>
              Different from an <span className="text-gradient-primary">ordinary agency.</span>
            </>
          }
          lead="Four core principles that make ambitious startups and enterprises treat us as their long-term growth partner."
        />
        <motion.div
          variants={stagger(0.08, 0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-5 sm:grid-cols-2"
        >
          {REASONS.map((r) => {
            const Icon = r.icon;
            return (
              <motion.div
                key={r.title}
                variants={fadeUp}
                whileHover={{ y: -5, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 350, damping: 22 }}
                className="group surface-card flex flex-col justify-between p-6 border border-border/60 hover:border-primary/40 transition-all duration-300 rounded-2xl relative overflow-hidden select-none"
              >
                {/* Accent line effect */}
                <div aria-hidden className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary border border-primary/20 group-hover:scale-105 transition-transform">
                      <Icon className="size-5" />
                    </div>
                    <span className="font-mono text-xs font-semibold text-muted-foreground/60">
                      {r.num}
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {r.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                    {r.body}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-border/30 flex items-center gap-1.5 text-[11px] font-mono text-primary font-medium">
                  <CheckCircle2 className="size-3.5" />
                  <span>Guaranteed Principle</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </Section>
  );
}

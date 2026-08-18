import { motion } from "framer-motion";
import { Zap, ShieldCheck, Target, Activity, CheckCircle2 } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { fadeUp, stagger, viewportOnce } from "@/hooks/useMotion";

const COMMITMENTS = [
  {
    num: "01",
    title: "< 24h Response SLA Guarantee",
    icon: Zap,
    description:
      "Direct access to senior operators via dedicated Slack / WhatsApp. Guaranteed response and triage within one business day.",
    badge: "Direct Founder & Engineering SLA",
  },
  {
    num: "02",
    title: "100% Code & IP Ownership",
    icon: ShieldCheck,
    description:
      "No proprietary lock-in. Full repository access, design assets, and production infrastructure are transferred to you from Day 1.",
    badge: "Zero Agency Lock-in",
  },
  {
    num: "03",
    title: "Fixed Scope & Zero Hidden Fees",
    icon: Target,
    description:
      "Transparent sprint pricing upfront with clear deliverable milestones. No hidden account manager retainers or surprise invoices.",
    badge: "Transparent Sprint Milestones",
  },
  {
    num: "04",
    title: "Bi-Weekly Demos & Live Telemetry",
    icon: Activity,
    description:
      "Working software demos shipped every two weeks paired with transparent performance telemetry dashboards.",
    badge: "2-Week Sprint Velocity",
  },
];

export function FoundationalCommitments() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Operating Principles"
        title={
          <>
            Our foundational <span className="text-gradient-primary">commitments.</span>
          </>
        }
        lead="Four operational guarantees we bring to every engagement from Day 1."
      />

      <motion.div
        variants={stagger(0.08, 0.08)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mt-14 grid gap-6 sm:grid-cols-2"
      >
        {COMMITMENTS.map((c) => {
          const Icon = c.icon;
          return (
            <motion.div
              key={c.num}
              variants={fadeUp}
              whileHover={{ y: -5, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 350, damping: 22 }}
              className="group surface-card flex flex-col justify-between p-8 border border-border/60 hover:border-primary/50 transition-all duration-300 rounded-2xl relative select-none"
            >
              {/* Top gradient glow line */}
              <div
                aria-hidden
                className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl"
              />

              <div>
                <div className="flex items-center justify-between">
                  <div className="grid size-12 place-items-center rounded-xl bg-primary/10 text-primary border border-primary/20 group-hover:scale-105 transition-transform">
                    <Icon className="size-6" />
                  </div>
                  <span className="font-mono text-xs font-semibold text-muted-foreground/60">
                    {c.num}
                  </span>
                </div>

                <h3 className="mt-6 font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors tracking-tight">
                  {c.title}
                </h3>
                <p className="mt-3 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                  {c.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-border/40 flex items-center gap-2 text-xs font-mono text-primary font-medium">
                <CheckCircle2 className="size-4 shrink-0" />
                <span>{c.badge}</span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </Section>
  );
}

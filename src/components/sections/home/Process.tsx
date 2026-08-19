import { motion } from "framer-motion";
import { ArrowRight, Search, Compass, Rocket, TrendingUp, CheckCircle2 } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { fadeUp, stagger, viewportOnce } from "@/hooks/useMotion";

const ENHANCED_STEPS = [
  {
    step: "01",
    title: "Diagnose",
    timeframe: "Days 1–7",
    icon: Search,
    description: "We audit your brand position, tech stack, funnel bottlenecks, and operations to pinpoint the single true growth constraint.",
    deliverable: "P&L Constraint POV",
  },
  {
    step: "02",
    title: "Architect",
    timeframe: "Days 8–14",
    icon: Compass,
    description: "We design a custom, end-to-end growth blueprint — combining software architecture, AI automation, and performance channels.",
    deliverable: "System Blueprint & Roadmap",
  },
  {
    step: "03",
    title: "Build",
    timeframe: "Weeks 2–4",
    icon: Rocket,
    description: "Senior engineering and creative squads execute rapid 2–4 week deployment sprints with live stage previews and full code ownership.",
    deliverable: "Production Code Deployment",
  },
  {
    step: "04",
    title: "Compound",
    timeframe: "Ongoing",
    icon: TrendingUp,
    description: "We stay embedded as your growth operators — monitoring real-time telemetry, optimizing conversion loops, and scaling revenue.",
    deliverable: "Continuous Telemetry & Scale",
  },
];

export function Process() {
  return (
    <Section className="relative overflow-hidden">
      <SectionHeading
        eyebrow="Operating Rhythm"
        title={
          <>
            A process built to <span className="text-gradient-primary">compound.</span>
          </>
        }
        lead="From initial diagnostic audit to compounding revenue — one structured 4-phase operating rhythm."
      />

      {/* Connected Process Flow Timeline */}
      <div className="relative mt-16">
        {/* Subtle Horizontal Connector Line behind cards on desktop */}
        <div 
          aria-hidden 
          className="hidden lg:block absolute top-[48px] left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-primary/10 via-primary/40 to-primary/10 z-0" 
        />

        <motion.div
          variants={stagger(0.1, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 relative z-10"
        >
          {ENHANCED_STEPS.map((s, idx) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.step}
                variants={fadeUp}
                whileHover={{ y: -6, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 350, damping: 22 }}
                className="group surface-card flex flex-col justify-between p-7 border border-border/60 hover:border-primary/50 transition-all duration-300 rounded-2xl relative select-none"
              >
                {/* Glowing Top Light Accent */}
                <div 
                  aria-hidden 
                  className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl" 
                />

                <div>
                  {/* Step Header Node */}
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary border border-primary/25 group-hover:scale-105 transition-transform shadow-sm">
                        <Icon className="size-5" />
                      </div>
                      <span className="rounded-full bg-background border border-border/60 px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider text-primary font-semibold">
                        {s.timeframe}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-mono text-base font-bold text-foreground/80 group-hover:text-primary transition-colors">
                        {s.step}
                      </span>
                      {idx < ENHANCED_STEPS.length - 1 && (
                        <ArrowRight className="hidden lg:block size-4 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      )}
                    </div>
                  </div>

                  <h3 className="font-display text-2xl font-bold text-foreground group-hover:text-primary transition-colors tracking-tight">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                    {s.description}
                  </p>
                </div>

                {/* Key Outcome Badge */}
                <div className="mt-6 pt-4 border-t border-border/40 flex items-center gap-2 text-xs font-mono text-foreground font-medium">
                  <CheckCircle2 className="size-4 text-primary shrink-0" />
                  <span>{s.deliverable}</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </Section>
  );
}

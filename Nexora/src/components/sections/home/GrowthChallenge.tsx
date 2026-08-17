import { motion } from "framer-motion";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { fadeUp, stagger, viewportOnce } from "@/hooks/useMotion";
import { AlertTriangle, Repeat, Database, Globe, Bot, LineChart, Cpu, ArrowRight } from "lucide-react";

const SYMPTOMS = [
  {
    num: "01",
    icon: AlertTriangle,
    title: "Isolated Marketing & Funnel Silos",
    body: "Marketing spends budget driving traffic, but sales processes and website messaging aren't aligned to convert leads into pipeline.",
    tag: "High CAC & Drop-off",
  },
  {
    num: "02",
    icon: Database,
    title: "Trapped Customer Data & Analytics",
    body: "Valuable customer behavior data is locked across CRMs and analytics platforms, but never transformed into automated growth actions.",
    tag: "Unused Intelligence",
  },
  {
    num: "03",
    icon: Repeat,
    title: "Manual Operational Overhead",
    body: "Teams waste dozens of hours every week manually copy-pasting data because tools and software stack don't talk to each other.",
    tag: "Operational Friction",
  },
];

export function GrowthChallenge() {
  return (
    <Section className="border-t border-border/40">
      <div className="grid gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] items-center">
        {/* Left side: Symptoms & Story */}
        <motion.div
          variants={stagger(0.08, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="flex flex-col"
        >
          <SectionHeading
            eyebrow="The Growth Challenge"
            title={
              <>
                Your business doesn't need more tools.{" "}
                <span className="text-gradient-primary">It needs system alignment.</span>
              </>
            }
            lead="Growth fails when systems operate in isolation. When brand, software, AI automation, and performance channels don't communicate, teams waste time on friction instead of scaling."
          />

          <motion.ul variants={stagger(0.08, 0.1)} className="mt-10 flex flex-col gap-4">
            {SYMPTOMS.map((symptom) => {
              const Icon = symptom.icon;
              return (
                <motion.li
                  key={symptom.title}
                  variants={fadeUp}
                  whileHover={{ x: 6, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 350, damping: 22 }}
                  className="group surface-card relative flex flex-col gap-3 p-5 sm:p-6 border border-border/60 hover:border-primary/50 transition-all duration-300 rounded-2xl select-none overflow-hidden"
                >
                  {/* Left glowing accent line on hover */}
                  <div
                    aria-hidden
                    className="absolute top-0 bottom-0 left-0 w-1 bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />

                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary border border-primary/20 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                        <Icon className="size-5" />
                      </div>
                      <h3 className="text-base font-display font-semibold text-foreground group-hover:text-primary transition-colors">
                        {symptom.title}
                      </h3>
                    </div>
                    <span className="rounded-full bg-background border border-border/60 px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                      {symptom.tag}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground pl-1">
                    {symptom.body}
                  </p>

                  <div className="mt-1 flex items-center gap-1.5 text-[11px] font-mono text-primary font-medium opacity-80 group-hover:opacity-100 transition-opacity">
                    <span>Solved with System Alignment</span>
                    <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.li>
              );
            })}
          </motion.ul>
        </motion.div>

        {/* Right side: Integrated System Diagram with Border Hover Animation */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="group relative aspect-square max-w-[450px] mx-auto w-full flex items-center justify-center p-8 bg-surface-card rounded-2xl border border-border/60 hover:border-primary/50 transition-all duration-500 overflow-hidden shadow-elevated select-none"
        >
          {/* Animated Border Sweep Path on Hover */}
          <svg className="pointer-events-none absolute inset-0 size-full z-20 overflow-hidden">
            <defs>
              <linearGradient id="diagramBorderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="oklch(0.7 0.22 300)" stopOpacity="0.9" />
                <stop offset="50%" stopColor="oklch(0.55 0.2 300)" stopOpacity="0.4" />
                <stop offset="100%" stopColor="oklch(0.45 0.16 300)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <motion.rect
              x="1.5"
              y="1.5"
              width="99.2%"
              height="99.2%"
              rx="15"
              fill="none"
              stroke="url(#diagramBorderGrad)"
              strokeWidth="2.5"
              strokeDasharray="140 400"
              animate={{ strokeDashoffset: [0, -540] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
          </svg>

          <div className="absolute inset-0 grid-bg opacity-30" />

          <svg className="w-full h-full relative z-10" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Background alignment tracks */}
            <circle cx="200" cy="200" r="120" stroke="var(--border)" strokeWidth="1" strokeDasharray="4 8" opacity="0.25" />
            <circle cx="200" cy="200" r="60" stroke="var(--border)" strokeWidth="1" strokeDasharray="4 8" opacity="0.2" />

            {/* Glowing connecting lines */}
            <motion.line
              x1="200" y1="200" x2="100" y2="130"
              stroke="var(--primary)"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            />
            <motion.line
              x1="200" y1="200" x2="300" y2="130"
              stroke="var(--primary)"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
            />
            <motion.line
              x1="200" y1="200" x2="200" y2="70"
              stroke="var(--primary)"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.6 }}
            />
            <motion.line
              x1="200" y1="200" x2="100" y2="270"
              stroke="var(--primary)"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.8 }}
            />
            <motion.line
              x1="200" y1="200" x2="300" y2="270"
              stroke="var(--primary)"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 1.2, ease: "easeOut", delay: 1.0 }}
            />

            {/* Center Core Pulsing Glow */}
            <motion.circle
              cx="200" cy="200" r="45"
              fill="var(--primary)"
              className="opacity-[0.06]"
              animate={{ scale: [1, 1.25, 1] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Center Core Hub */}
            <circle cx="200" cy="200" r="32" fill="var(--surface)" stroke="var(--primary)" strokeWidth="2" />
            <text x="200" y="204" textAnchor="middle" className="text-[11px] font-display font-bold fill-primary tracking-wider">NEXORA</text>

            {/* Floating Peripheral Nodes with group-hover pulse */}
            {/* Node 1: Web */}
            <g className="group-hover:scale-105 transition-transform">
              <circle cx="100" cy="130" r="22" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.5" />
              <foreignObject x="89" y="119" width="22" height="22">
                <div className="text-muted-foreground flex items-center justify-center h-full">
                  <Globe className="size-3.5" />
                </div>
              </foreignObject>
              <text x="100" y="167" textAnchor="middle" className="text-[9px] font-mono fill-muted-foreground">Website</text>
            </g>

            {/* Node 2: Growth */}
            <g className="group-hover:scale-105 transition-transform">
              <circle cx="300" cy="130" r="22" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.5" />
              <foreignObject x="289" y="119" width="22" height="22">
                <div className="text-muted-foreground flex items-center justify-center h-full">
                  <LineChart className="size-3.5" />
                </div>
              </foreignObject>
              <text x="300" y="167" textAnchor="middle" className="text-[9px] font-mono fill-muted-foreground">Growth</text>
            </g>

            {/* Node 3: AI & Ops */}
            <g className="group-hover:scale-105 transition-transform">
              <circle cx="200" cy="70" r="22" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.5" />
              <foreignObject x="189" y="59" width="22" height="22">
                <div className="text-muted-foreground flex items-center justify-center h-full">
                  <Cpu className="size-3.5" />
                </div>
              </foreignObject>
              <text x="200" y="104" textAnchor="middle" className="text-[9px] font-mono fill-muted-foreground">AI Automation</text>
            </g>

            {/* Node 4: Data */}
            <g className="group-hover:scale-105 transition-transform">
              <circle cx="100" cy="270" r="22" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.5" />
              <foreignObject x="89" y="259" width="22" height="22">
                <div className="text-muted-foreground flex items-center justify-center h-full">
                  <Database className="size-3.5" />
                </div>
              </foreignObject>
              <text x="100" y="307" textAnchor="middle" className="text-[9px] font-mono fill-muted-foreground">CRM & Data</text>
            </g>

            {/* Node 5: Automation */}
            <g className="group-hover:scale-105 transition-transform">
              <circle cx="300" cy="270" r="22" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.5" />
              <foreignObject x="289" y="259" width="22" height="22">
                <div className="text-muted-foreground flex items-center justify-center h-full">
                  <Bot className="size-3.5" />
                </div>
              </foreignObject>
              <text x="300" y="307" textAnchor="middle" className="text-[9px] font-mono fill-muted-foreground">Ops Engine</text>
            </g>
          </svg>
        </motion.div>
      </div>
    </Section>
  );
}

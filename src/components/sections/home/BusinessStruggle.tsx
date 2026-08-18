import { motion } from "framer-motion";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { fadeUp, stagger, viewportOnce } from "@/hooks/useMotion";
import { AlertCircle, Repeat, Database } from "lucide-react";

const SYMPTOMS = [
  {
    icon: AlertCircle,
    title: "Isolated Campaigns",
    body: "Marketing spends budget driving traffic, but sales processes and website messaging aren't aligned to convert them.",
  },
  {
    icon: Database,
    title: "Unused Repositories",
    body: "Valuable customer data is collected across CRMs and analytics platforms, but it is never transformed into strategic growth decisions.",
  },
  {
    icon: Repeat,
    title: "Manual Overhead",
    body: "Operational teams waste dozens of hours every week duplicate-entering data because tools and software don't communicate.",
  },
];

export function BusinessStruggle() {
  return (
    <Section className="border-t border-border/40">
      <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] items-center">
        
        {/* Left side: Connecting SVG alignment diagram */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="relative aspect-square max-w-[450px] mx-auto w-full flex items-center justify-center p-8 bg-surface-card rounded-2xl border border-border/40 overflow-hidden order-2 lg:order-1"
        >
          <div className="absolute inset-0 grid-bg opacity-30" />
          
          <svg className="w-full h-full relative z-10" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Background alignment track */}
            <circle cx="200" cy="200" r="110" stroke="var(--border)" strokeWidth="1" opacity="0.1" />

            {/* Connecting lines that draw themselves when visible */}
            <motion.line 
              x1="200" y1="200" x2="100" y2="150" 
              stroke="var(--primary)" 
              strokeWidth="2" 
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
            />
            <motion.line 
              x1="200" y1="200" x2="300" y2="150" 
              stroke="var(--primary)" 
              strokeWidth="2" 
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.4 }}
            />
            <motion.line 
              x1="200" y1="200" x2="200" y2="90" 
              stroke="var(--primary)" 
              strokeWidth="2" 
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.6 }}
            />
            <motion.line 
              x1="200" y1="200" x2="100" y2="250" 
              stroke="var(--primary)" 
              strokeWidth="2" 
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.8 }}
            />
            <motion.line 
              x1="200" y1="200" x2="300" y2="250" 
              stroke="var(--primary)" 
              strokeWidth="2" 
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 1.5, ease: "easeOut", delay: 1.0 }}
            />

            {/* Pulsing primary glow center */}
            <motion.circle 
              cx="200" cy="200" r="40" 
              fill="var(--primary)" 
              className="opacity-[0.03]"
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Nodes */}
            {/* Center Hub */}
            <circle cx="200" cy="200" r="30" fill="var(--surface)" stroke="var(--primary)" strokeWidth="2" />
            <text x="200" y="204" textAnchor="middle" className="text-[11px] font-display font-semibold fill-primary">NEXORA</text>

            {/* Brand (Top) */}
            <circle cx="200" cy="90" r="18" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.5" />
            <text x="200" y="93" textAnchor="middle" className="text-[8px] font-mono fill-muted-foreground">Brand</text>

            {/* Marketing (Top-Right) */}
            <circle cx="300" cy="150" r="18" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.5" />
            <text x="300" y="153" textAnchor="middle" className="text-[8px] font-mono fill-muted-foreground">Growth</text>

            {/* Technology (Bottom-Right) */}
            <circle cx="300" cy="250" r="18" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.5" />
            <text x="300" y="253" textAnchor="middle" className="text-[8px] font-mono fill-muted-foreground">Tech</text>

            {/* Operations (Bottom-Left) */}
            <circle cx="100" cy="250" r="18" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.5" />
            <text x="100" y="253" textAnchor="middle" className="text-[8px] font-mono fill-muted-foreground">Ops</text>

            {/* Data (Top-Left) */}
            <circle cx="100" cy="150" r="18" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.5" />
            <text x="100" y="153" textAnchor="middle" className="text-[8px] font-mono fill-muted-foreground">Data</text>

          </svg>
        </motion.div>

        {/* Right side: Story & Symptoms */}
        <motion.div
          variants={stagger(0.1, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="flex flex-col order-1 lg:order-2"
        >
          <SectionHeading
            eyebrow="Disconnected Execution"
            title={
              <>
                Most businesses optimize departments.{" "}
                <span className="text-gradient-primary">Few optimize the system.</span>
              </>
            }
            lead="When you hire individual agencies for branding, software, and marketing, they operate in silos. You become the project manager trying to bridge the gaps."
          />

          <motion.ul variants={stagger(0.08, 0.1)} className="mt-12 flex flex-col gap-6">
            {SYMPTOMS.map((symptom) => {
              const Icon = symptom.icon;
              return (
                <motion.li
                  key={symptom.title}
                  variants={fadeUp}
                  className="flex gap-5 p-5 bg-surface-card rounded-xl border border-border/40 hover:border-primary/20 transition-all duration-300"
                >
                  <div className="grid size-10 place-items-center rounded-lg bg-primary/10 text-primary shrink-0">
                    <Icon className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-foreground">{symptom.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{symptom.body}</p>
                  </div>
                </motion.li>
              );
            })}
          </motion.ul>
        </motion.div>

      </div>
    </Section>
  );
}

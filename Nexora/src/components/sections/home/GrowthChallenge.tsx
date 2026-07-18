import { motion } from "framer-motion";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { fadeUp, stagger, viewportOnce } from "@/hooks/useMotion";
import { Globe, Bot, LineChart, Cpu, Database } from "lucide-react";

export function GrowthChallenge() {
  return (
    <Section className="border-t border-border/40">
      <div className="grid gap-16 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-center">
        <motion.div
          variants={stagger(0.1, 0.1)}
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
                <span className="text-gradient-primary">It needs better alignment.</span>
              </>
            }
            lead="Growth doesn't fail because companies lack effort. It fails because systems stop working together. Modern teams manage more platforms, more vendors, and more data than ever before—yet execution remains fragmented."
          />
          <motion.p variants={fadeUp} className="mt-6 text-base text-muted-foreground leading-relaxed">
            When your branding, custom software, performance marketing, and operational automation operate in silos, they create friction instead of leverage. Eventually, leadership spends more time managing complexity than driving growth.
          </motion.p>
        </motion.div>

        {/* Right side: Disconnected SVG System Graphic */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="relative aspect-square max-w-[450px] mx-auto w-full flex items-center justify-center p-8 bg-surface-card rounded-2xl border border-border/40 overflow-hidden"
        >
          <div className="absolute inset-0 grid-bg opacity-30" />
          
          <svg className="w-full h-full relative z-10" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Background dashed circles */}
            <circle cx="200" cy="200" r="140" stroke="var(--border)" strokeWidth="1" strokeDasharray="4 8" opacity="0.3" />
            <circle cx="200" cy="200" r="80" stroke="var(--border)" strokeWidth="1" strokeDasharray="4 8" opacity="0.2" />

            {/* Floating Connection lines (disconnected / broken) */}
            <motion.path 
              d="M 110,130 L 150,170" 
              stroke="var(--border)" 
              strokeWidth="1.5" 
              strokeDasharray="4 4"
              animate={{ opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.path 
              d="M 290,130 L 250,170" 
              stroke="var(--border)" 
              strokeWidth="1.5" 
              strokeDasharray="4 4"
              animate={{ opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
            <motion.path 
              d="M 200,80 L 200,140" 
              stroke="var(--border)" 
              strokeWidth="1.5" 
              strokeDasharray="4 4"
              animate={{ opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />
            <motion.path 
              d="M 110,270 L 150,230" 
              stroke="var(--border)" 
              strokeWidth="1.5" 
              strokeDasharray="4 4"
              animate={{ opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            />
            <motion.path 
              d="M 290,270 L 250,230" 
              stroke="var(--border)" 
              strokeWidth="1.5" 
              strokeDasharray="4 4"
              animate={{ opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            />

            {/* Drifting nodes */}
            {/* Node 1: Web (Top-Left) */}
            <motion.g
              animate={{ y: [0, -10, 0], x: [0, 8, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            >
              <circle cx="100" cy="120" r="30" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.5" />
              <foreignObject x="85" y="105" width="30" height="30">
                <div className="text-muted-foreground flex items-center justify-center h-full">
                  <Globe className="size-4" />
                </div>
              </foreignObject>
              <text x="100" y="170" textAnchor="middle" className="text-[10px] font-mono fill-muted-foreground" opacity="0.8">Website</text>
            </motion.g>

            {/* Node 2: Ads/Marketing (Top-Right) */}
            <motion.g
              animate={{ y: [0, 8, 0], x: [0, -12, 0] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <circle cx="300" cy="120" r="30" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.5" />
              <foreignObject x="285" y="105" width="30" height="30">
                <div className="text-muted-foreground flex items-center justify-center h-full">
                  <LineChart className="size-4" />
                </div>
              </foreignObject>
              <text x="300" y="170" textAnchor="middle" className="text-[10px] font-mono fill-muted-foreground" opacity="0.8">Paid Media</text>
            </motion.g>

            {/* Node 3: AI/Ops (Center-Top) */}
            <motion.g
              animate={{ y: [0, -12, 0], x: [0, -6, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            >
              <circle cx="200" cy="70" r="30" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.5" />
              <foreignObject x="185" y="55" width="30" height="30">
                <div className="text-muted-foreground flex items-center justify-center h-full">
                  <Cpu className="size-4" />
                </div>
              </foreignObject>
              <text x="200" y="120" textAnchor="middle" className="text-[10px] font-mono fill-muted-foreground" opacity="0.8">AI & Ops</text>
            </motion.g>

            {/* Node 4: CRM/Data (Bottom-Left) */}
            <motion.g
              animate={{ y: [0, 10, 0], x: [0, 10, 0] }}
              transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              <circle cx="100" cy="280" r="30" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.5" />
              <foreignObject x="85" y="265" width="30" height="30">
                <div className="text-muted-foreground flex items-center justify-center h-full">
                  <Database className="size-4" />
                </div>
              </foreignObject>
              <text x="100" y="330" textAnchor="middle" className="text-[10px] font-mono fill-muted-foreground" opacity="0.8">CRM/Data</text>
            </motion.g>

            {/* Node 5: Automation (Bottom-Right) */}
            <motion.g
              animate={{ y: [0, -8, 0], x: [0, -8, 0] }}
              transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            >
              <circle cx="300" cy="280" r="30" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.5" />
              <foreignObject x="285" y="265" width="30" height="30">
                <div className="text-muted-foreground flex items-center justify-center h-full">
                  <Bot className="size-4" />
                </div>
              </foreignObject>
              <text x="300" y="330" textAnchor="middle" className="text-[10px] font-mono fill-muted-foreground" opacity="0.8">Automation</text>
            </motion.g>

            {/* Center Core: Disconnected */}
            <circle cx="200" cy="200" r="22" fill="var(--background)" stroke="var(--destructive)" strokeWidth="1.5" strokeDasharray="3 3" />
            <foreignObject x="190" y="190" width="20" height="20">
              <div className="text-destructive font-mono text-[9px] font-semibold flex items-center justify-center h-full select-none">
                GAP
              </div>
            </foreignObject>
          </svg>
        </motion.div>
      </div>
    </Section>
  );
}

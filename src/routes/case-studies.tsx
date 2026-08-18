import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CTASection } from "@/components/sections/home/CTASection";
import { CASE_STUDIES } from "@/constants/work";
import { fadeUp, viewportOnce } from "@/hooks/useMotion";
import { Cpu, CheckCircle2, Search, BookOpen, Clock, ArrowRight, Sparkles, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  { key: "all", label: "All Research Papers" },
  { key: "engineering", label: "Software & Web" },
  { key: "ai", label: "AI & Operations" },
  { key: "brand", label: "Brand Strategy" },
  { key: "growth", label: "Growth & Marketing" },
] as const;

export const Route = createFileRoute("/case-studies")({
  head: () => ({
    meta: [
      { title: "Research Papers & Growth Blueprints — Nexora" },
      {
        name: "description",
        content:
          "In-depth research papers & strategic growth blueprints: how Nexora architects AI automation, custom software, brand positioning, and performance growth systems.",
      },
      { property: "og:title", content: "Research Papers — Nexora" },
      {
        property: "og:description",
        content: "Research-backed growth breakdowns, technical stack implementations, and strategic P&L insights.",
      },
      { property: "og:url", content: "/case-studies" },
    ],
    links: [{ rel: "canonical", href: "/case-studies" }],
  }),
  component: CaseStudiesPage,
});

function CaseStudiesPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredStudies =
    activeCategory === "all"
      ? CASE_STUDIES
      : CASE_STUDIES.filter((cs) => cs.categoryKey === activeCategory);

  return (
    <>
      <PageHero
        eyebrow="Research & Strategy Papers"
        title={
          <>
            Growth systems, <span className="text-gradient-primary italic">researched & engineered.</span>
          </>
        }
        lead="In-depth research papers and architectural blueprints on brand positioning, high-performance web engineering, AI automation leverage, and data telemetry."
      />

      <Section className="pt-2 pb-20">
        {/* Category Filter Tabs */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="flex flex-wrap items-center justify-center gap-2 mb-14"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={cn(
                "rounded-full px-4 py-2 text-xs sm:text-sm font-medium transition-all duration-300 border cursor-pointer select-none",
                activeCategory === cat.key
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-surface/80 text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
              )}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Research Papers List */}
        <div className="flex flex-col gap-10">
          <AnimatePresence mode="popLayout">
            {filteredStudies.map((cs) => (
              <motion.div
                key={cs.slug}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <article className="surface-card group grid gap-8 p-8 md:p-10 border border-border/60 hover:border-primary/40 transition-all duration-300 rounded-3xl relative overflow-hidden">
                  {/* Subtle top ambient accent line */}
                  <div
                    aria-hidden
                    className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />

                  {/* Header Row: Topic & Read Time */}
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/40 pb-5">
                    <div className="flex items-center gap-3">
                      <span className="rounded-full bg-primary/10 border border-primary/20 px-3.5 py-1 text-xs font-mono font-medium text-primary">
                        {cs.categoryName}
                      </span>
                      <span className="text-xs font-mono text-muted-foreground">
                        Topic: {cs.topic}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
                      <Clock className="size-3.5 text-primary" />
                      <span>{cs.readTime}</span>
                    </div>
                  </div>

                  {/* Main Grid: Left Stat Block & Right Content */}
                  <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] items-start">
                    {/* Left Column: Stat Highlight & Tech Stack */}
                    <div className="flex flex-col justify-between gap-6 rounded-2xl bg-surface/60 p-6 border border-border/50 h-full">
                      <div>
                        <div className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground font-semibold">
                          Key Benchmark Outcome
                        </div>
                        <div className="mt-2 font-display text-5xl sm:text-6xl font-bold text-foreground tracking-tight">
                          {cs.statHighlight}
                        </div>
                        <div className="mt-1 text-xs uppercase tracking-wider text-primary font-medium">
                          {cs.statLabel}
                        </div>
                      </div>

                      {/* Key Findings List */}
                      <div className="pt-4 border-t border-border/40">
                        <div className="flex items-center gap-1.5 text-xs font-mono uppercase text-muted-foreground mb-3 font-semibold">
                          <Sparkles className="size-3.5 text-primary" />
                          <span>Core Takeaways</span>
                        </div>
                        <ul className="space-y-2.5">
                          {cs.keyFindings.map((finding, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-xs text-foreground/90 leading-relaxed font-medium">
                              <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />
                              <span>{finding}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Tech Stack / Architectural Standards */}
                      {cs.techStack && (
                        <div className="pt-4 border-t border-border/40">
                          <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground mb-2 font-semibold">
                            <Cpu className="size-3.5 text-primary" />
                            <span>Architecture Stack</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {cs.techStack.map((tech) => (
                              <span
                                key={tech}
                                className="rounded-md border border-border/60 bg-background px-2.5 py-1 text-[11px] font-mono text-muted-foreground"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Right Column: Title, Summary & Deep Analysis */}
                    <div className="flex flex-col justify-between gap-6">
                      <div>
                        <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground leading-snug tracking-tight group-hover:text-primary transition-colors">
                          {cs.title}
                        </h2>
                        <div className="mt-4 rounded-xl bg-primary/5 border border-primary/15 p-4">
                          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-primary font-semibold mb-1">
                            <BookOpen className="size-4 text-primary" />
                            <span>Executive Summary</span>
                          </div>
                          <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed">
                            {cs.executiveSummary}
                          </p>
                        </div>

                        <div className="mt-5 space-y-3">
                          <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold">
                            Deep Structural Analysis
                          </h3>
                          <p className="text-sm leading-relaxed text-muted-foreground">
                            {cs.coreAnalysis}
                          </p>
                        </div>
                      </div>

                      {/* Strategic Takeaway Box */}
                      <div className="rounded-xl border border-border/60 bg-surface-card p-4 flex items-start gap-3">
                        <Lightbulb className="size-5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs font-mono uppercase tracking-wider text-primary font-semibold">
                            Strategic Action Item
                          </div>
                          <p className="mt-0.5 text-xs text-foreground/90 leading-relaxed font-medium">
                            {cs.strategicTakeaway}
                          </p>
                        </div>
                      </div>

                      {/* Bottom Footer: SEO Keywords & Direct Strategy CTA */}
                      <div className="pt-4 border-t border-border/30 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <Search className="size-3.5 text-muted-foreground/60" />
                          <span className="text-[10px] font-mono uppercase text-muted-foreground/60 mr-1">Focus Areas:</span>
                          {cs.keywords.map((kw) => (
                            <span key={kw} className="text-[11px] font-mono text-muted-foreground/80 bg-muted/30 px-2 py-0.5 rounded border border-border/40">
                              #{kw}
                            </span>
                          ))}
                        </div>

                        <Button asChild className="rounded-full bg-primary px-5 text-primary-foreground hover:bg-primary/90 text-xs font-medium">
                          <Link to="/contact">
                            Consult On This Strategy
                            <ArrowRight className="ml-1.5 size-3.5" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </article>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </Section>
      <CTASection />
    </>
  );
}

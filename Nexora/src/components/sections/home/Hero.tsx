import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { fadeUp, stagger } from "@/hooks/useMotion";
import { HeroBackground } from "@/components/layout/HeroBackground";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-32 pb-24 sm:pt-40 sm:pb-32">
      <HeroBackground />
      <Container>
        <motion.div
          variants={stagger(0.05, 0.1)}
          initial="hidden"
          animate="visible"
          className="mx-auto flex max-w-4xl flex-col items-center text-center"
        >
          <motion.span
            variants={fadeUp}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-medium text-muted-foreground"
          >
            <Sparkles className="size-3.5 text-primary" />
            AI-powered business growth, all under one roof
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="text-gradient text-5xl leading-[1.02] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.25rem]"
          >
            We help ambitious businesses <span className="text-gradient-primary italic">grow.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-7 max-w-2xl text-lg text-muted-foreground sm:text-xl"
          >
            We combine branding, software, AI automation and performance marketing into one growth system—built to help ambitious businesses scale with clarity and confidence.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            <Button
              asChild
              size="lg"
              className="h-12 rounded-full bg-primary px-6 text-primary-foreground hover:bg-primary/90"
            >
              <Link to="/contact">
                Book a strategy call
                <ArrowRight className="ml-1 size-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="ghost"
              className="h-12 rounded-full border border-border px-6 text-foreground hover:bg-muted"
            >
              <Link to="/services">Explore services</Link>
            </Button>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-16 grid w-full grid-cols-2 gap-6 border-t border-border pt-10 sm:grid-cols-4"
          >
            {[
              ["120+", "Businesses scaled"],
              ["₹400Cr+", "Revenue influenced"],
              ["7", "Practice areas"],
              ["9.6/10", "Client NPS"],
            ].map(([metric, label]) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <div className="font-display text-2xl text-foreground sm:text-3xl">{metric}</div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">
                  {label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

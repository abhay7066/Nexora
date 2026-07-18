import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { fadeUp, viewportOnce } from "@/hooks/useMotion";

export function CTASection() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 50%, oklch(0.82 0.14 78 / 0.18), transparent 70%)",
        }}
      />
      <div aria-hidden className="grid-bg pointer-events-none absolute inset-0 -z-10" />
      <Container>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto flex max-w-3xl flex-col items-center text-center"
        >
          <h2 className="text-gradient text-4xl leading-[1.05] sm:text-5xl md:text-6xl">
            Ready to make Nexora your{" "}
            <span className="text-gradient-primary italic">growth partner?</span>
          </h2>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Book a 30-minute strategy call. We'll audit your growth constraint and show you exactly
            how we'd solve it.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
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
              <Link to="/case-studies">See our work</Link>
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

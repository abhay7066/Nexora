import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/common/Eyebrow";
import { fadeUp, stagger } from "@/hooks/useMotion";

interface PageHeroProps {
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
}

export function PageHero({ eyebrow, title, lead }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: "var(--gradient-hero)" }}
      />
      <div aria-hidden className="grid-bg pointer-events-none absolute inset-0 -z-10" />
      <Container>
        <motion.div
          variants={stagger(0.05, 0.1)}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          <motion.div variants={fadeUp}>
            <Eyebrow>{eyebrow}</Eyebrow>
          </motion.div>
          <motion.h1
            variants={fadeUp}
            className="text-gradient mt-6 text-5xl leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
          >
            {title}
          </motion.h1>
          {lead && (
            <motion.p
              variants={fadeUp}
              className="mt-7 max-w-2xl text-lg text-muted-foreground sm:text-xl"
            >
              {lead}
            </motion.p>
          )}
        </motion.div>
      </Container>
    </section>
  );
}

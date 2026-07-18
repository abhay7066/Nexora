import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ArrowLink } from "@/components/common/ArrowLink";
import { SERVICES } from "@/constants/services";
import { fadeUp, stagger, viewportOnce } from "@/hooks/useMotion";

export function Solutions() {
  return (
    <Section>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow="Solutions"
          title={
            <>
              Seven practice areas.{" "}
              <span className="text-gradient-primary">One accountable team.</span>
            </>
          }
          lead="Each capability is a strong practice on its own — together, they compound."
        />
        <ArrowLink to="/services">All services</ArrowLink>
      </div>

      <motion.div
        variants={stagger(0.05, 0.06)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
      >
        {SERVICES.map((service) => {
          const Icon = service.icon;
          return (
            <motion.article
              key={service.slug}
              variants={fadeUp}
              className="group surface-card flex h-full flex-col p-7 transition-colors hover:border-primary/30"
            >
              <div className="flex items-center justify-between">
                <div className="grid size-11 place-items-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </div>
                <ArrowUpRight className="size-5 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
              </div>
              <h3 className="mt-8 font-display text-xl text-foreground">{service.title}</h3>
              <p className="mt-2 text-sm text-primary/80">{service.tagline}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {service.bullets.map((b) => (
                  <li
                    key={b}
                    className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                  >
                    {b}
                  </li>
                ))}
              </ul>
            </motion.article>
          );
        })}
      </motion.div>
    </Section>
  );
}

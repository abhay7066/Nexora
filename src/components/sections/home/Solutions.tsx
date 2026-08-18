import { useState } from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ArrowLink } from "@/components/common/ArrowLink";
import { SERVICES } from "@/constants/services";
import { stagger, viewportOnce } from "@/hooks/useMotion";
import type { Service } from "@/types/content";
import { AnimatedServiceCard } from "@/components/sections/services/AnimatedServiceCard";
import { CapabilityModal } from "@/components/sections/services/CapabilityModal";

export function Solutions() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  return (
    <Section>
      <CapabilityModal
        service={selectedService}
        open={Boolean(selectedService)}
        onOpenChange={(open) => {
          if (!open) setSelectedService(null);
        }}
      />

      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow="Solutions"
          title={
            <>
              Integrated capabilities.{" "}
              <span className="text-gradient-primary">One accountable team.</span>
            </>
          }
          lead="Each capability is a strong practice on its own — together, they compound into an end-to-end growth system."
        />
        <ArrowLink to="/services">All services</ArrowLink>
      </div>

      <motion.div
        variants={stagger(0.06, 0.08)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {SERVICES.map((service) => (
          <AnimatedServiceCard
            key={service.slug}
            service={service}
            onSelect={(s) => setSelectedService(s)}
          />
        ))}
      </motion.div>
    </Section>
  );
}

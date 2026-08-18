import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "@/components/layout/Section";
import { SERVICES } from "@/constants/services";
import { fadeUp, viewportOnce } from "@/hooks/useMotion";
import { cn } from "@/lib/utils";
import type { Service } from "@/types/content";
import { AnimatedServiceCard } from "@/components/sections/services/AnimatedServiceCard";
import { CapabilityModal } from "@/components/sections/services/CapabilityModal";

const CATEGORIES = [
  { key: "all", label: "All Capabilities" },
  { key: "engineering", label: "Software & Web" },
  { key: "ai", label: "AI & Operations" },
  { key: "brand", label: "Brand & Positioning" },
  { key: "growth", label: "Growth & Marketing" },
] as const;

export function ServiceShowcase() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const filteredServices =
    activeCategory === "all"
      ? SERVICES
      : SERVICES.filter((s) => s.categoryKey === activeCategory);

  return (
    <Section className="pt-2 pb-20">
      {/* Capability Modal Dialog */}
      <CapabilityModal
        service={selectedService}
        open={Boolean(selectedService)}
        onOpenChange={(open) => {
          if (!open) setSelectedService(null);
        }}
      />

      {/* Domain Filter Tabs */}
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

      {/* Services Animated Cards Grid */}
      <div className="grid gap-8 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filteredServices.map((service) => (
            <motion.div
              key={service.slug}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
            >
              <AnimatedServiceCard
                service={service}
                onSelect={(s) => setSelectedService(s)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </Section>
  );
}

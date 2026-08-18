import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Layers } from "lucide-react";
import type { Service } from "@/types/content";

interface AnimatedServiceCardProps {
  service: Service;
  onSelect: (service: Service) => void;
}

export function AnimatedServiceCard({ service, onSelect }: AnimatedServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const Icon = service.icon;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      onClick={() => onSelect(service)}
      className="group surface-card relative flex cursor-pointer flex-col justify-between overflow-hidden p-8 border border-border/60 hover:border-primary/50 transition-colors duration-300 rounded-2xl select-none"
    >
      {/* Interactive Cursor Spotlight Radial Overlay */}
      {isHovered && (
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-px transition-opacity duration-300 rounded-2xl"
          style={{
            background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, oklch(0.45 0.16 300 / 0.14), transparent 80%)`,
          }}
        />
      )}

      {/* Card Content */}
      <div className="relative z-10">
        <div className="flex items-center justify-between gap-4">
          <motion.div
            animate={isHovered ? { scale: 1.08, rotate: 3 } : { scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 18 }}
            className="grid size-12 place-items-center rounded-xl bg-primary/10 text-primary border border-primary/20 shadow-sm"
          >
            <Icon className="size-6" />
          </motion.div>

          <div className="flex items-center gap-2">
            <span className="rounded-full bg-background/80 border border-border/60 px-3 py-1 text-[11px] font-mono text-muted-foreground">
              {service.categoryName}
            </span>
            <div className="grid size-8 place-items-center rounded-full bg-surface border border-border text-muted-foreground group-hover:border-primary/40 group-hover:text-primary transition-all duration-300">
              <ArrowUpRight className="size-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </div>

        <h3 className="mt-6 font-display text-2xl font-semibold text-foreground tracking-tight group-hover:text-primary transition-colors">
          {service.title}
        </h3>
        <p className="mt-2 text-sm font-medium text-primary/90">{service.tagline}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {service.description}
        </p>

        {/* Deliverables List */}
        <div className="mt-6 pt-5 border-t border-border/40">
          <div className="flex items-center gap-1.5 text-xs font-mono uppercase text-muted-foreground mb-3 tracking-wider">
            <Layers className="size-3.5 text-primary" />
            <span>Key Scope & Deliverables</span>
          </div>
          <ul className="grid gap-2 sm:grid-cols-2">
            {service.bullets.map((bullet) => (
              <li key={bullet} className="flex items-center gap-2 text-xs text-foreground/90 font-medium">
                <CheckCircle2 className="size-3.5 text-primary shrink-0" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Card Footer */}
      <div className="relative z-10 mt-8 pt-4 border-t border-border/30 flex items-center justify-between text-xs font-mono text-muted-foreground">
        <span>Click card to explore details</span>
        <span className="text-primary font-semibold group-hover:underline">Deep Dive →</span>
      </div>
    </motion.div>
  );
}

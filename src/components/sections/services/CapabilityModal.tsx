import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Cpu, Layers, Sparkles } from "lucide-react";
import type { Service } from "@/types/content";
import { Button } from "@/components/ui/button";

interface CapabilityModalProps {
  service: Service | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CapabilityModal({ service, open, onOpenChange }: CapabilityModalProps) {
  if (!service) return null;
  const Icon = service.icon;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-surface border-border/80 p-6 sm:p-8 shadow-elevated">
        <DialogHeader className="gap-2">
          <div className="flex items-center gap-3">
            <div className="grid size-10 sm:size-12 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary border border-primary/20">
              <Icon className="size-5 sm:size-6" />
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-primary font-semibold">
                {service.categoryName}
              </span>
              <DialogTitle className="text-xl sm:text-2xl font-display font-bold text-foreground">
                {service.title}
              </DialogTitle>
            </div>
          </div>
          <DialogDescription className="text-sm font-medium text-primary/90 mt-1">
            {service.tagline}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-6 text-sm">
          <p className="text-muted-foreground leading-relaxed">
            {service.description} Our senior operators design and deploy this capability directly into your core business infrastructure, ensuring complete system alignment.
          </p>

          {/* Key Scope Checklist */}
          <div className="rounded-xl border border-border/60 bg-surface-card p-5">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3 font-semibold">
              <Layers className="size-4 text-primary" />
              <span>Core Included Scope & Deliverables</span>
            </div>
            <ul className="grid gap-2.5 sm:grid-cols-2">
              {service.bullets.map((b) => (
                <li key={b} className="flex items-center gap-2 text-xs text-foreground font-medium">
                  <CheckCircle2 className="size-4 text-primary shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Execution Timeline Phases */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold">
              <Sparkles className="size-4 text-primary" />
              <span>Execution & Delivery Process</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-border/40 p-3 bg-background/50">
                <div className="text-[10px] font-mono text-primary uppercase font-bold">01 · Audit</div>
                <div className="text-xs font-semibold text-foreground mt-1">Diagnostic POV</div>
                <div className="text-[11px] text-muted-foreground mt-0.5">Identify friction & bottlenecks</div>
              </div>
              <div className="rounded-lg border border-border/40 p-3 bg-background/50">
                <div className="text-[10px] font-mono text-primary uppercase font-bold">02 · Build</div>
                <div className="text-xs font-semibold text-foreground mt-1">Sprint Delivery</div>
                <div className="text-[11px] text-muted-foreground mt-0.5">2-4 week deployment cycle</div>
              </div>
              <div className="rounded-lg border border-border/40 p-3 bg-background/50">
                <div className="text-[10px] font-mono text-primary uppercase font-bold">03 · Scale</div>
                <div className="text-xs font-semibold text-foreground mt-1">Compounding</div>
                <div className="text-[11px] text-muted-foreground mt-0.5">Continuous telemetry & growth</div>
              </div>
            </div>
          </div>

          {/* Direct CTA Action */}
          <div className="pt-4 border-t border-border/40 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-1 text-xs font-mono text-muted-foreground">
              <Cpu className="size-3.5 text-primary" />
              <span>Capability Slug: #{service.slug}</span>
            </div>
            <Button asChild className="rounded-full bg-primary px-6 text-primary-foreground hover:bg-primary/90">
              <Link to="/contact" onClick={() => onOpenChange(false)}>
                Engage {service.title}
                <ArrowRight className="ml-1.5 size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

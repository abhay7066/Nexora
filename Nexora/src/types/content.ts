import type { LucideIcon } from "lucide-react";

export interface Service {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  bullets: string[];
  categoryKey: "engineering" | "ai" | "brand" | "growth";
  categoryName: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  topic: string;
  categoryKey: "engineering" | "ai" | "brand" | "growth";
  categoryName: string;
  readTime: string;
  statHighlight: string;
  statLabel: string;
  executiveSummary: string;
  keyFindings: string[];
  coreAnalysis: string;
  strategicTakeaway: string;
  techStack?: string[];
  keywords: string[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  client: string;
  category: string;
  tagline: string;
  deliverables: string[];
  impactMetric: string;
  impactLabel: string;
  featuredYear: string;
}

export interface NavItem {
  label: string;
  to: string;
}

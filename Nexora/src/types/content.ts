import type { LucideIcon } from "lucide-react";

export interface Service {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  bullets: string[];
}

export interface Industry {
  slug: string;
  name: string;
  description: string;
  icon: LucideIcon;
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
  client: string;
  title: string;
  category: string;
  metric: string;
  metricLabel: string;
  summary: string;
}

export interface Insight {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
}

export interface NavItem {
  label: string;
  to: string;
}

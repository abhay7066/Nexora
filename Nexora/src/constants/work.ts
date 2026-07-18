import type { CaseStudy } from "@/types/content";

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "northline-manufacturing",
    client: "Northline Manufacturing",
    title: "Re-branded a 30-year factory into an export-grade category leader.",
    category: "Branding · Website · Performance",
    metric: "3.2×",
    metricLabel: "Qualified pipeline",
    summary: "Full rebrand, new website and outbound engine built for international buyers.",
  },
  {
    slug: "verra-d2c",
    client: "Verra",
    title: "Scaled a D2C brand from ₹40L to ₹5Cr monthly with a full-stack growth system.",
    category: "D2C · Paid · Lifecycle",
    metric: "12.5×",
    metricLabel: "Revenue in 9 months",
    summary:
      "Creative engine, paid media and retention overhaul with an AI-assisted content stack.",
  },
  {
    slug: "meridian-realty",
    client: "Meridian Realty",
    title: "Automated sales operations for a premium real estate developer.",
    category: "AI Automation · Custom Software",
    metric: "40h",
    metricLabel: "Saved / week",
    summary: "Custom CRM, WhatsApp automation and lead scoring agents integrated across teams.",
  },
];

export const FEATURED_WORK = CASE_STUDIES.slice(0, 3);

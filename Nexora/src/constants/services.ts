import { Sparkles, Globe, Code2, Smartphone, Bot, LineChart, Compass } from "lucide-react";
import type { Service } from "@/types/content";

export const SERVICES: Service[] = [
  {
    slug: "branding",
    title: "Brand Strategy & Visual Identity",
    tagline: "Identity that earns trust on sight.",
    description:
      "Category positioning, visual identity systems, and brand guidelines that turn your business into an undeniable choice.",
    icon: Sparkles,
    bullets: ["Brand positioning", "Visual identity system", "Voice & messaging guide", "Design tokens"],
    categoryKey: "brand",
    categoryName: "Brand & Positioning",
  },
  {
    slug: "web-development",
    title: "High-Performance Web Systems",
    tagline: "Websites engineered to convert, not just impress.",
    description:
      "SEO-optimized, ultra-fast marketing websites and headless storefronts engineered for pipeline and speed.",
    icon: Globe,
    bullets: ["Headless storefronts", "Marketing sites", "SEO architecture", "CMS integration"],
    categoryKey: "engineering",
    categoryName: "Software & Web",
  },
  {
    slug: "custom-software",
    title: "Custom SaaS & Internal Tools",
    tagline: "Web platforms and admin portals that compound leverage.",
    description:
      "Tailored SaaS web apps, customer portals, and internal telemetry tools built around your business operations.",
    icon: Code2,
    bullets: ["SaaS web platforms", "Operations admin portals", "Custom API systems", "Real-time telemetry"],
    categoryKey: "engineering",
    categoryName: "Software & Web",
  },
  {
    slug: "mobile-apps",
    title: "Cross-Platform Mobile Apps",
    tagline: "Apps your customers actually use and retain.",
    description: "Native-quality iOS and Android mobile applications built for high retention, speed, and smooth UX.",
    icon: Smartphone,
    bullets: ["iOS & Android apps", "React Native", "App Store strategy", "Offline-first UX"],
    categoryKey: "engineering",
    categoryName: "Software & Web",
  },
  {
    slug: "ai-automation",
    title: "AI Agents & Workflow Automation",
    tagline: "Replace repetitive busywork with intelligent AI agents.",
    description:
      "Autonomous AI agents, WhatsApp API bots, and LLM integrations that slash operating cost and multiply leverage.",
    icon: Bot,
    bullets: ["Autonomous AI agents", "Meta WhatsApp API", "LLM integrations", "Workflow webhooks"],
    categoryKey: "ai",
    categoryName: "AI & Operations",
  },
  {
    slug: "performance-marketing",
    title: "Performance & Growth Marketing",
    tagline: "Predictable customer pipeline, measured strictly against unit economics.",
    description: "Paid acquisition, conversion rate optimization (CRO), and lifecycle CRM automation engineered around CAC/LTV.",
    icon: LineChart,
    bullets: ["Paid media management", "Conversion optimization", "Lifecycle CRM", "Attribution analytics"],
    categoryKey: "growth",
    categoryName: "Growth & Marketing",
  },
  {
    slug: "business-consulting",
    title: "GTM & Growth Advisory",
    tagline: "Senior operator partnership, not vendor at arm's length.",
    description:
      "Go-to-market strategy, operational leverage consulting, and growth advisory from senior operators who build and scale.",
    icon: Compass,
    bullets: ["GTM strategy design", "Unit economics audit", "Operational leverage", "Founder advisory"],
    categoryKey: "growth",
    categoryName: "Growth & Marketing",
  },
];

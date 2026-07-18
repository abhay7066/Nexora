import { Sparkles, Globe, Code2, Smartphone, Bot, LineChart, Compass } from "lucide-react";
import type { Service } from "@/types/content";

export const SERVICES: Service[] = [
  {
    slug: "branding",
    title: "Branding",
    tagline: "Identity that earns trust on sight.",
    description:
      "Strategy, positioning and visual systems that turn your business into a category-defining brand.",
    icon: Sparkles,
    bullets: ["Brand strategy", "Visual identity", "Messaging & voice"],
  },
  {
    slug: "web-development",
    title: "Website Development",
    tagline: "Websites that convert, not just impress.",
    description:
      "High-performance, SEO-ready websites engineered for speed, credibility and pipeline.",
    icon: Globe,
    bullets: ["Marketing sites", "E-commerce", "Headless CMS"],
  },
  {
    slug: "custom-software",
    title: "Custom Software",
    tagline: "Internal tools that compound leverage.",
    description:
      "Web platforms, dashboards and internal tools tailored to your operations and data.",
    icon: Code2,
    bullets: ["SaaS platforms", "Admin tools", "API systems"],
  },
  {
    slug: "mobile-apps",
    title: "Mobile Applications",
    tagline: "Apps your customers actually keep.",
    description: "Cross-platform iOS and Android apps built for retention, speed and scale.",
    icon: Smartphone,
    bullets: ["iOS & Android", "React Native", "App store strategy"],
  },
  {
    slug: "ai-automation",
    title: "AI Automation",
    tagline: "Replace busywork with intelligent workflows.",
    description:
      "AI agents, workflow automation and integrations that reduce cost and multiply output.",
    icon: Bot,
    bullets: ["AI agents", "Workflow automation", "LLM integrations"],
  },
  {
    slug: "performance-marketing",
    title: "Performance Marketing",
    tagline: "Predictable pipeline, measured to the rupee.",
    description: "Paid media, SEO and lifecycle marketing engineered around unit economics.",
    icon: LineChart,
    bullets: ["Paid media", "SEO", "Lifecycle & CRM"],
  },
  {
    slug: "business-consulting",
    title: "Business Consulting",
    tagline: "A partner in the room, not a vendor at arm's length.",
    description:
      "Growth strategy, GTM and operational consulting from operators who've built and scaled.",
    icon: Compass,
    bullets: ["Growth strategy", "GTM design", "Operational leverage"],
  },
];

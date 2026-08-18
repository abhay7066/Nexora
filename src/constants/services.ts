import { Sparkles, Globe, Code2, Smartphone, Bot, LineChart } from "lucide-react";
import type { Service } from "@/types/content";

export const SERVICES: Service[] = [
  {
    slug: "branding",
    title: "Brand Strategy & Visual Identity",
    tagline: "Identity that earns trust on sight.",
    description:
      "Build a distinctive brand that communicates clarity, credibility, and purpose at every touchpoint. We define your brand positioning, visual language, and messaging to create a consistent identity that connects with your audience and sets you apart from the competition.",
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
      "Digital experiences built to perform, convert, and scale. We engineer SEO-optimized marketing websites and headless storefronts that combine exceptional speed, seamless user experiences, and scalable architecture—turning your website into a high-performing engine for growth.",
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
      "Purpose-built SaaS platforms, customer portals, and internal tools designed around the way your business actually operates. We build scalable digital systems that simplify workflows, connect your teams and data, and integrate seamlessly with your existing infrastructure.",
    icon: Code2,
    bullets: ["SaaS web platforms", "Operations admin portals", "Custom API systems", "Real-time telemetry"],
    categoryKey: "engineering",
    categoryName: "Software & Web",
  },
  {
    slug: "mobile-apps",
    title: "Cross-Platform Mobile Apps",
    tagline: "Apps your customers actually use and retain.",
    description:
      "Native-quality iOS and Android applications engineered for speed, reliability, and seamless user experiences. We build mobile products that extend your digital ecosystem, integrate with your core systems, and deliver a consistent experience across every device.",
    icon: Smartphone,
    bullets: ["iOS & Android apps", "Seamless Experience", "App Store strategy", "Offline-First Approach"],
    categoryKey: "engineering",
    categoryName: "Software & Web",
  },
  {
    slug: "ai-automation",
    title: "AI Agents & Workflow Automation",
    tagline: "Replace repetitive busywork with intelligent AI agents.",
    description:
      "AI agents, WhatsApp automation, and LLM-powered systems built to automate repetitive work, accelerate decisions, and scale operations. We integrate intelligent capabilities directly into your existing workflows, systems, and business infrastructure.",
    icon: Bot,
    bullets: ["Autonomous AI agents", "Meta WhatsApp API", "LLM integrations", "Workflow webhooks"],
    categoryKey: "ai",
    categoryName: "AI & Operations",
  },
  {
    slug: "performance-marketing",
    title: "Performance & Growth Marketing",
    tagline: "Predictable customer pipeline, measured strictly against unit economics.",
    description:
      "Paid acquisition, conversion optimization, and lifecycle automation built around measurable growth. We align every channel, campaign, and customer touchpoint to improve acquisition efficiency, increase retention, and maximize long-term customer value.",
    icon: LineChart,
    bullets: ["Paid media management", "Conversion optimization", "Lifecycle CRM", "Attribution analytics"],
    categoryKey: "growth",
    categoryName: "Growth & Marketing",
  },
];

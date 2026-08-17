import type { CaseStudy, PortfolioItem } from "@/types/content";

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: "veritas-saas-platform",
    title: "Veritas Cloud Platform",
    client: "Veritas Analytics",
    category: "SaaS Product · Brand Identity · Design System",
    tagline: "End-to-end cloud telemetry portal and unified design system built for rapid enterprise scale.",
    deliverables: ["Product Design (UI/UX)", "Design System", "React Web Platform", "Brand Identity"],
    impactMetric: "99.9%",
    impactLabel: "Platform Uptime & Speed Rating",
    featuredYear: "2026",
  },
  {
    id: "kinetix-d2c-storefront",
    title: "Kinetix Performance Gear",
    client: "Kinetix Athletic",
    category: "D2C Storefront · Mobile Web · Paid Growth",
    tagline: "Ultra-fast headless shopping experience built with instant checkout and dynamic product bundles.",
    deliverables: ["Headless Storefront", "Mobile UX", "Shopify Integration", "Ad Creative Engine"],
    impactMetric: "2.8×",
    impactLabel: "Mobile Checkout Conversion",
    featuredYear: "2025",
  },
  {
    id: "pulsecare-patient-portal",
    title: "PulseCare Telehealth Suite",
    client: "PulseCare Health",
    category: "HealthTech Portal · Mobile App · Compliance",
    tagline: "HIPAA-compliant web portal and mobile app enabling instant remote doctor consultations.",
    deliverables: ["Cross-Platform Mobile App", "Web Dashboard", "Video WebRTC", "Patient Records API"],
    impactMetric: "15 Min",
    impactLabel: "Avg Consultation Onboarding",
    featuredYear: "2025",
  },
  {
    id: "nexus-logistics-dashboard",
    title: "Nexus Fleet Dispatch Portal",
    client: "Nexus Logistics",
    category: "Internal Tools · AI Automation · Operations",
    tagline: "Automated route optimization and driver dispatch dashboard built to eliminate manual logistics paperwork.",
    deliverables: ["Custom Admin Portal", "AI Route Optimizer", "Driver Mobile App", "Real-time Telemetry"],
    impactMetric: "40h",
    impactLabel: "Saved Per Dispatcher / Week",
    featuredYear: "2025",
  },
  {
    id: "aether-merchant-dashboard",
    title: "Aether Payment Merchant Hub",
    client: "Aether Financial",
    category: "FinTech Dashboard · Web App · Security",
    tagline: "Dark-mode financial telemetry and instant merchant onboarding portal with live fraud detection analytics.",
    deliverables: ["Merchant Dashboard", "Automated KYC Engine", "tRPC API System", "Transaction Analytics"],
    impactMetric: "3.4×",
    impactLabel: "Faster Merchant KYC Onboarding",
    featuredYear: "2026",
  },
  {
    id: "lumina-retail-brand-identity",
    title: "Lumina Living Digital Experience",
    client: "Lumina Home",
    category: "Brand Strategy · Web Architecture · Headless Site",
    tagline: "Premium visual brand redesign and immersive 3D lifestyle product showcases.",
    deliverables: ["Brand Identity & Voice", "Visual Guidelines", "Interactive Product 3D", "Headless Web"],
    impactMetric: "4.5×",
    impactLabel: "User Engagement Duration",
    featuredYear: "2026",
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "brand-identity-category-positioning-study",
    title: "The ROI of Brand Strategy: How Visual Identity & Category Positioning Command 3× Pricing Power",
    topic: "Category Dominance & Brand Trust",
    categoryKey: "brand",
    categoryName: "Brand Strategy",
    readTime: "5 min read",
    statHighlight: "3.2×",
    statLabel: "Higher Customer Lifetime Value (LTV)",
    executiveSummary:
      "Analysis of growth-stage companies reveals that businesses investing in unified visual identity and clear category positioning achieve 3.2× higher gross margins and 45% lower customer churn compared to fragmented brands.",
    keyFindings: [
      "Positioning clarity reduces customer acquisition costs (CAC) by 38%.",
      "Consistent visual identity across web touchpoints increases conversion velocity by 2.4×.",
      "Undifferentiated brands spend 3× more on paid acquisition to overcome identity trust deficits.",
    ],
    coreAnalysis:
      "In saturated markets, product features alone no longer create defensible moats. When prospective buyers encounter fragmented typography, mismatched design systems, or vague value propositions, cognitive friction increases. Strategic brand positioning communicates category dominance within the first 3 seconds, transforming cold traffic into high-intent buyers.",
    strategicTakeaway:
      "Brand strategy is not an aesthetic luxury; it is an active P&L lever that reduces acquisition friction, builds trust, and commands pricing power.",
    techStack: ["Design Systems", "Figma", "Visual Guidelines", "Typography Architecture", "Brand Voice System"],
    keywords: ["Brand Positioning Strategy", "B2B Brand Identity Design", "Category Leadership", "Design Systems for Growth", "Brand Authority ROI"],
  },
  {
    slug: "web-performance-core-vitals-conversion-study",
    title: "The Speed Dividend: How Sub-Second Web Performance Elevates Conversion Rates in the Modern Era",
    topic: "Web Engineering & Conversion Optimization",
    categoryKey: "engineering",
    categoryName: "Software & Web",
    readTime: "6 min read",
    statHighlight: "< 100ms",
    statLabel: "Optimal Initial Render Latency",
    executiveSummary:
      "Research across modern web architectures proves that every 100ms reduction in initial page load time yields a 7.5% increase in checkout and lead-form completion rates.",
    keyFindings: [
      "Page load speeds exceeding 2.5 seconds increase mobile bounce rates by 53%.",
      "Headless React/Vite architectures reduce initial server response times by 80% compared to legacy CMS templates.",
      "Optimized Core Web Vitals directly improve organic search rankings (SEO) and reduce Google Ads Cost-Per-Click (CPC).",
    ],
    coreAnalysis:
      "Legacy monolithic website templates are overburdened with third-party tracking scripts, unoptimized assets, and slow render trees. Modern web engineering uses static generation, edge API routes, and optimized bundle splitting to deliver instant sub-second paints, creating frictionless buyer journeys that convert at significantly higher rates.",
    strategicTakeaway:
      "Website speed is your primary digital storefront experience. Engineered performance directly inflates conversion rates and organic SEO dominance.",
    techStack: ["React 19", "Vite", "Tailwind CSS", "Cloudflare Workers", "TanStack Router"],
    keywords: ["Headless Web Development", "Core Web Vitals Optimization", "React Performance Engineering", "High Converting Web Architecture", "SEO Page Speed"],
  },
  {
    slug: "ai-workflow-automation-operational-leverage-study",
    title: "Operational Leverage: Deploying AI Agents & WhatsApp Cloud APIs to Reclaim 70%+ Ops Overhead",
    topic: "AI Automation & Operations",
    categoryKey: "ai",
    categoryName: "AI & Operations",
    readTime: "7 min read",
    statHighlight: "70%",
    statLabel: "Reduction in Manual Data Operations",
    executiveSummary:
      "Study of operational workflows demonstrates that embedding autonomous AI agents and Meta WhatsApp Cloud API webhooks eliminates repetitive manual data entry, saving 40+ hours per operator per week.",
    keyFindings: [
      "Custom LLM pipelines process inbound lead qualification in < 5 seconds with 94%+ intent accuracy.",
      "Automated WhatsApp customer support bots handle 78% of routine buyer inquiries without human escalation.",
      "Replacing manual spreadsheet copying with event-driven webhooks slashes operational error rates by 99%.",
    ],
    coreAnalysis:
      "Modern businesses don't need more tools; they need automated system alignment. When internal databases, CRMs, and messaging channels operate in isolation, headcount costs balloon. AI-native workflow automation connects your tech stack, running 24/7 background tasks that qualify leads, sync CRM data, and dispatch alerts instantaneously.",
    strategicTakeaway:
      "AI automation is not about replacing headcount—it is about granting your team infinite operational leverage to focus purely on high-margin strategic growth.",
    techStack: ["Python", "LangChain", "OpenAI API", "WhatsApp Cloud API", "PostgreSQL", "Supabase Webhooks"],
    keywords: ["AI Workflow Automation", "WhatsApp Business API Integration", "Custom LLM AI Agents", "Operational Friction Reduction", "SalesOps Automation"],
  },
  {
    slug: "performance-marketing-multi-touch-attribution-study",
    title: "Beyond Vanity Metrics: Multi-Touch Telemetry & Unit Economics in Modern Performance Growth",
    topic: "Performance Marketing & Analytics",
    categoryKey: "growth",
    categoryName: "Growth & Marketing",
    readTime: "5 min read",
    statHighlight: "2.8×",
    statLabel: "Blended Customer Acquisition Efficiency",
    executiveSummary:
      "Analysis of performance marketing campaigns reveals that businesses measuring blended Customer Acquisition Cost (CAC) against Customer Lifetime Value (LTV) achieve 2.8× higher marketing efficiency than those relying on isolated platform ad metrics.",
    keyFindings: [
      "Single-channel attribution models miscalculate true customer acquisition costs by up to 42%.",
      "Integrating paid ad channels directly with CRM conversion webhooks improves ad algorithm targeting efficiency by 65%.",
      "High-retention creative engines focused on customer pain points outperform trendy viral ads in 90-day LTV.",
    ],
    coreAnalysis:
      "Relying on ad platform vanity metrics (clicks, impressions) leads to misallocated marketing budgets. Sustainable growth requires unified telemetry—connecting paid media campaigns directly to back-end revenue, customer retention rates, and unit economics.",
    strategicTakeaway:
      "Marketing efficiency is governed by data telemetry. Aligning paid acquisition with backend sales data turns advertising from an expense into a predictable growth engine.",
    techStack: ["Google Analytics 4", "Meta Conversions API", "PostHog", "HubSpot CRM", "Custom Conversion Webhooks"],
    keywords: ["Performance Marketing Strategy", "Customer Acquisition CAC LTV", "Multi-Touch Growth Telemetry", "Paid Media Optimization", "Conversion Rate Optimization CRO"],
  },
  {
    slug: "cross-platform-saas-mobile-portal-study",
    title: "The Unified Platform: How Integrated Web & Mobile Portals Slash Churn & Multiply LTV",
    topic: "SaaS & Mobile Software Architecture",
    categoryKey: "engineering",
    categoryName: "Software & Web",
    readTime: "6 min read",
    statHighlight: "45%",
    statLabel: "Lower Churn Rate via Self-Service Portals",
    executiveSummary:
      "Research across digital platforms demonstrates that businesses providing self-service web dashboards and mobile app portals reduce customer support tickets by 60% and boost 12-month retention by 45%.",
    keyFindings: [
      "Self-service onboarding portals accelerate time-to-value for new customers by 4.2×.",
      "Cross-platform React Native mobile apps achieve 95%+ code sharing between iOS and Android, cutting dev costs in half.",
      "Real-time push notifications and telemetry dashboards increase monthly active user (MAU) engagement by 85%.",
    ],
    coreAnalysis:
      "Fragmented customer experiences destroy retention. When customers must wait days for email support or navigate clunky legacy forms, satisfaction drops. Unified SaaS web portals and mobile applications empower users with instant self-service access, real-time status tracking, and seamless account control.",
    strategicTakeaway:
      "Customer experience is your strongest retention lever. Investing in seamless software infrastructure builds long-term enterprise value.",
    techStack: ["React Native", "TypeScript", "tRPC", "Node.js", "Redis", "Expo Push API"],
    keywords: ["SaaS Platform Engineering", "React Native Mobile App Development", "Customer Self-Service Portals", "User Retention Optimization", "B2B Web Application Architecture"],
  },
];

export const FEATURED_WORK = PORTFOLIO_ITEMS.slice(0, 3);

/**
 * Site-wide content, ported verbatim from the production React build's
 * src/constants/*.ts and src/types/content.ts. Every string here is
 * rendered somewhere on the site — change it once and it updates everywhere.
 */

export const NAV_ITEMS = [
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Case Studies", to: "/case-studies" },
  // { label: "Work", to: "/portfolio" }, // commented out on the live site — kept as a redirect only
];

export const COMPANY = {
  name: "Nexora",
  tagline: "AI-Powered Business Growth Company",
  description:
    "We help ambitious businesses grow with Branding, Software Development, AI Automation and Performance Marketing—all under one roof.",
  email: "nexora7778@gmail.com",
  phone: "+91 93278 41812",
  phoneHref: "tel:+919327841812",
  location: "Global · Remote-first",
};

export const SITE_TITLE = "Nexora — AI-Powered Business Growth Company";
export const SITE_DESC =
  "Nexora helps ambitious businesses grow with branding, software, AI automation and performance marketing — all under one roof.";

/** Icon values are lucide-astro component names, resolved in Icon.astro. */
export const VALUES = [
  {
    icon: "Compass",
    title: "Outcome over output",
    description:
      "We don't sell deliverables. We commit to the number that actually moves your business — revenue, retention, pipeline, margin.",
  },
  {
    icon: "Layers",
    title: "One system, not silos",
    description:
      "Brand, product, automation and marketing designed to compound together. No handoffs falling through cracks.",
  },
  {
    icon: "ShieldCheck",
    title: "Radical accountability",
    description:
      "We publish our targets, our progress and our misses. If we ship it, we own it — post-launch and beyond.",
  },
  {
    icon: "Sparkles",
    title: "AI-native, human-led",
    description:
      "We use AI to move ten times faster, but every strategic decision is made by senior operators — not a model.",
  },
  {
    icon: "Target",
    title: "Long arc, not quarter arc",
    description:
      "We optimise for what still compounds in three years, not what looks good in the next board deck.",
  },
  {
    icon: "Users",
    title: "Extension of your team",
    description:
      "We show up in your standups, your Slack and your strategy days. Not a vendor — a partner in the room.",
  },
];

export const STATS = [
  {
    value: "100%",
    label: "Direct Founder Access",
    detail: "You work directly with senior builders, zero account manager pass-offs",
  },
  {
    value: "< 24h",
    label: "Response SLA",
    detail: "Embedded in your daily Slack, standups, and strategy discussions",
  },
  {
    value: "2–4 Wks",
    label: "Sprint Velocity",
    detail: "Shipping production-ready brand, software and AI layers in weeks",
  },
  {
    value: "1 System",
    label: "Unified Growth",
    detail: "Brand, product, AI automation and marketing designed to compound together",
  },
];

export const SERVICES = [
  {
    slug: "branding",
    title: "Brand Strategy & Visual Identity",
    tagline: "Identity that earns trust on sight.",
    description:
      "Build a distinctive brand that communicates clarity, credibility, and purpose at every touchpoint. We define your brand positioning, visual language, and messaging to create a consistent identity that connects with your audience and sets you apart from the competition.",
    icon: "Sparkles",
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
    icon: "Globe",
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
    icon: "Code2",
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
    icon: "Smartphone",
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
    icon: "Bot",
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
    icon: "LineChart",
    bullets: ["Paid media management", "Conversion optimization", "Lifecycle CRM", "Attribution analytics"],
    categoryKey: "growth",
    categoryName: "Growth & Marketing",
  },
];

/** Category filter tabs shared by the Services page. */
export const SERVICE_CATEGORIES = [
  { key: "all", label: "All Capabilities" },
  { key: "engineering", label: "Software & Web" },
  { key: "ai", label: "AI & Operations" },
  { key: "brand", label: "Brand & Positioning" },
  { key: "growth", label: "Growth & Marketing" },
];

/** Category filter tabs shared by the Case Studies page (different labels/keys than Services). */
export const CASE_STUDY_CATEGORIES = [
  { key: "all", label: "All Research Papers" },
  { key: "engineering", label: "Software & Web" },
  { key: "ai", label: "AI & Operations" },
  { key: "brand", label: "Brand Strategy" },
  { key: "growth", label: "Growth & Marketing" },
];

/** The Services page's own 4-phase operating rhythm (Process.tsx's inline data — not the unused PROCESS_STEPS constant). */
export const SERVICE_PROCESS_STEPS = [
  {
    icon: "Search",
    step: "01",
    title: "Diagnose",
    timeframe: "Days 1–7",
    description:
      "We audit your brand position, tech stack, funnel bottlenecks, and operations to pinpoint the single true growth constraint.",
    deliverable: "P&L Constraint POV",
  },
  {
    icon: "Compass",
    step: "02",
    title: "Architect",
    timeframe: "Days 8–14",
    description:
      "We design a custom, end-to-end growth blueprint — combining software architecture, AI automation, and performance channels.",
    deliverable: "System Blueprint & Roadmap",
  },
  {
    icon: "Rocket",
    step: "03",
    title: "Build",
    timeframe: "Weeks 2–4",
    description:
      "Senior engineering and creative squads execute rapid 2–4 week deployment sprints with live stage previews and full code ownership.",
    deliverable: "Production Code Deployment",
  },
  {
    icon: "TrendingUp",
    step: "04",
    title: "Compound",
    timeframe: "Ongoing",
    description:
      "We stay embedded as your growth operators — monitoring real-time telemetry, optimizing conversion loops, and scaling revenue.",
    deliverable: "Continuous Telemetry & Scale",
  },
];

/** Fixed 3-phase execution process shown inside every CapabilityModal (same for every service). */
export const MODAL_EXECUTION_PHASES = [
  { step: "01 · Audit", title: "Diagnostic POV", description: "Identify friction & bottlenecks" },
  { step: "02 · Build", title: "Sprint Delivery", description: "2-4 week deployment cycle" },
  { step: "03 · Scale", title: "Compounding", description: "Continuous telemetry & growth" },
];

export const CASE_STUDIES = [
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
    keywords: [
      "Brand Positioning Strategy",
      "B2B Brand Identity Design",
      "Category Leadership",
      "Design Systems for Growth",
      "Brand Authority ROI",
    ],
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
    keywords: [
      "Headless Web Development",
      "Core Web Vitals Optimization",
      "React Performance Engineering",
      "High Converting Web Architecture",
      "SEO Page Speed",
    ],
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
    keywords: [
      "AI Workflow Automation",
      "WhatsApp Business API Integration",
      "Custom LLM AI Agents",
      "Operational Friction Reduction",
      "SalesOps Automation",
    ],
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
    keywords: [
      "Performance Marketing Strategy",
      "Customer Acquisition CAC LTV",
      "Multi-Touch Growth Telemetry",
      "Paid Media Optimization",
      "Conversion Rate Optimization CRO",
    ],
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
    keywords: [
      "SaaS Platform Engineering",
      "React Native Mobile App Development",
      "Customer Self-Service Portals",
      "User Retention Optimization",
      "B2B Web Application Architecture",
    ],
  },
];

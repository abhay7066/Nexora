import { Compass, Layers, ShieldCheck, Sparkles, Target, Users } from "lucide-react";

export interface Value {
  icon: typeof Compass;
  title: string;
  description: string;
}

export const VALUES: Value[] = [
  {
    icon: Compass,
    title: "Outcome over output",
    description:
      "We don't sell deliverables. We commit to the number that actually moves your business — revenue, retention, pipeline, margin.",
  },
  {
    icon: Layers,
    title: "One system, not silos",
    description:
      "Brand, product, automation and marketing designed to compound together. No handoffs falling through cracks.",
  },
  {
    icon: ShieldCheck,
    title: "Radical accountability",
    description:
      "We publish our targets, our progress and our misses. If we ship it, we own it — post-launch and beyond.",
  },
  {
    icon: Sparkles,
    title: "AI-native, human-led",
    description:
      "We use AI to move ten times faster, but every strategic decision is made by senior operators — not a model.",
  },
  {
    icon: Target,
    title: "Long arc, not quarter arc",
    description:
      "We optimise for what still compounds in three years, not what looks good in the next board deck.",
  },
  {
    icon: Users,
    title: "Extension of your team",
    description:
      "We show up in your standups, your Slack and your strategy days. Not a vendor — a partner in the room.",
  },
];

export interface Stat {
  value: string;
  label: string;
  detail: string;
}

export const STATS: Stat[] = [
  { value: "100%", label: "Direct Founder Access", detail: "You work directly with senior builders, zero account manager pass-offs" },
  { value: "< 24h", label: "Response SLA", detail: "Embedded in your daily Slack, standups, and strategy discussions" },
  { value: "2–4 Wks", label: "Sprint Velocity", detail: "Shipping production-ready brand, software and AI layers in weeks" },
  { value: "1 System", label: "Unified Growth", detail: "Brand, product, AI automation and marketing designed to compound together" },
];

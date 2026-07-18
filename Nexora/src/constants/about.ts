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
  { value: "12+", label: "years", detail: "of operating experience across the founding team" },
  { value: "80+", label: "engagements", detail: "shipped across startups, SMEs and enterprise" },
  { value: "4.2×", label: "avg. ROI", detail: "measured on committed growth programs" },
  { value: "97%", label: "retention", detail: "of clients renew or expand within 12 months" },
];

export interface StoryChapter {
  year: string;
  title: string;
  body: string;
}

export const STORY: StoryChapter[] = [
  {
    year: "2019",
    title: "Started as operators",
    body: "Founded by a small team of ex-founders and engineering leads who'd built and sold products themselves — not consultants writing decks from the sidelines.",
  },
  {
    year: "2021",
    title: "Went multi-disciplinary",
    body: "Brought brand, software and marketing under one roof after watching too many clients lose momentum in the handoffs between agencies.",
  },
  {
    year: "2023",
    title: "Rebuilt around AI",
    body: "Rewrote our delivery model around AI-native workflows — shipping in weeks what previously took quarters, at a fraction of the cost.",
  },
  {
    year: "Today",
    title: "A growth partner, not a vendor",
    body: "We work with a deliberately small number of ambitious teams as an embedded growth partner — measured on outcomes, not hours.",
  },
];

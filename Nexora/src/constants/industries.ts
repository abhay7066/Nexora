import { Factory, Building2, Stethoscope, ShoppingBag, Rocket, Landmark } from "lucide-react";
import type { Industry } from "@/types/content";

export const INDUSTRIES: Industry[] = [
  {
    slug: "manufacturing",
    name: "Manufacturing",
    description:
      "Digitising factories, streamlining sales pipelines and unlocking export-grade brands.",
    icon: Factory,
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    description:
      "Positioning developers as premium, and turning inventory into predictable pipeline.",
    icon: Building2,
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    description: "Trust-led brands, patient acquisition systems and HIPAA-aware software.",
    icon: Stethoscope,
  },
  {
    slug: "d2c",
    name: "D2C & E-commerce",
    description: "Building categories, not just stores — from creative to CRM to CAC.",
    icon: ShoppingBag,
  },
  {
    slug: "startups",
    name: "Startups",
    description: "From zero to product-market fit — brand, MVP and growth as one motion.",
    icon: Rocket,
  },
  {
    slug: "sme",
    name: "SMEs & Legacy Businesses",
    description: "Modernising the operations, brand and pipeline of established businesses.",
    icon: Landmark,
  },
];

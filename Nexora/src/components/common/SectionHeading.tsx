import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Eyebrow } from "./Eyebrow";
import { fadeUp, viewportOnce } from "@/hooks/useMotion";

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        "max-w-2xl",
        align === "center" && "mx-auto",
        className,
      )}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="text-gradient text-4xl leading-[1.05] sm:text-5xl md:text-[3.5rem]">
        {title}
      </h2>
      {lead && <p className="text-lg text-muted-foreground sm:text-xl">{lead}</p>}
    </motion.div>
  );
}

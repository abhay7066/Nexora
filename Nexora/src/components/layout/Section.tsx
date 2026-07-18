import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  bare?: boolean;
  as?: "section" | "div" | "article" | "aside";
}

export function Section({
  className,
  children,
  bare = false,
  as: Tag = "section",
  ...props
}: SectionProps) {
  return (
    <Tag
      className={cn("relative", className)}
      style={{ paddingBlock: "var(--section-y)" }}
      {...props}
    >
      {bare ? children : <Container>{children}</Container>}
    </Tag>
  );
}

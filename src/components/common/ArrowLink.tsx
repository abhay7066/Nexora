import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ArrowLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

export function ArrowLink({ to, children, className }: ArrowLinkProps) {
  return (
    <Link
      to={to}
      className={cn(
        "group inline-flex items-center gap-1.5 text-sm font-medium text-foreground",
        "transition-colors hover:text-primary",
        className,
      )}
    >
      {children}
      <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </Link>
  );
}

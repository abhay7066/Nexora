import { Link } from "@tanstack/react-router";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      to="/"
      aria-label="Nexora — home"
      className={"group inline-flex items-center gap-2.5 " + (className ?? "")}
    >
      <img src="/logo.png" alt="" className="size-9 object-contain" />
      <span className="font-display text-lg font-semibold tracking-tight">Nexora</span>
    </Link>
  );
}

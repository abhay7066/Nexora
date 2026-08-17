import { Link } from "@tanstack/react-router";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      to="/"
      aria-label="Nexora Technologies — home"
      className={"group inline-flex items-center gap-2.5 " + (className ?? "")}
    >
      <img src="/logo.png" alt="" className="size-9 object-contain shrink-0" />
      <div className="flex flex-col items-end leading-none pr-1.5">
        <span className="font-display text-lg font-semibold tracking-tight text-foreground">
          Nexora
        </span>
        <span className="relative font-display text-[9.5px] font-medium tracking-tight text-muted-foreground -mt-1">
          Technologies
          <sup className="absolute left-[calc(100%+1px)] top-0 text-[6.5px] font-normal leading-none select-none">
            ™
          </sup>
        </span>
      </div>
    </Link>
  );
}

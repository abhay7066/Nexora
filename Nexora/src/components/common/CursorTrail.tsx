import { useEffect, useRef } from "react";

const TRAIL_LENGTH = 12;

export function CursorTrail() {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    // Disable on touch / mobile devices
    if (typeof window === "undefined") return;
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    let animId: number;
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const points: { x: number; y: number }[] = Array.from({ length: TRAIL_LENGTH }, () => ({
      x: mouse.x,
      y: mouse.y,
    }));

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const render = () => {
      // Smooth spring interpolation for each point following previous point
      points[0].x += (mouse.x - points[0].x) * 0.35;
      points[0].y += (mouse.y - points[0].y) * 0.35;

      for (let i = 1; i < TRAIL_LENGTH; i++) {
        points[i].x += (points[i - 1].x - points[i].x) * 0.35;
        points[i].y += (points[i - 1].y - points[i].y) * 0.35;
      }

      // Generate smooth SVG curve path string
      if (pathRef.current && points.length > 1) {
        let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
        for (let i = 1; i < points.length; i++) {
          const xc = ((points[i].x + points[i - 1].x) / 2).toFixed(1);
          const yc = ((points[i].y + points[i - 1].y) / 2).toFixed(1);
          d += ` Q ${points[i - 1].x.toFixed(1)} ${points[i - 1].y.toFixed(1)}, ${xc} ${yc}`;
        }
        pathRef.current.setAttribute("d", d);
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-50 size-full overflow-hidden"
    >
      <defs>
        <linearGradient id="cursorLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="oklch(0.65 0.22 300)" stopOpacity="0.8" />
          <stop offset="50%" stopColor="oklch(0.55 0.2 300)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="oklch(0.45 0.16 300)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        ref={pathRef}
        fill="none"
        stroke="url(#cursorLineGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

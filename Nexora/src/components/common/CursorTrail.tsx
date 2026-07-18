import { useEffect, useRef, useState } from "react";

export function CursorTrail() {
  const pathRef = useRef<SVGPathElement>(null);
  const pointsRef = useRef<{ x: number; y: number }[]>([]);
  const frameRef = useRef<number | null>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const [showTrail, setShowTrail] = useState(false);

  useEffect(() => {
    // Hide trail on touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      if (!showTrail) {
        setShowTrail(true);
        // Initialize points trail at the current mouse position
        pointsRef.current = Array(15).fill({ x: e.clientX, y: e.clientY });
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const updateTrail = () => {
      if (pointsRef.current.length === 0) {
        frameRef.current = requestAnimationFrame(updateTrail);
        return;
      }

      const points = pointsRef.current;
      const target = mouseRef.current;

      // Elastic spring physics for the trail head
      points[0] = {
        x: points[0].x + (target.x - points[0].x) * 0.25,
        y: points[0].y + (target.y - points[0].y) * 0.25,
      };

      // Propagation of motion through remaining trail segment points
      for (let i = 1; i < points.length; i++) {
        points[i] = {
          x: points[i].x + (points[i - 1].x - points[i].x) * 0.25,
          y: points[i].y + (points[i - 1].y - points[i].y) * 0.25,
        };
      }

      // Render smooth quadratic bezier curve path
      if (pathRef.current && points.length > 1) {
        let d = `M ${points[0].x} ${points[0].y}`;
        for (let i = 1; i < points.length - 1; i++) {
          const xc = (points[i].x + points[i + 1].x) / 2;
          const yc = (points[i].y + points[i + 1].y) / 2;
          d += ` Q ${points[i].x} ${points[i].y} ${xc} ${yc}`;
        }
        d += ` L ${points[points.length - 1].x} ${points[points.length - 1].y}`;
        pathRef.current.setAttribute("d", d);
      }

      frameRef.current = requestAnimationFrame(updateTrail);
    };

    frameRef.current = requestAnimationFrame(updateTrail);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [showTrail]);

  if (!showTrail) return null;

  return (
    <svg className="pointer-events-none fixed inset-0 z-0 size-full overflow-visible opacity-50">
      <defs>
        <linearGradient id="cursor-trail-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.7" />
          <stop offset="50%" stopColor="var(--primary)" stopOpacity="0.2" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
        </linearGradient>
        <filter id="cursor-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      <path
        ref={pathRef}
        fill="none"
        stroke="url(#cursor-trail-gradient)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#cursor-glow)"
      />
    </svg>
  );
}

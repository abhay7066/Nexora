import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import gifUrl from "@/assets/BKV2.gif";

interface HeroBackgroundProps {
  opacity?: number;
  speed?: number; // Animation duration multiplier (lower = faster, higher = slower)
  intensity?: number; // Movement scale/offset multiplier
  blurAmount?: number; // Blur filter size in px
  colorTheme?: "light" | "dark" | "default";
}

export function HeroBackground({
  opacity = 0.9,
  speed = 1,
  intensity = 1,
  blurAmount = 90,
  colorTheme = "default",
}: HeroBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [showLaser, setShowLaser] = useState(false);

  // Set mounted state for SSR hydration safety
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Mouse parallax hook
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Mouse pixel trackers for background lines
  const mousePxX = useMotionValue(0);
  const mousePxY = useMotionValue(0);

  // Smooth out tracking lines using physics springs
  const smoothX = useSpring(mousePxX, { damping: 45, stiffness: 80 });
  const smoothY = useSpring(mousePxY, { damping: 45, stiffness: 80 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      mouseX.set((clientX - centerX) / centerX);
      mouseY.set((clientY - centerY) / centerY);

      // Track raw pixel coordinates and activate lasers
      mousePxX.set(clientX);
      mousePxY.set(clientY);
      setShowLaser(true);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, mousePxX, mousePxY]);

  // Map mouse movement to subtle translations (parallax offsets)
  const parallaxX1 = useTransform(mouseX, (x) => x * 15 * intensity);
  const parallaxY1 = useTransform(mouseY, (y) => y * 15 * intensity);
  const parallaxX2 = useTransform(mouseX, (x) => x * -10 * intensity);
  const parallaxY2 = useTransform(mouseY, (y) => y * -10 * intensity);

  if (!isMounted) {
    return (
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        style={{ opacity }}
      >
        <div className="absolute inset-0 bg-background" />
        <div className="grid-bg absolute inset-0 opacity-30" />
      </div>
    );
  }

  // Determine theme colors based on the theme prop
  let orb1Color = "var(--primary)";
  let orb2Color = "oklch(0.65 0.18 50)"; // Warm peach (Clay)
  let orb3Color = "oklch(0.85 0.05 200)"; // Soft gray-blue
  let nodeGlowColor = "oklch(0.45 0.16 300)"; // Meltano violet
  let pulseGradientStart = "oklch(0.45 0.16 300)"; // Violet
  let pulseGradientEnd = "oklch(0.60 0.18 50)"; // Peach
  let gridLineOpacity = 0.03;

  if (colorTheme === "light") {
    orb1Color = "oklch(0.45 0.16 300)";
    orb2Color = "oklch(0.70 0.14 50)";
    orb3Color = "oklch(0.90 0.04 220)";
    nodeGlowColor = "oklch(0.45 0.16 300)";
    pulseGradientStart = "oklch(0.45 0.16 300)";
    pulseGradientEnd = "oklch(0.65 0.18 50)";
    gridLineOpacity = 0.04;
  } else if (colorTheme === "dark") {
    orb1Color = "oklch(0.55 0.18 290)";
    orb2Color = "oklch(0.75 0.15 60)";
    orb3Color = "oklch(0.30 0.10 240)";
    nodeGlowColor = "oklch(0.55 0.18 290)";
    pulseGradientStart = "oklch(0.55 0.18 290)";
    pulseGradientEnd = "oklch(0.75 0.15 60)";
    gridLineOpacity = 0.02;
  }

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden select-none"
      style={{ opacity }}
    >
      {/* 1. Base solid background and custom GIF layer */}
      <div className="absolute inset-0 bg-background transition-colors duration-500">
        <img 
          src={gifUrl} 
          alt="" 
          className="w-full h-full object-cover object-center opacity-70 select-none pointer-events-none" 
        />
        {/* Premium multi-stage overlay: heavy mask on mobile, smooth fade on desktop */}
        <div className="absolute inset-0 bg-background/30 md:bg-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/50 to-background" />
      </div>

      {/* Interactive mouse-tracking coordinate laser lines */}
      {showLaser && (
        <>
          <motion.div 
            style={{ y: smoothY }}
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent pointer-events-none z-10"
          />
          <motion.div 
            style={{ x: smoothX }}
            className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent pointer-events-none z-10"
          />
        </>
      )}

      {/* 2. Soft Blurred Color Orbs for Depth (Clay + Meltano Vibe) */}
      <div className="absolute inset-0 overflow-hidden" style={{ filter: `blur(${blurAmount}px)` }}>
        {/* Violet Orb (Top Center/Right) */}
        <motion.div
          style={{ x: parallaxX1, y: parallaxY1 }}
          className="absolute top-[-15%] right-[10%] size-[500px]"
        >
          <motion.div
            style={{ backgroundColor: orb1Color }}
            animate={{
              x: [0, 30 * intensity, -20 * intensity, 0],
              y: [0, -40 * intensity, 30 * intensity, 0],
              scale: [1, 1.1, 0.95, 1],
            }}
            transition={{
              duration: 25 * speed,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="size-full rounded-full opacity-[0.06]"
          />
        </motion.div>

        {/* Peach Orb (Left Center) */}
        <motion.div
          style={{ x: parallaxX2, y: parallaxY2 }}
          className="absolute top-[25%] left-[-10%] size-[550px]"
        >
          <motion.div
            style={{ backgroundColor: orb2Color }}
            animate={{
              x: [0, -25 * intensity, 35 * intensity, 0],
              y: [0, 45 * intensity, -30 * intensity, 0],
              scale: [0.95, 1.05, 0.9, 0.95],
            }}
            transition={{
              duration: 30 * speed,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="size-full rounded-full opacity-[0.05]"
          />
        </motion.div>

        {/* Soft Blue Orb (Bottom Right) */}
        <motion.div
          style={{ x: parallaxY1, y: parallaxX2 }}
          className="absolute bottom-[-10%] right-[5%] size-[400px]"
        >
          <motion.div
            style={{ backgroundColor: orb3Color }}
            className="size-full rounded-full opacity-[0.06]"
          />
        </motion.div>
      </div>

      {/* 3. Infinite Floating Technical Grid */}
      <motion.div style={{ x: parallaxX2, y: parallaxY2 }} className="absolute inset-0">
        <motion.div
          animate={{
            backgroundPosition: ["0px 0px", "56px 56px"],
          }}
          transition={{
            duration: 40 * speed,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ opacity: gridLineOpacity }}
          className="grid-bg absolute inset-0"
        />
      </motion.div>

      {/* 4. Data Flow Pipeline & Connection Paths (Meltano Style Motion) */}
      <svg
        className="absolute inset-0 size-full"
        viewBox="0 0 1440 800"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Main gradient for moving flow pulses */}
          <linearGradient id="flow-pulse-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={pulseGradientStart} stopOpacity="0" />
            <stop offset="50%" stopColor={pulseGradientStart} stopOpacity="0.8" />
            <stop offset="70%" stopColor={pulseGradientEnd} stopOpacity="0.8" />
            <stop offset="100%" stopColor={pulseGradientEnd} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* --- PIPELINE STATIC PATHS (Inactive Network Grid) --- */}
        {/* Path 1: Central Backbone */}
        <path
          d="M -100,320 H 1540"
          fill="none"
          stroke="var(--border)"
          strokeWidth="1.5"
          opacity="0.4"
        />
        {/* Path 2: Diagonal Upper feed */}
        <path
          d="M 100,100 C 400,100 500,320 800,320 T 1500,320"
          fill="none"
          stroke="var(--border)"
          strokeWidth="1"
          opacity="0.3"
        />
        {/* Path 3: Lower Loop flow */}
        <path
          d="M -100,500 Q 300,580 650,450 T 1400,320"
          fill="none"
          stroke="var(--border)"
          strokeWidth="1"
          opacity="0.3"
        />
        {/* Path 4: S-curve cross-connector */}
        <path
          d="M 200,650 C 400,650 500,200 800,200 C 1100,200 1200,550 1540,550"
          fill="none"
          stroke="var(--border)"
          strokeWidth="1.2"
          opacity="0.3"
        />

        {/* --- ANIMATED LIGHT PULSES (Data flowing along pipelines) --- */}
        {/* Central Backbone pulse */}
        <motion.path
          d="M -100,320 H 1540"
          fill="none"
          stroke="url(#flow-pulse-grad)"
          strokeWidth="2.5"
          strokeDasharray="180 800"
          animate={{ strokeDashoffset: [1200, -800] }}
          transition={{
            duration: 10 * speed,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Diagonal upper feed pulse (offset timing) */}
        <motion.path
          d="M 100,100 C 400,100 500,320 800,320 T 1500,320"
          fill="none"
          stroke="url(#flow-pulse-grad)"
          strokeWidth="2"
          strokeDasharray="120 700"
          animate={{ strokeDashoffset: [1000, -1000] }}
          transition={{
            duration: 14 * speed,
            repeat: Infinity,
            ease: "linear",
            delay: 2,
          }}
        />

        {/* Lower loop flow pulse */}
        <motion.path
          d="M -100,500 Q 300,580 650,450 T 1400,320"
          fill="none"
          stroke="url(#flow-pulse-grad)"
          strokeWidth="2"
          strokeDasharray="150 900"
          animate={{ strokeDashoffset: [1300, -900] }}
          transition={{
            duration: 18 * speed,
            repeat: Infinity,
            ease: "linear",
            delay: 4,
          }}
        />

        {/* S-curve cross-connector pulse (reverse direction) */}
        <motion.path
          d="M 200,650 C 400,650 500,200 800,200 C 1100,200 1200,550 1540,550"
          fill="none"
          stroke="url(#flow-pulse-grad)"
          strokeWidth="2"
          strokeDasharray="200 1200"
          animate={{ strokeDashoffset: [-1600, 800] }}
          transition={{
            duration: 16 * speed,
            repeat: Infinity,
            ease: "linear",
            delay: 1,
          }}
        />
      </svg>

      {/* 5. Pulsing Network Nodes (Clay-approachable circles with Meltano glow rings) */}
      <div className="absolute inset-0 size-full">
        {[
          { top: "40%", left: "35%", delay: 0 }, // Backbone feed 1
          { top: "40%", left: "55%", delay: 1.5 }, // Central node
          { top: "12.5%", left: "28%", delay: 3 }, // Top connection
          { top: "25%", left: "76%", delay: 4.5 }, // High loop node
          { top: "56%", left: "45%", delay: 0.8 }, // Lower loop connection
          { top: "68.5%", left: "83%", delay: 2.2 }, // Exit junction
        ].map((node, index) => {
          return (
            <div
              key={index}
              className="absolute size-4 -translate-x-1/2 -translate-y-1/2"
              style={{ top: node.top, left: node.left }}
            >
              {/* Outer Pulsing Ring */}
              <motion.div
                animate={{
                  scale: [1, 2.4, 1],
                  opacity: [0.3, 0, 0.3],
                }}
                transition={{
                  duration: 4 * speed,
                  delay: node.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{ borderColor: nodeGlowColor }}
                className="absolute inset-[-6px] rounded-full border border-primary/40"
              />
              {/* Mid Core Circle */}
              <div
                style={{ backgroundColor: "var(--background)", borderColor: "var(--border)" }}
                className="absolute inset-[2px] rounded-full border shadow-sm"
              />
              {/* Inner Glowing Dot */}
              <motion.div
                animate={{
                  scale: [0.8, 1.2, 0.8],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 3 * speed,
                  delay: node.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{ backgroundColor: nodeGlowColor }}
                className="absolute inset-[5px] rounded-full"
              />
            </div>
          );
        })}
      </div>

      {/* 6. Subtle Floating Ambient Particle Dots */}
      <div className="absolute inset-0 size-full">
        {[
          { top: "20%", left: "10%", delay: 0 },
          { top: "70%", left: "15%", delay: 2 },
          { top: "50%", left: "80%", delay: 4 },
          { top: "85%", left: "70%", delay: 1 },
          { top: "15%", left: "90%", delay: 3 },
        ].map((particle, index) => (
          <motion.div
            key={index}
            animate={{
              y: [0, -12, 0],
              opacity: [0.15, 0.4, 0.15],
            }}
            transition={{
              duration: 8,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ top: particle.top, left: particle.left }}
            className="absolute size-1.5 rounded-full bg-primary/20"
          />
        ))}
      </div>
    </div>
  );
}

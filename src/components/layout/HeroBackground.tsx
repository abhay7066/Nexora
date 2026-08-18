import { useEffect, useRef, useState } from "react";
import videoUrl from "@/assets/final_flacon_here_secrion_vido.mp4";

interface HeroBackgroundProps {
  opacity?: number;
}

export function HeroBackground({ opacity = 0.85 }: HeroBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Programmatic playback resilience to prevent browser autoplay blocks or pauses
  useEffect(() => {
    if (!isMounted || !videoRef.current) return;

    const video = videoRef.current;
    video.muted = true;
    video.playsInline = true;

    const safePlay = () => {
      if (video.paused) {
        video.play().catch(() => {
          // Fallback if browser requires interaction
        });
      }
    };

    safePlay();

    // Re-play if user returns to tab or window gains focus
    window.addEventListener("focus", safePlay);
    document.addEventListener("visibilitychange", safePlay);

    return () => {
      window.removeEventListener("focus", safePlay);
      document.removeEventListener("visibilitychange", safePlay);
    };
  }, [isMounted]);

  const handleEnded = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const handlePause = () => {
    if (videoRef.current && videoRef.current.currentTime < videoRef.current.duration) {
      videoRef.current.play().catch(() => {});
    }
  };

  if (!isMounted) {
    return (
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        style={{ opacity }}
      >
        <div className="absolute inset-0 bg-background" />
      </div>
    );
  }

  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden select-none"
      style={{ opacity }}
    >
      <div className="absolute inset-0 bg-background transition-colors duration-500">
        <video
          ref={videoRef}
          src={videoUrl}
          autoPlay
          loop
          muted
          playsInline
          onEnded={handleEnded}
          onPause={handlePause}
          className="w-full h-full object-cover object-center opacity-60 select-none pointer-events-none"
        />
        {/* Ambient Gradient Overlays for readable text and smooth blend */}
        <div className="absolute inset-0 bg-background/30 md:bg-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/50 to-background" />
        <div className="absolute inset-0 grid-bg opacity-30" />
      </div>
    </div>
  );
}

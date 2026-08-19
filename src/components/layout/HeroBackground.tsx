import { useEffect, useRef, useState } from "react";
import videoUrl from "@/assets/final_falcon_backGround.mp4";

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
    // iOS/WebKit requires muted to be set as a DOM property (not just an
    // attribute) before play() is called, or it falls back to showing a
    // tap-to-play button instead of autoplaying.
    video.defaultMuted = true;
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

    // iOS can reject the very first play() call while the video is still
    // buffering, so retry once more data becomes available.
    video.addEventListener("loadedmetadata", safePlay);
    video.addEventListener("loadeddata", safePlay);
    video.addEventListener("canplay", safePlay);

    // Re-play if user returns to tab or window gains focus
    window.addEventListener("focus", safePlay);
    document.addEventListener("visibilitychange", safePlay);

    return () => {
      video.removeEventListener("loadedmetadata", safePlay);
      video.removeEventListener("loadeddata", safePlay);
      video.removeEventListener("canplay", safePlay);
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
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
          // Legacy iOS Safari attribute name for inline playback; without it
          // older WebKit versions can fall back to a tap-to-play button.
          webkit-playsinline="true"
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

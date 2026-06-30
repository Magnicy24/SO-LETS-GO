import { useEffect, useRef } from "react";

/** Each entry: [scrollFraction 0-1, videoTime in seconds] — must be sorted ascending by scrollFraction. */
export type TimeMapEntry = [scrollFraction: number, videoTime: number];

/** Linearly interpolate videoTime from a sorted timemap given a scroll fraction 0-1. */
function mapScrollToTime(pct: number, timeMap: TimeMapEntry[], videoDuration: number): number {
  if (timeMap.length === 0) return pct * videoDuration;

  const first = timeMap[0];
  const last  = timeMap[timeMap.length - 1];

  if (pct <= first[0]) return first[1];
  if (pct >= last[0])  return last[1];

  for (let i = 0; i < timeMap.length - 1; i++) {
    const [p0, t0] = timeMap[i];
    const [p1, t1] = timeMap[i + 1];
    if (pct >= p0 && pct <= p1) {
      const segPct = (pct - p0) / (p1 - p0);
      return t0 + segPct * (t1 - t0);
    }
  }

  return last[1];
}

export function useScrollVideo(videoDuration: number, timeMap?: TimeMapEntry[]) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    video.preload = "auto";

    let desiredTime = 0;
    let displayedTime = 0;
    let isSeeking = false;
    let seekingTimeout: ReturnType<typeof setTimeout> | null = null;
    let rafId: number;

    const LERP = 0.14;
    const MIN_SEEK_DELTA = 0.016; // ~1 frame at 60fps

    const getTargetTime = (): number => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return 0;
      const pct = Math.max(0, Math.min(1, window.scrollY / max));

      if (timeMap && timeMap.length >= 2) {
        return mapScrollToTime(pct, timeMap, videoDuration);
      }
      return pct * videoDuration;
    };

    const clearSeekingLock = () => {
      isSeeking = false;
      if (seekingTimeout) {
        clearTimeout(seekingTimeout);
        seekingTimeout = null;
      }
    };

    const onSeeked = () => clearSeekingLock();
    const onError  = () => clearSeekingLock();

    video.addEventListener("seeked", onSeeked);
    video.addEventListener("error", onError);

    const tick = () => {
      rafId = requestAnimationFrame(tick);

      const diff = desiredTime - displayedTime;
      if (Math.abs(diff) < 0.001) {
        displayedTime = desiredTime;
      } else {
        displayedTime += diff * LERP;
      }

      if (!isSeeking && Math.abs(video.currentTime - displayedTime) > MIN_SEEK_DELTA) {
        isSeeking = true;
        video.currentTime = displayedTime;
        seekingTimeout = setTimeout(clearSeekingLock, 150);
      }
    };

    const onScroll = () => { desiredTime = getTargetTime(); };

    const start = () => {
      desiredTime = getTargetTime();
      displayedTime = desiredTime;
      video.currentTime = desiredTime;
      rafId = requestAnimationFrame(tick);
    };

    if (video.readyState >= 1) {
      start();
    } else {
      video.addEventListener("loadedmetadata", start, { once: true });
    }

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      if (seekingTimeout) clearTimeout(seekingTimeout);
      window.removeEventListener("scroll", onScroll);
      video.removeEventListener("seeked", onSeeked);
      video.removeEventListener("error", onError);
    };
  }, [videoDuration, timeMap]);

  return videoRef;
}

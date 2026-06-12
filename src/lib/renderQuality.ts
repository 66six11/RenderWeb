import type { RenderQuality } from "../types/render";

export interface RenderQualitySettings {
  dpr: [number, number];
  shadows: boolean;
  antialias: boolean;
}

export function getRenderQuality(quality: RenderQuality = "auto"): RenderQualitySettings {
  if (quality === "low") {
    return { dpr: [1, 1], shadows: false, antialias: false };
  }

  if (quality === "high") {
    return { dpr: [1, 2], shadows: true, antialias: true };
  }

  if (quality === "medium") {
    return { dpr: [1, 1.5], shadows: true, antialias: true };
  }

  if (typeof window === "undefined") {
    return { dpr: [1, 1.5], shadows: true, antialias: true };
  }

  const isSmallScreen = window.matchMedia("(max-width: 768px)").matches;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (isSmallScreen || reduceMotion) {
    return { dpr: [1, 1.25], shadows: false, antialias: true };
  }

  return { dpr: [1, 1.75], shadows: true, antialias: true };
}

import type { RenderTimelineStep } from "../../types/render";
import { publishRenderEvent } from "../../lib/renderBus";

interface AnimeApi {
  animate?: (targets: unknown, parameters: Record<string, unknown>) => unknown;
  default?: (targets: unknown, parameters: Record<string, unknown>) => unknown;
  stagger?: (value: number) => unknown;
}

function normalizeTimeline(timeline: unknown): RenderTimelineStep[] {
  return Array.isArray(timeline) ? (timeline as RenderTimelineStep[]) : [];
}

async function animateDom(step: RenderTimelineStep) {
  if (!step.dom) {
    return;
  }

  const targets = document.querySelectorAll(step.dom.target);

  if (!targets.length) {
    return;
  }

  const api = (await import("animejs")) as AnimeApi;
  const animate = api.animate ?? api.default;

  if (typeof animate !== "function") {
    return;
  }

  const stagger = api.stagger?.(step.dom.stagger ?? 80);
  const effect = step.dom.effect ?? "fade-up";

  if (effect === "split-reveal") {
    animate(targets, {
      opacity: [0, 1],
      translateY: [18, 0],
      duration: 720,
      delay: stagger,
      easing: "easeOutExpo"
    });
    return;
  }

  if (effect === "scale-in") {
    animate(targets, {
      opacity: [0, 1],
      scale: [0.96, 1],
      duration: 680,
      delay: stagger,
      easing: "easeOutCubic"
    });
    return;
  }

  animate(targets, {
    opacity: [0, 1],
    translateY: [24, 0],
    duration: 700,
    delay: stagger,
    easing: "easeOutCubic"
  });
}

function publishScene(step: RenderTimelineStep) {
  if (!step.scene) {
    return;
  }

  publishRenderEvent({
    sceneId: step.scene.sceneId ?? "hero",
    camera: step.scene.camera,
    material: step.scene.material,
    motion: step.scene.motion,
    progress: step.scene.progress,
    rotation: step.scene.rotation
  });
}

export function setupArticleMotion(timelineInput: unknown) {
  const timeline = normalizeTimeline(timelineInput);

  if (!timeline.length || typeof window === "undefined") {
    return;
  }

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const activeSteps = new Set<string>();

  timeline.forEach((step) => {
    const target = document.querySelector(step.trigger);

    if (!target) {
      return;
    }

    if (step.dom) {
      document.querySelectorAll(step.dom.target).forEach((element) => {
        (element as HTMLElement).style.opacity = prefersReducedMotion ? "1" : "0";
      });
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || activeSteps.has(step.id)) {
            return;
          }

          activeSteps.add(step.id);
          publishScene(step);

          if (!prefersReducedMotion) {
            void animateDom(step);
          }
        });
      },
      { threshold: 0.35, rootMargin: "0px 0px -12% 0px" }
    );

    observer.observe(target);
  });
}

import type { RenderBusEvent } from "../types/render";

type Listener = (event: RenderBusEvent) => void;

const listeners = new Map<string, Set<Listener>>();

export function publishRenderEvent(event: RenderBusEvent): void {
  const sceneListeners = listeners.get(event.sceneId);

  if (!sceneListeners) {
    return;
  }

  sceneListeners.forEach((listener) => listener(event));
}

export function subscribeRenderEvent(sceneId: string, listener: Listener): () => void {
  const normalizedSceneId = sceneId || "hero";
  const sceneListeners = listeners.get(normalizedSceneId) ?? new Set<Listener>();
  sceneListeners.add(listener);
  listeners.set(normalizedSceneId, sceneListeners);

  return () => {
    sceneListeners.delete(listener);

    if (sceneListeners.size === 0) {
      listeners.delete(normalizedSceneId);
    }
  };
}

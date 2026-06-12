export type Vec3 = [number, number, number];

export type ScenePreset =
  | "pbr-turntable"
  | "shader-lab"
  | "compare-materials"
  | "scroll-explode"
  | "gallery-stage";

export type RenderQuality = "low" | "medium" | "high" | "auto";

export interface RenderSceneConfig {
  id?: string;
  preset: ScenePreset;
  asset?: string;
  poster?: string;
  material?: string;
  camera?: string;
  motion?: string;
  quality?: RenderQuality;
  height?: string;
  background?: string;
  rotation?: Vec3;
  position?: Vec3;
  scale?: number | Vec3;
}

export interface RenderTimelineStep {
  id: string;
  trigger: string;
  dom?: {
    target: string;
    effect?: string;
    stagger?: number;
  };
  scene?: {
    sceneId?: string;
    camera?: string;
    material?: string;
    motion?: string;
    progress?: number;
    rotation?: Vec3;
  };
}

export interface RenderBusEvent {
  sceneId: string;
  camera?: string;
  material?: string;
  motion?: string;
  progress?: number;
  rotation?: Vec3;
}

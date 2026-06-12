import type { ComponentType } from "react";
import type { RenderSceneConfig, ScenePreset } from "../../types/render";
import { PBRTurntableScene } from "../scenes/PBRTurntableScene";
import { ShaderLabScene } from "../scenes/ShaderLabScene";
import { CompareMaterialsScene } from "../scenes/CompareMaterialsScene";
import { ScrollExplodeScene } from "../scenes/ScrollExplodeScene";
import { GalleryStageScene } from "../scenes/GalleryStageScene";

export type RenderSceneComponent = ComponentType<{ config: RenderSceneConfig }>;

export const sceneRegistry: Record<ScenePreset, RenderSceneComponent> = {
  "pbr-turntable": PBRTurntableScene,
  "shader-lab": ShaderLabScene,
  "compare-materials": CompareMaterialsScene,
  "scroll-explode": ScrollExplodeScene,
  "gallery-stage": GalleryStageScene
};

export function getSceneComponent(preset: ScenePreset): RenderSceneComponent {
  return sceneRegistry[preset] ?? PBRTurntableScene;
}

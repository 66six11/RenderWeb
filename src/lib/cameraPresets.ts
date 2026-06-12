import type { Vec3 } from "../types/render";

export interface CameraPreset {
  position: Vec3;
  target: Vec3;
  fov: number;
}

export const cameraPresets = {
  front: {
    position: [0, 0.4, 5],
    target: [0, 0, 0],
    fov: 42
  },
  "three-quarter": {
    position: [3, 2.2, 4.2],
    target: [0, 0.15, 0],
    fov: 40
  },
  macro: {
    position: [1.2, 0.9, 2.2],
    target: [0, 0.15, 0],
    fov: 28
  },
  side: {
    position: [4.5, 0.8, 0],
    target: [0, 0, 0],
    fov: 38
  },
  top: {
    position: [0, 5.5, 0.01],
    target: [0, 0, 0],
    fov: 46
  }
} satisfies Record<string, CameraPreset>;

export type CameraPresetName = keyof typeof cameraPresets;

export function getCameraPreset(name?: string): CameraPreset {
  const fallback: CameraPresetName = "three-quarter";
  const key = name && name in cameraPresets ? (name as CameraPresetName) : fallback;

  return cameraPresets[key];
}

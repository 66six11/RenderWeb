export const motionPresets = {
  "slow-orbit": {
    rotationSpeed: 0.18,
    floatAmplitude: 0.04
  },
  "steady-turntable": {
    rotationSpeed: 0.32,
    floatAmplitude: 0
  },
  "soft-float": {
    rotationSpeed: 0.08,
    floatAmplitude: 0.08
  },
  still: {
    rotationSpeed: 0,
    floatAmplitude: 0
  }
} as const;

export type MotionPresetName = keyof typeof motionPresets;

export function getMotionPreset(name?: string) {
  const fallback: MotionPresetName = "slow-orbit";
  const key = name && name in motionPresets ? (name as MotionPresetName) : fallback;

  return motionPresets[key];
}

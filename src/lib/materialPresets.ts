export interface MaterialPreset {
  color: string;
  metalness: number;
  roughness: number;
  transmission?: number;
  thickness?: number;
  opacity?: number;
  ior?: number;
  clearcoat?: number;
  clearcoatRoughness?: number;
  emissive?: string;
  emissiveIntensity?: number;
}

export const materialPresets = {
  clay: {
    color: "#d7d0c4",
    metalness: 0,
    roughness: 0.62
  },
  "brushed-metal": {
    color: "#b8bec5",
    metalness: 1,
    roughness: 0.32,
    clearcoat: 0.2,
    clearcoatRoughness: 0.4
  },
  "clear-glass": {
    color: "#d9f3ff",
    metalness: 0,
    roughness: 0.02,
    transmission: 0.86,
    thickness: 0.8,
    opacity: 0.72,
    ior: 1.45
  },
  obsidian: {
    color: "#11131a",
    metalness: 0.2,
    roughness: 0.18,
    clearcoat: 0.65,
    clearcoatRoughness: 0.08
  },
  neon: {
    color: "#91ffef",
    metalness: 0,
    roughness: 0.24,
    emissive: "#24ffe2",
    emissiveIntensity: 0.8
  }
} satisfies Record<string, MaterialPreset>;

export type MaterialPresetName = keyof typeof materialPresets;

export function getMaterialPreset(name?: string): MaterialPreset {
  const fallback: MaterialPresetName = "clay";
  const key = name && name in materialPresets ? (name as MaterialPresetName) : fallback;

  return materialPresets[key];
}

export function getMaterialNames(): MaterialPresetName[] {
  return Object.keys(materialPresets) as MaterialPresetName[];
}

# Render schema

The render schema is a small DSL embedded in MDX frontmatter.

## Hero scene

```yaml
render:
  hero:
    id: "hero"
    preset: "pbr-turntable"
    asset: "/models/example.glb"
    material: "clear-glass"
    camera: "three-quarter"
    motion: "slow-orbit"
    quality: "medium"
```

## Timeline step

```yaml
render:
  timeline:
    - id: "roughness"
      trigger: "#roughness"
      dom:
        target: "#roughness .parameter-card"
        effect: "fade-up-stagger"
      scene:
        sceneId: "hero"
        camera: "macro"
        material: "brushed-metal"
        progress: 0.65
```

## Presets

| Key | Meaning |
|---|---|
| `pbr-turntable` | Model or object material showcase |
| `shader-lab` | Procedural shader playground |
| `compare-materials` | Multi-material comparison |
| `scroll-explode` | Exploded-view scene |
| `gallery-stage` | Portfolio gallery stage |

## Camera presets

Defined in `src/lib/cameraPresets.ts`.

## Material presets

Defined in `src/lib/materialPresets.ts`.

## Motion presets

Defined in `src/lib/motionPresets.ts`.

# Asset pipeline

## Model format

Use `.glb` as the default delivery format for 3D assets. Store production models in `public/models`.

## Textures

Use explicit folders:

```txt
public/textures/hdr/      # HDR / environment maps
public/textures/matcaps/  # MatCap textures
public/textures/ktx2/     # compressed textures, later phase
```

## Poster images

Every heavy 3D section should have a poster fallback in `public/posters`. The current starter includes SVG placeholders so pages still have visual structure before real renders are added.

## Guidelines

- Keep hero models small for the first viewport.
- Prefer baked or compressed textures for complex scenes.
- Avoid loading more than one expensive Canvas per page until the shared-scene architecture is added.
- Use quality presets and device checks to reduce GPU pressure on mobile.

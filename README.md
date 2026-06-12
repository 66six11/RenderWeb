# RenderWeb

RenderWeb is a text/data-driven 3D rendering blog for documenting WebGL, shader, material, and interactive rendering experiments.

The project treats Markdown/MDX as the authoring surface, then reads structured `render` frontmatter to automatically mount scene presets, camera states, materials, and scroll-linked DOM animations.

## Stack

- Astro for static content, routing, SEO, and partial hydration
- MDX for long-form technical posts
- React Three Fiber, Three.js, and Drei for 3D scenes
- Anime.js for text, DOM, SVG, and scroll-timeline effects
- TypeScript and Zod-style content schemas for reliable data-driven rendering

## Local setup

```bash
corepack enable
pnpm install
pnpm dev
```

Build the site:

```bash
pnpm build
pnpm preview
```

## Authoring model

A post can declare a render block in frontmatter:

```yaml
render:
  hero:
    id: "hero"
    preset: "pbr-turntable"
    material: "clear-glass"
    camera: "three-quarter"
    motion: "slow-orbit"
    quality: "medium"
  timeline:
    - id: "intro"
      trigger: "#intro"
      dom:
        target: "#intro h2"
        effect: "fade-up"
      scene:
        sceneId: "hero"
        camera: "front"
        material: "clear-glass"
```

The renderer maps this schema to an interactive scene. Authors do not need to write Three.js code inside blog posts.

## Current scene presets

- `pbr-turntable`: PBR material/model showcase
- `shader-lab`: procedural shader experiment surface
- `compare-materials`: material comparison stage
- `scroll-explode`: scroll-driven exploded-view prototype
- `gallery-stage`: portfolio-style object gallery

## Repository status

This is the first source baseline for the RenderWeb GitHub project. See `docs/` for architecture, schema, asset pipeline, and roadmap notes.

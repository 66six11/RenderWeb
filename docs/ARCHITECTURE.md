# Architecture

RenderWeb uses a data-driven pipeline:

```txt
MDX frontmatter
  ↓
Astro content schema
  ↓
BlogPostLayout
  ↓
RenderBlock.astro
  ↓
RenderScene.tsx
  ↓
SceneRegistry
  ↓
React Three Fiber scene preset
  ↓
Anime.js + renderBus timeline events
```

## Content layer

Posts live in `src/content/posts`. Each post can define a `render.hero` scene and a `render.timeline` array. The schema lives in `src/content.config.ts`.

## Render layer

`RenderBlock.astro` creates an Astro island using `client:visible`, so 3D rendering waits until the block is near the viewport. `RenderScene.tsx` owns the Canvas and selects a preset from `SceneRegistry.ts`.

## Timeline layer

`ArticleMotion.astro` loads the timeline data and delegates to `articleMotion.ts`. It observes trigger elements and publishes scene events through `renderBus.ts`.

This separates authoring from rendering. Authors write Markdown and YAML. Scene authors implement reusable presets.

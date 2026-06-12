# RenderWeb technical stack

RenderWeb is organized as a content-first static site with isolated 3D interaction islands.

## Core stack

| Layer | Choice |
|---|---|
| Site shell | Astro |
| Authoring | MDX |
| Content validation | Astro content collections |
| 3D runtime | Three.js |
| 3D component model | React Three Fiber |
| 3D helpers | Drei |
| DOM animation | Anime.js |
| Language | TypeScript |

## Why this stack

Astro keeps the blog readable and indexable as static HTML. Heavy 3D components are loaded only when their islands become visible. React Three Fiber makes Three.js scenes easier to compose from reusable components. Anime.js handles the non-3D layer: headings, parameter cards, SVG labels, and scroll-triggered reveals.

## First-class constraints

- Text should remain the main source of truth.
- Scene behavior should come from typed schemas, not scattered one-off code.
- The page should degrade gracefully when WebGL or GPU capacity is limited.
- Rendering assets should be explicit and versionable.

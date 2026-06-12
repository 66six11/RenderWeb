import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const vec3 = z.tuple([z.number(), z.number(), z.number()]);

const scenePreset = z.enum([
  "pbr-turntable",
  "shader-lab",
  "compare-materials",
  "scroll-explode",
  "gallery-stage"
]);

const qualityPreset = z.enum(["low", "medium", "high", "auto"]);

const renderSceneConfig = z.object({
  id: z.string().default("hero"),
  preset: scenePreset,
  asset: z.string().optional(),
  poster: z.string().optional(),
  material: z.string().optional(),
  camera: z.string().optional(),
  motion: z.string().optional(),
  quality: qualityPreset.optional(),
  height: z.string().optional(),
  background: z.string().optional(),
  rotation: vec3.optional(),
  position: vec3.optional(),
  scale: z.union([z.number(), vec3]).optional()
});

const renderTimelineStep = z.object({
  id: z.string(),
  trigger: z.string(),
  dom: z.object({
    target: z.string(),
    effect: z.string().default("fade-up"),
    stagger: z.number().optional()
  }).optional(),
  scene: z.object({
    sceneId: z.string().default("hero"),
    camera: z.string().optional(),
    material: z.string().optional(),
    motion: z.string().optional(),
    progress: z.number().min(0).max(1).optional(),
    rotation: vec3.optional()
  }).optional()
});

const posts = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    render: z.object({
      hero: renderSceneConfig.optional(),
      timeline: z.array(renderTimelineStep).default([])
    }).optional()
  })
});

export const collections = { posts };

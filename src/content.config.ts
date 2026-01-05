import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const ventures = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/ventures" }),
  schema: z.object({
    title: z.string(),
    role: z.string(),
    year: z.string(),
    link: z.string().url().optional(),
    description: z.string(),
    order: z.number(),
  }),
});

export const collections = { ventures };

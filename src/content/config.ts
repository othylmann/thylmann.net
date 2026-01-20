import { defineCollection, z } from 'astro:content';

const ventures = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        role: z.string(),
        year: z.string(),
        description: z.string(),
        order: z.number(),
        link: z.string().url().optional(),
    }),
});

export const collections = {
    ventures,
};

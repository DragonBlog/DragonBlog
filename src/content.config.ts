import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const blogs = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/blogs",
  }),
  schema: ({ image }) =>
    z.object({
      title: z.optional(z.string()),
      date: z.optional(z.date()),
      tags: z.optional(z.array(z.string())),
      categories: z.optional(z.array(z.string())),
      cover: z.optional(z.string()),
    }),
});

export const collections = {
  blogs,
};

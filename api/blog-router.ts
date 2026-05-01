import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { blogPosts } from "@db/schema";
import { eq } from "drizzle-orm";

export const blogRouter = createRouter({
  list: publicQuery
    .input(
      z.object({
        limit: z.number().optional(),
        offset: z.number().optional(),
        category: z.string().optional(),
      }).optional()
    )
    .query(async () => {
      const db = getDb();
      const query = db.select().from(blogPosts).orderBy(blogPosts.createdAt);
      return query;
    }),

  getBySlug: publicQuery
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const db = getDb();
      const result = await db.select().from(blogPosts).where(eq(blogPosts.slug, input.slug));
      return result[0] || null;
    }),

  create: adminQuery
    .input(
      z.object({
        title: z.string().min(1),
        slug: z.string().min(1),
        excerpt: z.string().optional(),
        content: z.string().optional(),
        image: z.string().optional(),
        category: z.string().optional(),
        published: z.boolean().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.insert(blogPosts).values(input);
      return { success: true };
    }),

  update: adminQuery
    .input(
      z.object({
        id: z.number(),
        title: z.string().optional(),
        slug: z.string().optional(),
        excerpt: z.string().optional(),
        content: z.string().optional(),
        image: z.string().optional(),
        category: z.string().optional(),
        published: z.boolean().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      const db = getDb();
      await db.update(blogPosts).set(data).where(eq(blogPosts.id, id));
      return { success: true };
    }),

  delete: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(blogPosts).where(eq(blogPosts.id, input.id));
      return { success: true };
    }),
});

import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { projects } from "@db/schema";
import { eq } from "drizzle-orm";

export const projectRouter = createRouter({
  list: publicQuery
    .input(z.object({ category: z.string().optional() }).optional())
    .query(async () => {
      const db = getDb();
      return db.select().from(projects).orderBy(projects.createdAt);
    }),

  getById: publicQuery
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const db = getDb();
      const result = await db.select().from(projects).where(eq(projects.id, input.id));
      return result[0] || null;
    }),

  create: adminQuery
    .input(
      z.object({
        title: z.string().min(1),
        description: z.string().optional(),
        image: z.string().optional(),
        category: z.string().optional(),
        location: z.string().optional(),
        completedDate: z.string().optional(),
        featured: z.boolean().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.insert(projects).values({
        ...input,
        completedDate: input.completedDate ? new Date(input.completedDate) : null,
      });
      return { success: true };
    }),

  update: adminQuery
    .input(
      z.object({
        id: z.number(),
        title: z.string().optional(),
        description: z.string().optional(),
        image: z.string().optional(),
        category: z.string().optional(),
        location: z.string().optional(),
        completedDate: z.string().optional(),
        featured: z.boolean().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, completedDate, ...data } = input;
      const db = getDb();
      await db.update(projects).set({
        ...data,
        completedDate: completedDate ? new Date(completedDate) : null,
      }).where(eq(projects.id, id));
      return { success: true };
    }),

  delete: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(projects).where(eq(projects.id, input.id));
      return { success: true };
    }),
});

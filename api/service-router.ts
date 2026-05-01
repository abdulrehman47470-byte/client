import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { services } from "@db/schema";
import { eq } from "drizzle-orm";

export const serviceRouter = createRouter({
  list: publicQuery.query(async () => {
    const db = getDb();
    return db.select().from(services).orderBy(services.order);
  }),

  getById: publicQuery
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const db = getDb();
      const result = await db.select().from(services).where(eq(services.id, input.id));
      return result[0] || null;
    }),

  create: adminQuery
    .input(
      z.object({
        title: z.string().min(1),
        description: z.string().optional(),
        image: z.string().optional(),
        icon: z.string().optional(),
        order: z.number().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.insert(services).values(input);
      return { success: true };
    }),

  update: adminQuery
    .input(
      z.object({
        id: z.number(),
        title: z.string().optional(),
        description: z.string().optional(),
        image: z.string().optional(),
        icon: z.string().optional(),
        order: z.number().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      const db = getDb();
      await db.update(services).set(data).where(eq(services.id, id));
      return { success: true };
    }),

  delete: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(services).where(eq(services.id, input.id));
      return { success: true };
    }),
});

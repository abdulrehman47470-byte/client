import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { testimonials } from "@db/schema";
import { eq } from "drizzle-orm";

export const testimonialRouter = createRouter({
  list: publicQuery.query(async () => {
    const db = getDb();
    return db.select().from(testimonials).orderBy(testimonials.createdAt);
  }),

  create: adminQuery
    .input(
      z.object({
        name: z.string().min(1),
        role: z.string().optional(),
        company: z.string().optional(),
        content: z.string().min(1),
        rating: z.number().min(1).max(5).optional(),
        avatar: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.insert(testimonials).values(input);
      return { success: true };
    }),

  delete: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(testimonials).where(eq(testimonials.id, input.id));
      return { success: true };
    }),
});

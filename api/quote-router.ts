import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { quotes } from "@db/schema";
import { eq } from "drizzle-orm";

export const quoteRouter = createRouter({
  submit: publicQuery
    .input(
      z.object({
        name: z.string().min(1),
        email: z.string().email(),
        phone: z.string().min(1),
        address: z.string().optional(),
        serviceType: z.string().optional(),
        roofSize: z.string().optional(),
        message: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.insert(quotes).values({
        name: input.name,
        email: input.email,
        phone: input.phone,
        address: input.address || null,
        serviceType: input.serviceType || null,
        roofSize: input.roofSize || null,
        message: input.message || null,
      });
      return { success: true };
    }),

  list: adminQuery.query(async () => {
    const db = getDb();
    return db.select().from(quotes).orderBy(quotes.createdAt);
  }),

  updateStatus: adminQuery
    .input(
      z.object({
        id: z.number(),
        status: z.enum(["new", "contacted", "quoted", "closed"]),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      await db
        .update(quotes)
        .set({ status: input.status })
        .where(eq(quotes.id, input.id));
      return { success: true };
    }),

  delete: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(quotes).where(eq(quotes.id, input.id));
      return { success: true };
    }),
});

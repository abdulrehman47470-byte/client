import { createRouter, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { contacts, quotes, services } from "@db/schema";
import { sql } from "drizzle-orm";

export const adminRouter = createRouter({
  stats: adminQuery.query(async () => {
    const db = getDb();

    const [contactCount] = await db
      .select({ count: sql<number>`count(*)` })
      .from(contacts);

    const [quoteCount] = await db
      .select({ count: sql<number>`count(*)` })
      .from(quotes);

    const [newQuoteCount] = await db
      .select({ count: sql<number>`count(*)` })
      .from(quotes)
      .where(sql`status = 'new'`);

    const [serviceCount] = await db
      .select({ count: sql<number>`count(*)` })
      .from(services);

    return {
      totalContacts: Number(contactCount.count),
      totalQuotes: Number(quoteCount.count),
      newQuotes: Number(newQuoteCount.count),
      totalServices: Number(serviceCount.count),
    };
  }),
});

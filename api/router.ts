import { authRouter } from "./auth-router";
import { contactRouter } from "./contact-router";
import { quoteRouter } from "./quote-router";
import { serviceRouter } from "./service-router";
import { testimonialRouter } from "./testimonial-router";
import { blogRouter } from "./blog-router";
import { projectRouter } from "./project-router";
import { adminRouter } from "./admin-router";
import { createRouter, publicQuery } from "./middleware";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  auth: authRouter,
  contact: contactRouter,
  quote: quoteRouter,
  service: serviceRouter,
  testimonial: testimonialRouter,
  blog: blogRouter,
  project: projectRouter,
  admin: adminRouter,
});

export type AppRouter = typeof appRouter;

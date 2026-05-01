import {
  mysqlTable,
  mysqlEnum,
  serial,
  varchar,
  text,
  timestamp,
  int,
  boolean,
  date,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  unionId: varchar("unionId", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 320 }),
  avatar: text("avatar"),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
  lastSignInAt: timestamp("lastSignInAt").defaultNow().notNull(),
});

export const contacts = mysqlTable("contacts", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  subject: varchar("subject", { length: 255 }),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const quotes = mysqlTable("quotes", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
  address: varchar("address", { length: 500 }),
  serviceType: varchar("service_type", { length: 255 }),
  roofSize: varchar("roof_size", { length: 100 }),
  message: text("message"),
  status: mysqlEnum("status", ["new", "contacted", "quoted", "closed"]).default("new").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const services = mysqlTable("services", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  image: varchar("image", { length: 500 }),
  icon: varchar("icon", { length: 100 }),
  order: int("order").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const testimonials = mysqlTable("testimonials", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  role: varchar("role", { length: 255 }),
  company: varchar("company", { length: 255 }),
  content: text("content").notNull(),
  rating: int("rating").default(5),
  avatar: varchar("avatar", { length: 500 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const blogPosts = mysqlTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 500 }).notNull(),
  slug: varchar("slug", { length: 500 }).notNull().unique(),
  excerpt: text("excerpt"),
  content: text("content"),
  image: varchar("image", { length: 500 }),
  category: varchar("category", { length: 255 }),
  published: boolean("published").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const projects = mysqlTable("projects", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 500 }).notNull(),
  description: text("description"),
  image: varchar("image", { length: 500 }),
  category: varchar("category", { length: 255 }),
  location: varchar("location", { length: 255 }),
  completedDate: date("completed_date"),
  featured: boolean("featured").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type Contact = typeof contacts.$inferSelect;
export type Quote = typeof quotes.$inferSelect;
export type Service = typeof services.$inferSelect;
export type Testimonial = typeof testimonials.$inferSelect;
export type BlogPost = typeof blogPosts.$inferSelect;
export type Project = typeof projects.$inferSelect;

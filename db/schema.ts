import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";

// Users Table (Must be Defined First)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Projects Table
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  userId: integer("user_id").references(() => users.id).notNull(), // ✅ Now users exist before being referenced
  createdAt: timestamp("created_at").defaultNow(),
});

// Tasks Table (Linked to Projects)
export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  priority: integer("priority").default(1),
  dueDate: timestamp("due_date"),
  projectId: integer("project_id").references(() => projects.id), // ✅ Task belongs to a project
  userId: integer("user_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
});
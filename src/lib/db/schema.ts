import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const userTable = pgTable("user", {
  id: varchar("id", {
    length: 255,
  }).primaryKey(),
  name: text("name").notNull(),
  username: text("username"),
  email: text("email").unique(),
  password: text("password"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const sessionTable = pgTable("session", {
  id: varchar("id", {
    length: 255,
  }).primaryKey(),
  userId: varchar("user_id", { length: 255 })
    .notNull()
    .references(() => userTable.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

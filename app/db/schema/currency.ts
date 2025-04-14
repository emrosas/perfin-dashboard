import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { user } from "./auth-schema";

export const wallet = sqliteTable("wallet", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  balance: integer("balance").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const transaction = sqliteTable("transaction", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  amount: integer("amount").notNull(),
  description: text("description").notNull(),
  type: text({
    enum: ["income", "expense", "transfer", "settlement"],
  }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

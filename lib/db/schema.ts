import type { InferSelectModel } from "drizzle-orm";
import { pgTable, varchar, timestamp, uuid } from "drizzle-orm/pg-core";

export const user = pgTable("User", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  email: varchar("email", { length: 64 }),
  password: varchar("password", { length: 64 }),
  publicAddress: varchar("publicAddress", { length: 255 }).notNull().unique(),
  cryptoNonce: varchar("cryptoNonce", { length: 255 }),
  cryptoNonceExpires: timestamp("cryptoNonceExpires"),
  balance: varchar("balance"),
});

export type User = InferSelectModel<typeof user>;

export const match = pgTable("Match", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  player_1: uuid("player_1")
    .notNull()
    .references(() => user.id),
  player_2: uuid("player_2")
    .notNull()
    .references(() => user.id),
  date: timestamp("date").defaultNow().notNull(),
  nft_token: varchar("nft_token", { length: 255 }),
  nft_id: varchar("nft_id", { length: 255 }),
  winner_id: uuid("winner_id").references(() => user.id),
  nft_name: varchar("nft_name", { length: 255 }),
  is_status: varchar("is_status", { length: 255 }).default("open"),
});

export type Match = InferSelectModel<typeof match>;

export const bet = pgTable("Bet", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  bet_user: uuid("bet_user")
    .notNull()
    .references(() => user.id),
  match: uuid("match")
    .notNull()
    .references(() => match.id),
  date: timestamp("date").defaultNow().notNull(),
  winning_status: varchar("winning_status", { length: 255 }).default("pending"),
  nft_token: varchar("nft_token", { length: 255 }),
  nft_id: varchar("nft_id", { length: 255 }),
  nft_name: varchar("nft_name", { length: 255 }),
  amount: varchar("amount", { length: 255 }).default("0"),
  predict_user: uuid("predict_user")
    .notNull()
    .references(() => user.id),
});

export type Bet = InferSelectModel<typeof bet>;

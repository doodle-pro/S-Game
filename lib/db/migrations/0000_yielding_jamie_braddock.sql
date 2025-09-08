CREATE TABLE IF NOT EXISTS "Bet" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"bet_user" uuid NOT NULL,
	"match" uuid NOT NULL,
	"date" timestamp DEFAULT now() NOT NULL,
	"winning_status" varchar(255) DEFAULT 'pending',
	"nft_token" varchar(255),
	"nft_id" varchar(255),
	"nft_name" varchar(255),
	"amount" varchar(255) DEFAULT '0',
	"predict_user" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Match" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"player_1" uuid NOT NULL,
	"player_2" uuid NOT NULL,
	"date" timestamp DEFAULT now() NOT NULL,
	"nft_token" varchar(255),
	"nft_id" varchar(255),
	"winner_id" uuid,
	"nft_name" varchar(255),
	"is_status" varchar(255) DEFAULT 'open'
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "User" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(64),
	"password" varchar(64),
	"publicAddress" varchar(255) NOT NULL,
	"cryptoNonce" varchar(255),
	"cryptoNonceExpires" timestamp,
	"balance" varchar,
	CONSTRAINT "User_publicAddress_unique" UNIQUE("publicAddress")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Bet" ADD CONSTRAINT "Bet_bet_user_User_id_fk" FOREIGN KEY ("bet_user") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Bet" ADD CONSTRAINT "Bet_match_Match_id_fk" FOREIGN KEY ("match") REFERENCES "public"."Match"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Bet" ADD CONSTRAINT "Bet_predict_user_User_id_fk" FOREIGN KEY ("predict_user") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Match" ADD CONSTRAINT "Match_player_1_User_id_fk" FOREIGN KEY ("player_1") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Match" ADD CONSTRAINT "Match_player_2_User_id_fk" FOREIGN KEY ("player_2") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Match" ADD CONSTRAINT "Match_winner_id_User_id_fk" FOREIGN KEY ("winner_id") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

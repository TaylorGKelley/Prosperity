ALTER TABLE "users" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "users" CASCADE;--> statement-breakpoint
ALTER TABLE "user_budget" DROP CONSTRAINT "user_budget_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "bank" ALTER COLUMN "color" SET DEFAULT 'SKY';--> statement-breakpoint
ALTER TABLE "category" ALTER COLUMN "icon" SET DEFAULT 'TRUCK';--> statement-breakpoint
ALTER TABLE "category" ALTER COLUMN "color" SET DEFAULT 'BLUE';--> statement-breakpoint
ALTER TABLE "budget" ALTER COLUMN "color" SET DEFAULT 'STONE';--> statement-breakpoint
ALTER TABLE "saving_goal" ALTER COLUMN "icon" SET DEFAULT 'SHOVEL';--> statement-breakpoint
ALTER TABLE "saving_goal" ALTER COLUMN "color" SET DEFAULT 'ROSE';--> statement-breakpoint
ALTER TABLE "user_budget" ADD CONSTRAINT "user_budget_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
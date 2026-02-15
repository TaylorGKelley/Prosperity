CREATE TYPE "public"."color" AS ENUM('RED', 'SKY', 'BLUE', 'CYAN', 'LIME', 'PINK', 'ROSE', 'TEAL', 'AMBER', 'GREEN', 'SLATE', 'STONE', 'INDIGO', 'ORANGE', 'PURPLE', 'VIOLET', 'YELLOW', 'EMERALD', 'FUSCHIA');--> statement-breakpoint
CREATE TYPE "public"."icon" AS ENUM('ALARM_CLOCK', 'ALBUM', 'AMBULANCE', 'AMPHORA', 'ANCHOR', 'ANTENNA', 'ANVIL', 'APPLE', 'ARCHIVE', 'ARMCHAIR', 'AXE', 'BABY', 'BACKPACK', 'BANANNA', 'BANDAGE', 'BANKNOTE', 'BATH', 'BEAN', 'BED', 'BEEF', 'BEER', 'BICEPS_FLEXED', 'BIKE', 'BINOCULARS', 'BIRD', 'BOOK', 'BOOM_BOX', 'BOT', 'BOW_ARROW', 'BRAIN', 'BRIEFCASE', 'BRUSH', 'BRUSH_CLEANING', 'BUBBLES', 'BUG', 'BUILDING', 'BUS', 'CABLE', 'CAKE', 'CALCULATOR', 'CAMERA', 'CANDY', 'CANDY_CANE', 'CAR', 'CAR_FRONT', 'CARAVAN', 'CARROT', 'CASTLE', 'CAT', 'CHEF_HAT', 'CHERRY', 'CHURCH', 'CIGARETTE', 'CIRCLE_DASHED', 'CITRUS', 'CLAPPERBOARD', 'CLIPBOARD', 'CLOCK', 'CLOUD', 'CLOVER', 'COFFEE', 'COOKIE', 'CROISSANT', 'DOG', 'DOOR_CLOSED', 'DRAMA', 'DRILL', 'DRUM', 'DRUMSTICK', 'DUMBBELL', 'EARTH', 'ELLIPSIS', 'FUEL', 'GIFT', 'GAMEPAD', 'GHOST', 'GLASS_WATER', 'GUITAR', 'HAM', 'HAMBURGER', 'HAMMER', 'HAT_GLASSES', 'HEADPHONES', 'HEART', 'HOSPITAL', 'HOTEL', 'HOUSE', 'ICE_CREAM_CONE', 'LAMP', 'LAPTOP', 'LEAF', 'LIGHTBULB', 'MARTINI', 'MEDAL', 'MOUNTAIN', 'NEWSPAPER', 'PACKAGE', 'PAINTBRUSH', 'PALETTE', 'PARTY_POPPER', 'PAW_PRINT', 'PHONE', 'PIANO', 'PICKAXE', 'PIGGY_BANK', 'PIZZA', 'PLANE', 'POCKET_KNIFE', 'POPCORN', 'POPSICLE', 'PRINTER', 'PUZZLE', 'RABBIT', 'RAT', 'RECEIPT_TEXT', 'ROCKET', 'ROCKING_CHAIR', 'ROLLER_COASTER', 'SAILBOAT', 'SALAD', 'SANDWICH', 'SHIP', 'SHIRT', 'SHOPPING_BAG', 'SHOPPING_BASKET', 'SHOPPING_CART', 'SHOVEL', 'SHOWER_HEAD', 'SHRIMP', 'SHRUB', 'SKULL', 'SNOWFLAKE', 'SOFA', 'SPEAKER', 'SPROUT', 'SQUIRREL', 'STETHOSCOPE', 'STORE', 'SUN', 'TAG', 'TENT_TREE', 'THEATER', 'TRACTOR', 'TREE_PINE', 'TRUCK', 'TURTLE', 'UMBRELLA', 'UTENSILS', 'WHEAT', 'WRENCH', 'WALLET');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('POSTED', 'PENDING');--> statement-breakpoint
CREATE TYPE "public"."transaction_type" AS ENUM('CASH', 'DEBIT_CARD', 'CREDIT_CARD', 'BANK_TRANSFER', 'CHECK', 'GIFT_CARD');--> statement-breakpoint
CREATE TABLE "account" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"teller_id" varchar(256) NOT NULL,
	"budget_id" uuid NOT NULL,
	"color" "color" DEFAULT 'FUSCHIA' NOT NULL,
	"access_token" text NOT NULL,
	"access_token_iv" varchar(64) NOT NULL,
	CONSTRAINT "account_id_unique" UNIQUE("id"),
	CONSTRAINT "account_teller_id_unique" UNIQUE NULLS NOT DISTINCT("teller_id")
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"image" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "category" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"budget_id" uuid NOT NULL,
	"name" varchar NOT NULL,
	"amount" numeric NOT NULL,
	"icon" "icon" DEFAULT 'WALLET' NOT NULL,
	"color" "color" DEFAULT 'SKY' NOT NULL,
	"start_date" date DEFAULT now() NOT NULL,
	"end_date" date
);
--> statement-breakpoint
CREATE TABLE "budget" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(256) NOT NULL,
	"color" "color" DEFAULT 'CYAN' NOT NULL,
	"is_default" boolean DEFAULT false NOT NULL,
	CONSTRAINT "budget_id_unique" UNIQUE("id"),
	CONSTRAINT "budget_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "transaction" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"teller_id" varchar(256) NOT NULL,
	"account_id" uuid NOT NULL,
	"category_id" uuid,
	"amount" real NOT NULL,
	"date" date DEFAULT now() NOT NULL,
	"description" text NOT NULL,
	"status" "status" NOT NULL,
	"type" varchar(128) NOT NULL,
	"metadata" jsonb,
	CONSTRAINT "transaction_teller_id_unique" UNIQUE("teller_id")
);
--> statement-breakpoint
CREATE TABLE "saving_goal" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"budget_id" uuid NOT NULL,
	"title" varchar(256) NOT NULL,
	"icon" "icon" DEFAULT 'RABBIT' NOT NULL,
	"color" "color" DEFAULT 'ORANGE' NOT NULL,
	"target_amount" real NOT NULL,
	"current_amount" real DEFAULT 0 NOT NULL,
	"contribution_amount" real NOT NULL,
	"last_contribution" timestamp DEFAULT now() NOT NULL,
	"prioritize" boolean DEFAULT false NOT NULL,
	CONSTRAINT "saving_goal_title_unique" UNIQUE("title"),
	CONSTRAINT "saving_goal_budget_id_unique" UNIQUE("budget_id")
);
--> statement-breakpoint
CREATE TABLE "user_budget" (
	"user_id" uuid NOT NULL,
	"budget_id" uuid NOT NULL,
	CONSTRAINT "user_budget_user_id_budget_id_pk" PRIMARY KEY("user_id","budget_id")
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_budget_id_budget_id_fk" FOREIGN KEY ("budget_id") REFERENCES "public"."budget"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "category" ADD CONSTRAINT "category_budget_id_budget_id_fk" FOREIGN KEY ("budget_id") REFERENCES "public"."budget"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_account_id_account_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."account"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_category_id_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."category"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "saving_goal" ADD CONSTRAINT "saving_goal_budget_id_budget_id_fk" FOREIGN KEY ("budget_id") REFERENCES "public"."budget"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_budget" ADD CONSTRAINT "user_budget_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_budget" ADD CONSTRAINT "user_budget_budget_id_budget_id_fk" FOREIGN KEY ("budget_id") REFERENCES "public"."budget"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "session_userId_idx" ON "session" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "verification_identifier_idx" ON "verification" USING btree ("identifier");
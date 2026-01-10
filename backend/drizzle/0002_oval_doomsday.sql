ALTER TABLE "folders" DROP CONSTRAINT "folder_self_reference";
--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();
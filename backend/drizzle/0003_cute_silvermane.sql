ALTER TABLE "folders" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "folders" CASCADE;--> statement-breakpoint
ALTER TABLE "files" DROP CONSTRAINT "files_folder_id_folders_id_fk";
--> statement-breakpoint
ALTER TABLE "files" ADD COLUMN "parent_id" uuid;--> statement-breakpoint
ALTER TABLE "files" DROP COLUMN "folder_id";
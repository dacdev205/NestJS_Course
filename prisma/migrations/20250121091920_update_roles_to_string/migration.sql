/*
  Warnings:

  - The `roles` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "roles",
ADD COLUMN     "roles" TEXT NOT NULL DEFAULT 'USER';

-- DropEnum
DROP TYPE "ROLES";

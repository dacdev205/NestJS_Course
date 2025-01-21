/*
  Warnings:

  - The `roles` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ROLES" AS ENUM ('ADMIN', 'USER');

-- AlterTable
ALTER TABLE "user" DROP COLUMN "roles",
ADD COLUMN     "roles" "ROLES" NOT NULL DEFAULT 'USER';

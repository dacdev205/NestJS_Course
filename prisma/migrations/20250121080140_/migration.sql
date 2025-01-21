/*
  Warnings:

  - You are about to drop the column `roles` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "roles",
ADD COLUMN     "role_id" VARCHAR(36);

-- DropEnum
DROP TYPE "ROLES";

-- CreateTable
CREATE TABLE "roles" (
    "id" VARCHAR(36) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "deleted_at" TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `delivery_information` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "delivery_information",
ADD COLUMN     "delivery_info" VARCHAR(255);

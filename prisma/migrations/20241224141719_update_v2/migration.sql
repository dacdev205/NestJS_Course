/*
  Warnings:

  - Added the required column `url_source` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "product" ADD COLUMN     "url_source" TEXT NOT NULL;

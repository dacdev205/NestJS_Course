/*
  Warnings:

  - You are about to drop the column `isDeleted` on the `brand` table. All the data in the column will be lost.
  - You are about to drop the `category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_brand_id_fkey";

-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_category_id_fkey";

-- AlterTable
ALTER TABLE "brand" DROP COLUMN "isDeleted",
ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- DropTable
DROP TABLE "category";

-- DropTable
DROP TABLE "product";

-- CreateTable
CREATE TABLE "categories" (
    "id" VARCHAR(36) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "deleted_at" TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" VARCHAR(36) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "url_source" VARCHAR(255) NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "sku" VARCHAR(255) NOT NULL,
    "price" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "features" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "specifications" TEXT NOT NULL,
    "images" TEXT[],
    "warranty" TEXT NOT NULL DEFAULT '',
    "delivery_information" VARCHAR(255),
    "deleted_at" TIMESTAMP,
    "category_id" VARCHAR(36) NOT NULL,
    "brand_id" VARCHAR(36),

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "brand"("id") ON DELETE SET NULL ON UPDATE CASCADE;

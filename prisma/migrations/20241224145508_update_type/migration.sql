/*
  Warnings:

  - You are about to alter the column `name` on the `brand` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(36)`.
  - You are about to alter the column `name` on the `category` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(36)`.
  - You are about to drop the column `brandId` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `product` table. All the data in the column will be lost.
  - You are about to alter the column `title` on the `product` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `price` on the `product` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Real`.
  - You are about to alter the column `features` on the `product` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `specifications` on the `product` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `images` on the `product` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `url_source` on the `product` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - A unique constraint covering the columns `[description]` on the table `category` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `brand_id` to the `product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category_id` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_brandId_fkey";

-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_categoryId_fkey";

-- AlterTable
ALTER TABLE "brand" ALTER COLUMN "name" SET DATA TYPE VARCHAR(36);

-- AlterTable
ALTER TABLE "category" ALTER COLUMN "name" SET DATA TYPE VARCHAR(36);

-- AlterTable
ALTER TABLE "product" DROP COLUMN "brandId",
DROP COLUMN "categoryId",
ADD COLUMN     "brand_id" TEXT NOT NULL,
ADD COLUMN     "category_id" TEXT NOT NULL,
ALTER COLUMN "title" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "price" SET DATA TYPE REAL,
ALTER COLUMN "features" SET DATA TYPE VARCHAR(255)[],
ALTER COLUMN "specifications" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "images" SET DATA TYPE VARCHAR(255)[],
ALTER COLUMN "url_source" SET DATA TYPE VARCHAR(255);

-- CreateIndex
CREATE UNIQUE INDEX "category_description_key" ON "category"("description");

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

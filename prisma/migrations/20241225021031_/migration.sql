-- AlterTable
ALTER TABLE "brand" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "category" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "product" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

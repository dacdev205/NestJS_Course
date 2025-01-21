-- CreateEnum
CREATE TYPE "ROLES" AS ENUM ('ADMIN', 'USER');

-- CreateTable
CREATE TABLE "brand" (
    "id" VARCHAR(36) NOT NULL,
    "name" TEXT NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "deleted_at" TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "brand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" VARCHAR(36) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
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
    "slug" VARCHAR(255) NOT NULL,
    "delivery_info" VARCHAR(255),
    "deleted_at" TIMESTAMP,
    "category_id" VARCHAR(36) NOT NULL,
    "brand_id" VARCHAR(36),

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" VARCHAR(36) NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "role" "ROLES" NOT NULL DEFAULT 'USER',
    "code_id" VARCHAR(255),
    "code_exprired_at" TIMESTAMP,
    "deleted_at" TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "brand_name_key" ON "brand"("name");

-- CreateIndex
CREATE UNIQUE INDEX "user_phone_key" ON "user"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "brand"("id") ON DELETE SET NULL ON UPDATE CASCADE;

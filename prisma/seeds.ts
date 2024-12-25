import { PrismaClient } from '@prisma/client';
import { WasherDryer, Rangehood, Diswasher } from './seeds/products';
import { getCategoryName } from 'src/shared/utilities/getCategoryName';

const prisma = new PrismaClient();

async function createProduct() {
  const allProducts = [
    ...WasherDryer.data,
    ...Rangehood.data,
    ...Diswasher.data,
  ];
  const existingUrl = [];

  for (const product of allProducts) {
    if (
      !product ||
      !product.title ||
      !product.url_source ||
      !product.sku ||
      !product.images ||
      !product.specifications
    ) {
      continue;
    }
    if (existingUrl.includes(product.url_source)) {
      continue;
    } else {
      existingUrl.push(product.url_source);
    }
    const existingSku = await prisma.product.findUnique({
      where: { sku: product.sku },
    });
    if (existingSku) {
      continue;
    }
    const brand = await prisma.brand.upsert({
      where: { name: product.brand },
      update: {},
      create: { name: product.brand },
    });
    const categoryName = getCategoryName(product.title);

    if (!categoryName) {
      continue;
    }
    const category = await prisma.category.upsert({
      where: { name: categoryName },
      update: {},
      create: { name: categoryName },
    });

    await prisma.product.create({
      data: {
        title: product.title,
        url_source: product.url_source,
        description: product.description,
        sku: product.sku,
        price: product.price,
        features: product.features,
        specifications: product.specifications,
        warranty: product.warranty,
        images: {
          set: product.images,
        },
        brandId: brand.id,
        categoryId: category.id,
      },
    });
  }
  console.log('Products created');
}

createProduct()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

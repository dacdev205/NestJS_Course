import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { UpdateProductDto } from '../dto/update-product.dto';
import { CreateProductDto } from '../dto/create-product.dto';
import { FilterProductDto } from '../dto/filter-product.dto';

@Injectable()
export class ProductRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(requestBody: CreateProductDto) {
    const brandExists = await this.prisma.brand.findUnique({
      where: { id: requestBody.brandId },
    });
    if (!brandExists) {
      throw new Error('Invalid brandId: Brand does not exist.');
    }
    const categoryExists = await this.prisma.category.findUnique({
      where: { id: requestBody.categoryId },
    });
    if (!categoryExists) {
      throw new Error('Invalid categoryId: Category does not exist.');
    }
    const existingSku = await this.prisma.product.findUnique({
      where: { sku: requestBody.sku },
    });
    if (existingSku) {
      throw new Error('Invalid SKU: Product with the same SKU already exists.');
    }
    try {
      return this.prisma.product.create({
        data: {
          title: requestBody.title,
          description: requestBody.description,
          price: requestBody.price,
          sku: requestBody.sku,
          features: { set: requestBody.features },
          specifications: requestBody.specifications,
          images: { set: requestBody.images },
          warranty: requestBody.warranty,
          deliveryInfo: requestBody.deliveryInfo,
          categoryId: requestBody.categoryId,
          brandId: requestBody.brandId,
          url_source: requestBody.url_source,
        },
      });
    } catch (error) {
      throw error.message;
    }
  }
  async findAll(title?: string) {
    return this.prisma.product.findMany({
      where: {
        isDeleted: false,
        title: title ? { contains: title, mode: 'insensitive' } : undefined,
      },
    });
  }
  async filter(filter: FilterProductDto) {
    const { categoryId, brandId, title } = filter;
    return this.prisma.product.findMany({
      where: {
        isDeleted: false,
        categoryId: categoryId ? { equals: categoryId } : undefined,
        brandId: brandId ? { equals: brandId } : undefined,
        title: title ? { contains: title, mode: 'insensitive' } : undefined,
      },
    });
  }
  async sorting(orderDirection: 'asc' | 'desc' = 'asc') {
    return this.prisma.product.findMany({
      where: { isDeleted: false },
      orderBy: [{ price: orderDirection }],
    });
  }

  async findById(id: string) {
    return this.prisma.product.findUnique({ where: { id } });
  }
  async update(id: string, requestBody: UpdateProductDto) {
    return this.prisma.product.update({
      where: { id },
      data: {
        title: requestBody.title ?? undefined,
        description: requestBody.description ?? undefined,
        price: requestBody.price ?? undefined,
        sku: requestBody.sku ?? undefined,
        features: requestBody.features
          ? { set: requestBody.features }
          : undefined,
        specifications: requestBody.specifications ?? undefined,
        images: requestBody.images ? { set: requestBody.images } : undefined,
        warranty: requestBody.warranty ?? undefined,
        deliveryInfo: requestBody.deliveryInfo ?? undefined,
        categoryId: requestBody.categoryId ?? undefined,
        brandId: requestBody.brandId ?? undefined,
        url_source: requestBody.url_source ?? undefined,
      },
    });
  }

  async softDelete(id: string, isDeleted: boolean) {
    return this.prisma.category.update({
      where: { id },
      data: { isDeleted },
    });
  }
}

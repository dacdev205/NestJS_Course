import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  PRODUCT_CREATE_FAILED,
  PRODUCT_NOTFOUND,
  PRODUCT_UPDATE_FAILED,
} from 'src/content/errors/product.error';
import { Prisma, Product } from '@prisma/client';

import { BRAND_NOTFOUND } from 'src/content/errors/brand.error';
import { BrandService } from '../brand/brand.service';
import { CATEGORY_NOTFOUND } from 'src/content/errors/category.error';
import { CategoryService } from './../category/category.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { FilterProductDto } from './dtos/filter-product.dto';
import { ProductRepository } from 'src/module/product/product.repo';
import { UpdateProductDto } from './dtos/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly categoryService: CategoryService,
    private readonly brandService: BrandService,
  ) {}
  async existing_sku(sku: string): Promise<boolean> {
    const select: Prisma.ProductSelect = {
      id: true,
    };
    const where: Prisma.ProductWhereInput = {
      sku,
      deletedAt: {
        equals: null,
      },
    };
    const product = await this.productRepository.findFirst({
      where,
      select,
    });
    if (product) {
      return true;
    }
  }
  async create(requestBody: CreateProductDto): Promise<Product> {
    const existing_sku = await this.existing_sku(requestBody.sku);
    if (existing_sku) {
      throw new BadRequestException(PRODUCT_CREATE_FAILED);
    }

    const category = await this.categoryService.findCategoryById(
      requestBody.categoryId,
    );
    if (!category) {
      throw new NotFoundException(CATEGORY_NOTFOUND);
    }

    const brand = await this.brandService.findBrandById(requestBody.brandId);
    if (!brand) {
      throw new NotFoundException(BRAND_NOTFOUND);
    }
    const data = {
      title: requestBody.title,
      description: requestBody.description,
      sku: requestBody.sku,
      price: requestBody.price,
      features: requestBody.features,
      specifications: requestBody.specifications,
      images: requestBody.images,
      warranty: requestBody.warranty,
      deliveryInfo: requestBody.deliveryInfo,
      urlSource: requestBody.url_source,
      category: {
        connect: { id: requestBody.categoryId },
      },
      brand: {
        connect: { id: requestBody.brandId },
      },
    };

    const product = await this.productRepository.create({ data });
    return product;
  }

  async findAll(filter: FilterProductDto): Promise<any> {
    const { search, filter: filters, sort } = filter;

    const where: Prisma.ProductWhereInput = {
      deletedAt: { equals: null },
      OR: search
        ? [
            { title: { contains: search, mode: 'insensitive' } },
            { sku: { contains: search, mode: 'insensitive' } },
            {
              category: {
                name: { contains: search },
                deletedAt: { equals: null },
              },
            },
            {
              brand: {
                name: { contains: search },
                deletedAt: { equals: null },
              },
            },
          ]
        : undefined,
      AND: filters?.map(({ field, value }) =>
        field === 'category'
          ? {
              category: {
                name: { equals: value },
                deletedAt: { equals: null },
              },
            }
          : field === 'brand'
            ? {
                brand: { name: { equals: value }, deletedAt: { equals: null } },
              }
            : { [field]: value },
      ),
    };

    const orderBy = sort?.map(({ field, value }) => ({ [field]: value })) || [];

    const products = await this.productRepository.findAll({
      select: {
        id: true,
        title: true,
        sku: true,
        price: true,
        category: { select: { name: true } },
        brand: { select: { name: true } },
      },
      where,
      orderBy,
    });

    return {
      count: products.length,
      data: products,
    };
  }

  async findProductById(id: string): Promise<Product | null> {
    const select: Prisma.ProductSelect = {
      id: true,
      title: true,
      description: true,
      sku: true,
      price: true,
      features: true,
      specifications: true,
      images: true,
      warranty: true,
      deliveryInfo: true,
      category: {
        select: {
          id: true,
          name: true,
        },
      },
      brand: {
        select: {
          id: true,
          name: true,
        },
      },
    };
    const where: Prisma.ProductWhereUniqueInput = {
      id,
      deletedAt: {
        equals: null,
      },
    };
    const product = await this.productRepository.findById({
      select,
      where,
    });
    if (!product) {
      throw new NotFoundException(PRODUCT_NOTFOUND);
    }
    return product;
  }
  async softDeleteProductById(id: string) {
    const product = await this.findProductById(id);
    if (!product) {
      throw new NotFoundException(PRODUCT_NOTFOUND);
    }

    const where: Prisma.ProductWhereUniqueInput = {
      id,
      deletedAt: {
        equals: null,
      },
    };
    const data: Prisma.ProductUpdateInput = {
      deletedAt: new Date(),
    };
    return this.productRepository.update({
      where,
      data,
    });
  }
  async update(id: string, requestBody: UpdateProductDto): Promise<Product> {
    const product = await this.findProductById(id);
    if (!product) {
      throw new NotFoundException(PRODUCT_NOTFOUND);
    }

    if (requestBody.sku) {
      const existing_sku = await this.existing_sku(requestBody.sku);
      if (existing_sku) {
        throw new BadRequestException(PRODUCT_UPDATE_FAILED);
      }
    }

    if (requestBody.categoryId) {
      const category = await this.categoryService.findCategoryById(
        requestBody.categoryId,
      );
      if (!category) {
        throw new NotFoundException(CATEGORY_NOTFOUND);
      }
    }

    if (requestBody.brandId) {
      const brand = await this.brandService.findBrandById(requestBody.brandId);
      if (!brand) {
        throw new NotFoundException(BRAND_NOTFOUND);
      }
    }

    const where: Prisma.ProductWhereUniqueInput = {
      id,
      deletedAt: {
        equals: null,
      },
    };

    const data = {
      ...requestBody,
    };

    return this.productRepository.update({
      where,
      data,
    });
  }
}

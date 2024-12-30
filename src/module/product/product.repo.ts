import { Prisma, Product } from '@prisma/client';

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class ProductRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(requestBody: Prisma.ProductCreateArgs): Promise<Product> {
    return this.prisma.product.create(requestBody);
  }

  async findAll(args?: Prisma.ProductFindManyArgs): Promise<Product[]> {
    return this.prisma.product.findMany(args);
  }

  async findById(id: Prisma.ProductFindUniqueArgs): Promise<Product> {
    return this.prisma.product.findUnique(id);
  }
  async findFirst(id: Prisma.ProductFindFirstArgs): Promise<Product | null> {
    return this.prisma.product.findFirst(id);
  }
  async update(args: Prisma.ProductUpdateArgs): Promise<Product> {
    return this.prisma.product.update(args);
  }
}

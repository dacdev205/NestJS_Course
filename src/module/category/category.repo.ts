import {} from 'src/content/errors/category.error';

import { Category, Prisma } from '@prisma/client';

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class CategoryRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(requestBody: Prisma.CategoryCreateArgs): Promise<Category> {
    return this.prisma.category.create(requestBody);
  }
  async findAll(): Promise<Category[]> {
    return this.prisma.category.findMany();
  }

  async findById(arg: Prisma.CategoryFindUniqueArgs): Promise<Category | null> {
    return this.prisma.category.findUnique(arg);
  }
  async update(arg: Prisma.CategoryUpdateArgs): Promise<Category> {
    return this.prisma.category.update(arg);
  }
}

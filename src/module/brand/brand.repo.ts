import { PrismaService } from 'src/shared/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Brand, Prisma } from '@prisma/client';

@Injectable()
export class BrandRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(requestBody: Prisma.BrandCreateArgs): Promise<Brand> {
    return this.prisma.brand.create(requestBody);
  }
  async findAll(args?: Prisma.BrandFindManyArgs): Promise<Brand[]> {
    return this.prisma.brand.findMany(args);
  }
  async findById(arg: Prisma.BrandFindUniqueArgs): Promise<Brand | null> {
    return this.prisma.brand.findUnique(arg);
  }
  async update(arg: Prisma.BrandUpdateArgs): Promise<Brand> {
    return this.prisma.brand.update(arg);
  }
}

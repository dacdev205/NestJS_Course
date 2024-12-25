import { Injectable } from '@nestjs/common';
import { CreateBrandDto } from 'src/module/brand/dto/create-brand.dto';
import { UpdateBrandDto } from 'src/module/brand/dto/update-brand.dto';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class BrandRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(requestBody: CreateBrandDto) {
    try {
      const existingBrand = await this.prisma.brand.findUnique({
        where: { name: requestBody.name },
      });
      if (existingBrand) {
        throw new Error(`Brand with name ${requestBody.name} already exists.`);
      } else {
        return this.prisma.brand.create({
          data: {
            name: requestBody.name,
          },
        });
      }
    } catch (error) {
      throw error.message;
    }
  }
  async findAll(name?: string) {
    try {
      return this.prisma.brand.findMany({
        where: {
          isDeleted: false,
          name: name ? { contains: name, mode: 'insensitive' } : undefined,
        },
      });
    } catch (error) {
      throw error.message;
    }
  }

  async findById(id: string) {
    try {
      return this.prisma.brand.findUnique({ where: { id, isDeleted: false } });
    } catch (error) {
      throw error.message;
    }
  }
  async update(id: string, requestBody: UpdateBrandDto) {
    try {
      return this.prisma.brand.update({
        where: { id },
        data: {
          name: requestBody.name,
        },
      });
    } catch (error) {
      throw error.message;
    }
  }
  async softDelete(id: string, isDeleted: boolean) {
    try {
      return this.prisma.brand.update({
        where: { id },
        data: { isDeleted },
      });
    } catch (error) {
      throw error.message;
    }
  }
}

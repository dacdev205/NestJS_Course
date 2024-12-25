import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from 'src/module/category/dto/create-category.dto';
import { UpdateCategoryDto } from 'src/module/category/dto/update-category.dto';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class CategoryRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(requestBody: CreateCategoryDto) {
    try {
      const existingCategory = await this.prisma.category.findUnique({
        where: { name: requestBody.name },
      });
      if (existingCategory) {
        throw new Error(
          `Category with name ${requestBody.name} already exists.`,
        );
      } else {
        return this.prisma.category.create({
          data: {
            name: requestBody.name,
            description: requestBody.description,
          },
        });
      }
    } catch (error) {
      throw error.message;
    }
  }
  async findAll(name?: string) {
    return this.prisma.category.findMany({
      where: {
        isDeleted: false,
        name: name ? { contains: name, mode: 'insensitive' } : undefined,
      },
    });
  }

  async findById(id: string) {
    try {
      return this.prisma.category.findUnique({
        where: { id, isDeleted: false },
      });
    } catch (error) {
      throw error.message;
    }
  }
  async update(id: string, requestBody: UpdateCategoryDto) {
    try {
      return this.prisma.category.update({
        where: { id },
        data: {
          name: requestBody.name,
          description: requestBody.description,
        },
      });
    } catch (error) {
      throw error.message;
    }
  }
  async softDelete(id: string, isDeleted: boolean) {
    try {
      return this.prisma.category.update({
        where: { id },
        data: { isDeleted },
      });
    } catch (error) {
      throw error.message;
    }
  }
}

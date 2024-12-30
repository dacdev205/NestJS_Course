import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CATEGORY_CREATE_FAILED,
  CATEGORY_NOTFOUND,
  CATEGORY_UPDATE_FAILED,
} from './../../content/errors/category.error';
import { Category, Prisma } from '@prisma/client';

import { CategoryRepository } from './category.repo';
import { CreateCategoryDto } from './dtos/create-category-schema';
import { UpdateCategoryDto } from './dtos/update-category-schema';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}
  async create(requestBody: CreateCategoryDto): Promise<Category> {
    const payload = { name: requestBody.name };
    const data = {
      ...payload,
    };
    const category = await this.categoryRepository.create({ data });
    if (!category) {
      throw new BadRequestException(CATEGORY_CREATE_FAILED);
    }
    return category;
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.findAll();
  }

  async findCategoryById(id: string): Promise<any> {
    const where: Prisma.CategoryWhereUniqueInput = {
      id,
      deletedAt: {
        equals: null,
      },
    };
    const category = await this.categoryRepository.findById({ where });
    if (!category) {
      throw new NotFoundException(CATEGORY_NOTFOUND);
    }
    return category;
  }

  async update(id: string, requestBody: UpdateCategoryDto): Promise<Category> {
    const where: Prisma.CategoryWhereUniqueInput = {
      id,
      deletedAt: {
        equals: null,
      },
    };
    const category = await this.categoryRepository.findById({ where });
    if (!category) {
      throw new NotFoundException(CATEGORY_NOTFOUND);
    }
    const category_updated = await this.categoryRepository.update({
      where,
      data: requestBody,
    });
    if (!category_updated) {
      throw new BadRequestException(CATEGORY_UPDATE_FAILED);
    }
    return category_updated;
  }
  async softDeleteCategoryById(id: string): Promise<Category> {
    const where: Prisma.CategoryWhereUniqueInput = {
      id,
      deletedAt: {
        equals: null,
      },
    };
    const category = await this.categoryRepository.findById({ where });
    if (!category) {
      throw new NotFoundException(CATEGORY_NOTFOUND);
    }
    const data: Prisma.CategoryUpdateInput = {
      deletedAt: new Date(),
    };
    return this.categoryRepository.update({
      where,
      data,
    });
  }
}

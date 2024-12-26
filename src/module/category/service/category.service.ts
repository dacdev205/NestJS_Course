import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from 'src/module/category/dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { CategoryRepository } from '../repositories/category.repo';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}
  async create(requestBody: CreateCategoryDto) {
    try {
      const category = await this.categoryRepository.create(requestBody);
      if (category) {
        return { message: 'Category created successfully', data: category };
      } else {
        throw new Error('Failed to create Croduct');
      }
    } catch (error) {
      throw error.message;
    }
  }

  async findAll(name?: string) {
    return await this.categoryRepository.findAll(name);
  }

  async findCategoryById(id: string) {
    try {
      if (!id) {
        throw new Error('Category ID is required');
      }
      const category = await this.categoryRepository.findById(id);
      if (!category) {
        throw new Error(`Category with ID ${id} not found`);
      } else {
        return category;
      }
    } catch (error) {
      throw error.message;
    }
  }
  async softDeleteCategoryById(id: string) {
    try {
      if (!id) {
        throw new Error('Category ID is required');
      }
      const category = await this.categoryRepository.findById(id);
      if (!category) {
        throw new Error(`Category with ID ${id} not found`);
      } else {
        await this.categoryRepository.softDelete(id, true);
        return `Category with ID ${id} has been soft deleted`;
      }
    } catch (error) {
      throw error.message;
    }
  }
  async update(id: string, requestBody: UpdateCategoryDto) {
    try {
      if (!id) {
        throw new Error('Category ID is required');
      }
      const checkId = await this.categoryRepository.findById(id);
      if (!checkId) {
        throw new Error(`Category with ID ${id} not found`);
      } else {
        const category = await this.categoryRepository.update(id, requestBody);
        return category;
      }
    } catch (error) {
      throw error.message;
    }
  }
}

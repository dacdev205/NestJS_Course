import { Injectable } from '@nestjs/common';
import { ProductRepository } from 'src/module/product/repositories/product.repo';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { FilterProductDto } from '../dto/filter-product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly categoryRepository: ProductRepository) {}
  async create(requestBody: CreateProductDto) {
    try {
      const product = await this.categoryRepository.create(requestBody);
      if (product) {
        return { message: 'Brand created successfully', data: product };
      } else {
        throw new Error('Failed to create brand');
      }
    } catch (error) {
      throw error.message;
    }
  }

  async findAll(title?: string) {
    try {
      return await this.categoryRepository.findAll(title);
    } catch (error) {
      throw error.message;
    }
  }
  async filter(filter: FilterProductDto) {
    try {
      return await this.categoryRepository.filter(filter);
    } catch (error) {
      throw error.message;
    }
  }
  async sorting() {
    try {
      return await this.categoryRepository.sorting();
    } catch (error) {
      throw error.message;
    }
  }
  async findProductById(id: string) {
    try {
      if (!id) {
        throw new Error('ID is required');
      }
      const category = await this.categoryRepository.findById(id);
      if (!category) {
        throw new Error(`Product with ID ${id} not found`);
      } else {
        return category;
      }
    } catch (error) {
      throw error.message;
    }
  }
  async softDeleteProductById(id: string) {
    try {
      if (!id) {
        throw new Error('ID is required');
      }
      const product = await this.categoryRepository.findById(id);
      if (!product) {
        throw new Error(`Product with ID ${id} not found`);
      } else {
        await this.categoryRepository.softDelete(id, true);
        return { message: 'Product deleted successfully' };
      }
    } catch (error) {
      throw error.message;
    }
  }
  async update(id: string, requestBody: UpdateProductDto) {
    try {
      if (!id) {
        throw new Error('ID is required');
      }
      const checkId = await this.categoryRepository.findById(id);
      if (!checkId) {
        throw new Error(`Product with ID ${id} not found`);
      } else {
        return await this.categoryRepository.update(id, requestBody);
      }
    } catch (error) {
      throw error.message;
    }
  }
}

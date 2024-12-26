import { Injectable } from '@nestjs/common';
import { ProductRepository } from 'src/module/product/repositories/product.repo';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { FilterProductDto } from '../dto/filter-product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}
  async create(requestBody: CreateProductDto) {
    try {
      const product = await this.productRepository.create(requestBody);
      if (product) {
        return { message: 'Product created successfully', data: product };
      } else {
        throw new Error('Failed to create Brand');
      }
    } catch (error) {
      throw error.message;
    }
  }

  async findAll(title?: string) {
    try {
      return await this.productRepository.findAll(title);
    } catch (error) {
      throw error.message;
    }
  }
  async filter(filter: FilterProductDto) {
    try {
      return await this.productRepository.filter(filter);
    } catch (error) {
      throw error.message;
    }
  }
  async sorting() {
    try {
      return await this.productRepository.sorting();
    } catch (error) {
      throw error.message;
    }
  }
  async findProductById(id: string) {
    try {
      if (!id) {
        throw new Error('ID is required');
      }
      const product = await this.productRepository.findById(id);
      if (!product) {
        throw new Error(`Product with ID ${id} not found`);
      } else {
        return product;
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
      await this.productRepository.softDelete(id, true);
    } catch (error) {
      throw error.message;
    }
  }
  async update(id: string, requestBody: UpdateProductDto) {
    try {
      if (!id) {
        throw new Error('ID is required');
      }
      return await this.productRepository.update(id, requestBody);
    } catch (error) {
      throw error.message;
    }
  }
}

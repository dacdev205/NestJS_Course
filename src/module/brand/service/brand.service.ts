import { Injectable } from '@nestjs/common';
import { CreateBrandDto } from 'src/module/brand/dto/create-brand.dto';
import { UpdateBrandDto } from 'src/module/brand/dto/update-brand.dto';
import { BrandRepository } from 'src/module/brand/repositories/brand.repo';

@Injectable()
export class BrandService {
  constructor(private readonly brandRepository: BrandRepository) {}
  async create(requestBody: CreateBrandDto) {
    try {
      const brand = await this.brandRepository.create(requestBody);
      if (brand) {
        return { message: 'Brand created successfully', data: brand };
      } else {
        throw new Error('Failed to create brand');
      }
    } catch (error) {
      throw error.message;
    }
  }

  async findAll(name?: string) {
    try {
      return await this.brandRepository.findAll(name);
    } catch (error) {
      throw error.message;
    }
  }
  async findBrandById(id: string) {
    try {
      if (!id) {
        throw new Error('ID is required');
      }
      const brand = await this.brandRepository.findById(id);
      if (!brand) {
        throw new Error(`Brand with ID ${id} not found`);
      } else {
        return brand;
      }
    } catch (error) {
      throw error.message;
    }
  }
  async softDeleteBrandById(id: string) {
    try {
      if (!id) {
        throw new Error('ID is required');
      }
      const brand = await this.brandRepository.findById(id);

      if (!brand) {
        throw new Error(`Brand with ID ${id} not found`);
      } else {
        await this.brandRepository.softDelete(id, true);
        return `Brand with ID ${id} has been soft deleted`;
      }
    } catch (error) {
      throw error.message;
    }
  }
  async update(id: string, requestBody: UpdateBrandDto) {
    try {
      if (!id) {
        throw new Error('ID is required');
      }
      const checkId = await this.brandRepository.findById(id);
      if (!checkId) {
        throw new Error(`Brand with ID ${id} not found`);
      } else {
        const brand = await this.brandRepository.update(id, requestBody);
        return brand;
      }
    } catch (error) {
      throw error.message;
    }
  }
}

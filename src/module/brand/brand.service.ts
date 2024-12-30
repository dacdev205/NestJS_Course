import {
  BRAND_NOTFOUND,
  BRAND_UPDATE_FAILED,
} from 'src/content/errors/brand.error';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Brand, Prisma } from '@prisma/client';

import { BrandRepository } from 'src/module/brand/brand.repo';
import { CreateBrandDto } from './dtos/create-brand-schema';
import { UpdateBrandDto } from 'src/module/brand/dtos/update-brand.dto';

@Injectable()
export class BrandService {
  constructor(private readonly brandRepository: BrandRepository) {}
  async create(requestBody: CreateBrandDto): Promise<Brand> {
    const payload = { name: requestBody.name };
    const data = {
      ...payload,
    };
    const brand = await this.brandRepository.create({ data });
    return brand;
  }

  async findAll(): Promise<Brand[]> {
    return await this.brandRepository.findAll();
  }
  async findBrandById(id: string): Promise<any> {
    const where: Prisma.BrandWhereUniqueInput = {
      id,
      deletedAt: {
        equals: null,
      },
    };
    const brand = await this.brandRepository.findById({ where });
    if (!brand) {
      throw new NotFoundException(BRAND_NOTFOUND);
    }
    return brand;
  }
  async softDeleteBrandById(id: string): Promise<Brand> {
    const where: Prisma.BrandWhereUniqueInput = {
      id,
      deletedAt: {
        equals: null,
      },
    };
    const brand = await this.brandRepository.findById({ where });
    if (!brand) {
      throw new NotFoundException(BRAND_NOTFOUND);
    }
    const data: Prisma.BrandUpdateInput = {
      deletedAt: new Date(),
    };
    return this.brandRepository.update({
      where,
      data,
    });
  }
  async update(id: string, requestBody: UpdateBrandDto): Promise<Brand> {
    const where: Prisma.BrandWhereUniqueInput = {
      id,
      deletedAt: {
        equals: null,
      },
    };
    const brand = await this.brandRepository.findById({ where });
    if (!brand) {
      throw new NotFoundException(BRAND_NOTFOUND);
    }
    const brand_updated = await this.brandRepository.update({
      where,
      data: requestBody,
    });
    if (!brand_updated) {
      throw new BadRequestException(BRAND_UPDATE_FAILED);
    }
    return brand_updated;
  }
}

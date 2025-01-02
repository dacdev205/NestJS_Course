import { create_slug } from 'src/common/utils/create-slug';
import {
  BRAND_NOTFOUND,
  BRAND_UPDATE_FAILED,
} from 'src/content/errors/brand.error';
import { BrandRepository } from 'src/module/brand/brand.repo';
import { UpdateBrandDto } from 'src/module/brand/dtos/update-brand.dto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Brand, Prisma } from '@prisma/client';
import { CreateBrandDto } from './dtos/create-brand-schema';

@Injectable()
export class BrandService {
  constructor(private readonly brandRepository: BrandRepository) {}
  async genSlug(name: string): Promise<string> {
    const slug = create_slug(name);
    return slug;
  }
  async create(requestBody: CreateBrandDto): Promise<Brand> {
    const payload = { name: requestBody.name };
    const slug = await this.genSlug(requestBody.name);
    const data = {
      slug,
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

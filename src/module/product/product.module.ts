import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { BrandModule } from '../brand/brand.module';
import { CategoryModule } from '../category/category.module';
import { ProductController } from './product.controller';
import { ProductRepository } from './product.repo';
import { ProductService } from './product.service';

@Module({
  imports: [PrismaModule, BrandModule, CategoryModule],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
})
export class ProductModule {}

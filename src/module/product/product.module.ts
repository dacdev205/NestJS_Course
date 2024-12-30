import { BrandRepository } from '../brand/brand.repo';
import { BrandService } from '../brand/brand.service';
import { CategoryRepository } from '../category/category.repo';
import { CategoryService } from '../category/category.service';
import { GlobalModule } from 'src/shared/global.module';
import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductRepository } from './product.repo';
import { ProductService } from './product.service';

@Module({
  imports: [GlobalModule],
  controllers: [ProductController],
  providers: [
    ProductService,
    ProductRepository,
    CategoryService,
    BrandService,
    CategoryRepository,
    BrandRepository,
  ],
})
export class ProductModule {}

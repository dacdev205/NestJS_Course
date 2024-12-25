import { Module } from '@nestjs/common';
import { ProductService } from './service/product.service';
import { ProductController } from './controllers/product.controller';
import { ProductRepository } from './repositories/product.repo';
import { GlobalModule } from 'src/shared/global.module';

@Module({
  imports: [GlobalModule],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
})
export class ProductModule {}

import { Module } from '@nestjs/common';
import { GlobalModule } from 'src/shared/global.module';
import { CategoryController } from './controllers/category.controller';
import { CategoryService } from './service/category.service';
import { CategoryRepository } from './repositories/category.repo';

@Module({
  imports: [GlobalModule],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepository],
})
export class CategoryModule {}

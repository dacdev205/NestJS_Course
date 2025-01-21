import { GlobalModule } from 'src/shared/global.module';
import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryRepository } from './category.repo';
import { CategoryService } from './category.service';

@Module({
  imports: [GlobalModule],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepository],
  exports: [CategoryService, CategoryRepository],
})
export class CategoryModule {}

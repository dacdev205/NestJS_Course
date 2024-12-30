import { CategoryController } from './category.controller';
import { CategoryRepository } from './category.repo';
import { CategoryService } from './category.service';
import { GlobalModule } from 'src/shared/global.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [GlobalModule],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepository],
})
export class CategoryModule {}

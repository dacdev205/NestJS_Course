import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.schema';
import { Category } from '@prisma/client';
import {
  CreateCategoryDto,
  CreateCategorySchema,
} from './dtos/create-category-schema';
import { UpdateCategoryDto } from './dtos/update-category-schema';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(CreateCategorySchema))
  async createCategory(
    @Body()
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const category = await this.categoryService.create(createCategoryDto);
    return category;
  }

  // @Get()
  // findAllCategory(): Promise<Category[]> {
  //   return this.categoryService.findAll();
  // }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Category> {
    return this.categoryService.findCategoryById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Patch('/:id/delete')
  softDeleteCategoryById(@Param('id') id: string): Promise<Category> {
    return this.categoryService.softDeleteCategoryById(id);
  }
}

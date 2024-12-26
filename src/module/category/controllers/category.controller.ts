import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import { CategoryService } from '../service/category.service';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.schema';
import { CreateCategorySchema } from 'src/validation/zod-schema/category.schema';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(CreateCategorySchema))
  async createCategory(
    @Body()
    createCategoryDto: CreateCategoryDto,
  ) {
    const category = await this.categoryService.create(createCategoryDto);
    return category;
  }

  @Get()
  findAllCategory(@Query('name') name?: string) {
    return this.categoryService.findAll(name);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findCategoryById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Patch('/:id/delete')
  softDeleteCategoryById(@Param('id') id: string) {
    return this.categoryService.softDeleteCategoryById(id);
  }
}

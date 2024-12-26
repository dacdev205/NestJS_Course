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
import { ProductService } from 'src/module/product/service/product.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.schema';
import { FilterProductDto } from '../dto/filter-product.dto';
import { CreateProductSchema } from 'src/validation/zod-schema/product.schema';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(CreateProductSchema))
  async createProduct(
    @Body()
    createProductDto: CreateProductDto,
  ) {
    const product = await this.productService.create(createProductDto);
    return product;
  }

  @Get()
  findAllProduct(@Query('title') title?: string) {
    return this.productService.findAll(title);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.productService.findProductById(id);
    } catch (error) {
      throw error.message;
    }
  }
  @Post('filter')
  filterProduct(@Query() filter: FilterProductDto) {
    return this.productService.filter(filter);
  }
  @Post('sorting-by-price')
  sorting() {
    return this.productService.sorting();
  }
  @Patch(':id')
  @UsePipes(new ZodValidationPipe(CreateProductSchema))
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Patch('/:id/delete')
  softDeleteProductById(@Param('id') id: string) {
    return this.productService.softDeleteProductById(id);
  }
}

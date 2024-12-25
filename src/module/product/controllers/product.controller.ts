import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ProductService } from 'src/module/product/service/product.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.schema';
import { CreateBrandSchema } from 'src/validation/zod-schema/brand.schema';
import { FilterProductDto } from '../dto/filter-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  createProduct(
    @Body(new ZodValidationPipe(CreateBrandSchema))
    createProductDto: CreateProductDto,
  ) {
    return {
      message: 'Brand created successfully',
      data: this.productService.create(createProductDto),
    };
  }

  @Get()
  findAllProduct(@Query('title') title?: string) {
    return this.productService.findAll(title);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findProductById(id);
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
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Patch('/:id/delete')
  softDeleteProductById(@Param('id') id: string) {
    return this.productService.softDeleteProductById(id);
  }
}

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
import { ProductService } from 'src/module/product/product.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.schema';
import { FilterProductDto } from './dtos/filter-product.dto';
import { Product } from '@prisma/client';
import {
  CreateProductSchema,
  UpdateProductDto,
} from './dtos/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(CreateProductSchema))
  async createProduct(
    @Body()
    createProductDto: CreateProductDto,
  ): Promise<Product> {
    const product = await this.productService.create(createProductDto);
    return product;
  }

  @Get()
  findAllProduct(@Query() search?: FilterProductDto): Promise<Product[]> {
    return this.productService.findAll(search);
  }
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Product> {
    return this.productService.findProductById(id);
  }

  @Patch(':id')
  @UsePipes(new ZodValidationPipe(CreateProductSchema))
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productService.update(id, updateProductDto);
  }

  @Patch('/:id/delete')
  softDeleteProductById(@Param('id') id: string) {
    return this.productService.softDeleteProductById(id);
  }
}

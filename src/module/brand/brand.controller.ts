import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
} from '@nestjs/common';
import { BrandService } from 'src/module/brand/brand.service';
import { UpdateBrandDto } from './dtos/update-brand.dto';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.schema';
import { Brand } from '@prisma/client';
import { CreateBrandDto, CreateBrandSchema } from './dtos/create-brand-schema';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(CreateBrandSchema))
  createBrand(@Body() createBrandDto: CreateBrandDto): Promise<Brand> {
    return this.brandService.create(createBrandDto);
  }

  @Get()
  findAllBrand(): Promise<Brand[]> {
    return this.brandService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Brand> {
    return this.brandService.findBrandById(id);
  }
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBrandDto: UpdateBrandDto,
  ): Promise<Brand> {
    return this.brandService.update(id, updateBrandDto);
  }

  @Patch('/:id/delete')
  softDeleteBrandById(@Param('id') id: string): Promise<Brand> {
    return this.brandService.softDeleteBrandById(id);
  }
}

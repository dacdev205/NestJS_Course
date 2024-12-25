import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateBrandDto } from 'src/module/brand/dto/create-brand.dto';
import { BrandService } from 'src/module/brand/service/brand.service';
import { UpdateBrandDto } from '../dto/update-brand.dto';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.schema';
import { CreateBrandSchema } from 'src/validation/zod-schema/brand.schema';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post()
  createBrand(
    @Body(new ZodValidationPipe(CreateBrandSchema))
    createBrandDto: CreateBrandDto,
  ) {
    return {
      message: 'Brand created successfully',
      data: this.brandService.create(createBrandDto),
    };
  }

  @Get()
  findAllBrand(@Query('name') name?: string) {
    return this.brandService.findAll(name);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.brandService.findBrandById(id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto) {
    return this.brandService.update(id, updateBrandDto);
  }

  @Patch('/:id/delete')
  softDeleteBrandById(@Param('id') id: string) {
    return this.brandService.softDeleteBrandById(id);
  }
}

import { GlobalModule } from 'src/shared/global.module';
import { Module } from '@nestjs/common';
import { BrandController } from './brand.controller';
import { BrandRepository } from './brand.repo';
import { BrandService } from './brand.service';

@Module({
  imports: [GlobalModule],
  controllers: [BrandController],
  providers: [BrandService, BrandRepository],
  exports: [BrandService, BrandRepository],
})
export class BrandModule {}

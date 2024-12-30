import { BrandController } from './brand.controller';
import { BrandRepository } from './brand.repo';
import { BrandService } from './brand.service';
import { GlobalModule } from 'src/shared/global.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [GlobalModule],
  controllers: [BrandController],
  providers: [BrandService, BrandRepository],
})
export class BrandModule {}

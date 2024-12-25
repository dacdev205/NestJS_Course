import { Module } from '@nestjs/common';
import { BrandController } from './controllers/brand.controller';
import { BrandService } from './service/brand.service';
import { BrandRepository } from './repositories/brand.repo';
import { GlobalModule } from 'src/shared/global.module';

@Module({
  imports: [GlobalModule],
  controllers: [BrandController],
  providers: [BrandService, BrandRepository],
})
export class BrandModule {}

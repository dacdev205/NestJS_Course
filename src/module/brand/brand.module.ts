import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { BrandController } from './brand.controller';
import { BrandRepository } from './brand.repo';
import { BrandService } from './brand.service';

@Module({
  imports: [PrismaModule],
  controllers: [BrandController],
  providers: [BrandService, BrandRepository],
  exports: [BrandService, BrandRepository],
})
export class BrandModule {}

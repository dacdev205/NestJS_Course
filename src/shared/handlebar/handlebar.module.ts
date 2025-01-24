import { Module } from '@nestjs/common';
import { HandlebarsService } from './handlebar.service';

@Module({
  imports: [],
  providers: [HandlebarsService],
  exports: [HandlebarsService],
})
export class HandlebarsModule {}

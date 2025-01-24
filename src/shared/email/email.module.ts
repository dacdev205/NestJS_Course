import { Module } from '@nestjs/common';
import { HandlebarsService } from '../handlebar/handlebar.service';
import { EmailProcessor } from './email.processor';
import { EmailService } from './email.service';

@Module({
  providers: [EmailProcessor, EmailService, HandlebarsService],
})
export class EmailModule {}

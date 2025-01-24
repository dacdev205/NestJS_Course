import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './module/auth/auth.module';
import { BrandModule } from './module/brand/brand.module';
import { CategoryModule } from './module/category/category.module';
import { ProductModule } from './module/product/product.module';
import { UsersModule } from './module/users/users.module';
import { EmailModule } from './shared/email/email.module';
import { QueuesModule } from './shared/queues/queues.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST || '127.0.0.1',
        port: parseInt(process.env.REDIS_PORT) || 6379,
      },
    }),
    CategoryModule,
    BrandModule,
    ProductModule,
    UsersModule,
    AuthModule,
    QueuesModule,
    EmailModule,
  ],
})
export class AppModule {}

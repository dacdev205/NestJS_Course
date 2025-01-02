import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1', { exclude: [''] });
  await app.listen(process.env.APP_PORT || 3000);
}
bootstrap();

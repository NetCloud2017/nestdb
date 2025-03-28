import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule, {
    // 关闭全局日志
    // logger: false,
    // logger: ['error', 'warn'],
  });
  app.setGlobalPrefix('api/v1');
  await app.listen(process.env.PORT ?? 3000);

  logger.log('log');
  logger.warn('warn');
}
bootstrap();

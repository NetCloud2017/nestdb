import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

import * as winston from 'winston';
import { utilities, WinstonModule } from 'nest-winston';

async function bootstrap() {
  // const logger = new Logger();
  const instance = winston.createLogger({
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          utilities.format.nestLike(),
        ),
      }),
    ],
  });
  const app = await NestFactory.create(AppModule, {
    // 关闭全局日志
    // logger: false,
    // logger: ['error', 'warn'],
    // bufferLogs: true,
    logger: WinstonModule.createLogger({
      instance,
    }),
  });
  app.setGlobalPrefix('api/v1');
  await app.listen(process.env.PORT ?? 3000);

  // logger.log('log');
  // logger.warn('warn');
}
bootstrap();

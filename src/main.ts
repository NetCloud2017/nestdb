import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import 'winston-daily-rotate-file';

import * as winston from 'winston';
import { utilities, WinstonModule } from 'nest-winston';
import { HttpExceptionFilter } from './filters/http-exception-filter';
import { AllExceptionFilter } from './filters/all-exception-filter';

async function bootstrap() {
  // const logger = new Logger();
  const instance = winston.createLogger({
    transports: [
      new winston.transports.Console({
        level: 'info',
        format: winston.format.combine(
          winston.format.timestamp(),
          utilities.format.nestLike(),
        ),
      }),
      new winston.transports.DailyRotateFile({
        level: 'warn',
        dirname: 'logs',
        filename: 'application-%DATE%.log',
        datePattern: 'YYYY-MM-DD-HH',
        zippedArchive: true,
        maxSize: '10m',
        maxFiles: '14d', // 14 天后的自动删除

        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.simple(),
        ),
      }),

      new winston.transports.DailyRotateFile({
        level: 'info',
        dirname: 'logs',
        filename: 'info-%DATE%.log',
        datePattern: 'YYYY-MM-DD-HH',
        zippedArchive: true,
        maxSize: '10m',
        maxFiles: '14d', // 14 天后的自动删除

        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.simple(),
        ),
      }),
    ],
  });

  const logger = WinstonModule.createLogger({
    instance,
  });

  const app = await NestFactory.create(AppModule, {
    // 关闭全局日志
    // logger: false,
    // logger: ['error', 'warn'],
    // bufferLogs: true,
    logger,
  });

  // 全局捕获只能有一个。
  const httpAdapter = app.get(HttpAdapterHost);

  app.useGlobalFilters(new AllExceptionFilter(logger, httpAdapter));
  app.setGlobalPrefix('api/v1');
  await app.listen(process.env.PORT ?? 3000);

  // logger.log('log');
  // logger.warn('warn');
}
bootstrap();

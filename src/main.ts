import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
async function bootstrap() {
  // const logger = new Logger();
  const app = await NestFactory.create(AppModule, {
    // 关闭全局日志
    // logger: false,
    // logger: ['error', 'warn'],
    // bufferLogs: true,
  });

  // // 全局捕获只能有一个。
  // const httpAdapter = app.get(HttpAdapterHost);
  //
  // app.useGlobalFilters(new AllExceptionFilter(logger, httpAdapter));
  app.setGlobalPrefix('api/v1');
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  await app.listen(process.env.PORT ?? 3000);

  // logger.log('log');
  // logger.warn('warn');
}
bootstrap();

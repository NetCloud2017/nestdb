import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { WinstonModule, WinstonModuleOptions } from "nest-winston";
import { Console } from "winston/lib/winston/transports";
import * as winston from 'winston';
import { utilities } from "nest-winston";
import  "winston-daily-rotate-file";
import { LogEnum } from "enum/configEnum";

@Module({
  imports: [WinstonModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (configService: ConfigService)=> {
      const consoleTransPorts = new Console({
        level: 'info',
        format: winston.format.combine(
          winston.format.timestamp(),
          utilities.format.nestLike(),
        ),
      })
      const  dailyWarnRotateFile = new winston.transports.DailyRotateFile({
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
      })
      const  dailyInfoRotateFile = new winston.transports.DailyRotateFile({
        level: configService.get(LogEnum.LOG_LEVEL),
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
      })
      
    return {
     transports: [
          consoleTransPorts, ...(configService.get(LogEnum.LOG_LEVEL) ? [dailyWarnRotateFile, dailyInfoRotateFile]: [])] 

      } as WinstonModuleOptions
    }
  })],
  controllers: [],
  providers: []
})
export class LogsModule {}

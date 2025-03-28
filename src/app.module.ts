import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
import * as Joi from 'joi';
import { ConfigEnum } from 'enum/configEnum';

import { User } from './user/user.entity';
import { Profile } from './profile/profile.entity';
import { Logs } from './logs/logs.entity';
import { Roles } from './roles/roles.entity';
import { UserModule } from './user/user.module';
import { LogsModule } from './logs/logs.module';
import { RolesModule } from './roles/roles.module';

import { Logger } from '@nestjs/common';

import { LoggerModule } from 'nestjs-pino';
import { join } from 'path';
const envFilePath = `.env.${process.env.NODE_ENV || 'development'}`;

console.log(envFilePath, 'pths');

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [() => dotenv.config({ path: '.env' })],
      isGlobal: true,
      envFilePath,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production')
          .default('development'),
        DB_HOST: Joi.string().ip(),
        DB_URL: Joi.string().domain(),
        DB_PORT: Joi.number().default(8088),
        DB_TYPE: Joi.string().valid('mysql', 'postgres'),
        DB_DATABASE: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_SYNC: Joi.boolean().default(false),
      }),
    }),

    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: 8088,
    //   username: 'postgres',
    //   password: '123',
    //   database: 'postgresdb',
    //   entities: [],
    //   synchronize: true,
    //   logging: ['error'],
    // }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        console.log(configService.get(ConfigEnum.DB_DATABASE), 'database');
        return {
          type: configService.get(ConfigEnum.DB_TYPE),
          host: configService.get(ConfigEnum.DB_HOST),
          port: configService.get(ConfigEnum.DB_PORT),
          username: configService.get(ConfigEnum.DB_USERNAME),
          password: configService.get(ConfigEnum.DB_PASSWORD),
          database: configService.get(ConfigEnum.DB_DATABASE),
          entities: [User, Profile, Roles, Logs],
          synchronize: configService.get(ConfigEnum.DB_SYNC),
          // logging: false, // process.env.NODE_ENV === 'development', //['error'],
        } as TypeOrmModuleOptions;
      },
    }),

    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          targets: [
            process.env.NODE_ENV === 'development'
              ? {
                  level: 'info',
                  target: 'pino-pretty',
                  options: {
                    colorize: true,
                  },
                }
              : {
                  level: 'info',
                  target: 'pino-roll',
                  options: {
                    file: join('logs', 'log.txt'),
                    frequency: 'daily', // hourly
                    size: '10m', // '0.1k'
                    mkdir: true,
                  },
                },
          ],
        },
        // process.env.NODE_ENV === 'development'
        //   ? {
        //       target: 'pino-pretty',
        //       options: {
        //         colorize: true,
        //       },
        //     }
        //   : {
        //       target: 'pino-roll',
        //       options: {
        //         file: 'logs/log.txt',
        //         frequency: 'daily',
        //         mkdir: true,
        //       },
        //     },
      },
    }),
    UserModule,
    LogsModule,
    RolesModule,
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
  exports: [Logger],
})
export class AppModule {}

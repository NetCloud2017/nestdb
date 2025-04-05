import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Logs } from './src/logsModule/logs.entity';
import { Profile } from './src/profile/profile.entity';
import { Roles } from './src/roles/roles.entity';
import { User } from './src/user/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as fs from 'fs';
import * as dotEnv from 'dotenv';
import { ConfigEnum } from './enum/configEnum';
function getEnv(path: string): Record<string, unknown> {
  if (fs.existsSync(path)) {
    return dotEnv.parse(fs.readFileSync(path));
  }
  return {};
}

function buildConnectionOption() {
  const defaultConfig = getEnv('.env');
  const envConfig = getEnv(`.env.${process.env.NODE_ENV || 'development'}`);

  const config = { ...defaultConfig, ...envConfig };

  return {
    type: config[ConfigEnum.DB_TYPE],
    host: config[ConfigEnum.DB_HOST],
    port: config[ConfigEnum.DB_PORT],
    username: config[ConfigEnum.DB_USERNAME],
    password: config[ConfigEnum.DB_PASSWORD],
    database: config[ConfigEnum.DB_DATABASE],
    entities: [User, Profile, Roles, Logs],
    synchronize: true,
    // logging: false, // process.env.NODE_ENV === 'development', //['error'],
  } as TypeOrmModuleOptions;
}

export const connectionParams = buildConnectionOption();

export default new DataSource({
  ...connectionParams,
  migrations: ['src/migrations/**'],
  subscribers: [],
} as DataSourceOptions);

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Logs } from 'src/logs/logs.entity';
import { Profile } from 'src/profile/profile.entity';
import { Roles } from 'src/roles/roles.entity';
import { User } from 'src/user/user.entity';

export default {
  type: 'postgres',
  host: '127.0.0.1',
  port: 8088,
  username: 'postgres',
  password: '123',
  database: 'postgresdb',
  entities: [User, Profile, Roles, Logs],
  synchronize: true,
  // logging: false, // process.env.NODE_ENV === 'development', //['error'],
} as TypeOrmModuleOptions;

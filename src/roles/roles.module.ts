import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesController } from './roles.controller';
import { User } from '../user/user.entity';
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [RolesController],
  providers: [],
})
export class RolesModule {}

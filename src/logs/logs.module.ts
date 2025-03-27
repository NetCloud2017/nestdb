import { Module } from "@nestjs/common";
import { LogsService } from "./logs.service"; 
import { LogsController } from "./logs.controller";
import { Logs } from "./logs.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../user/user.entity";
@Module({
  imports: [TypeOrmModule.forFeature([Logs, User])],
  controllers: [LogsController],
  providers: [LogsService]
})
export class LogsModule {

}

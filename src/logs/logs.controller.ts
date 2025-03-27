import { Controller, Get } from "@nestjs/common";
import { LogsService } from "./logs.service";
import { Logs } from "./logs.entity";

@Controller('logs')
export class LogsController {
  constructor (
    private logsService: LogsService
  ) { }

  @Get('/logsByGroup')
  getLogsGroup(): any {
    console.log('logssssss')
    return this.logsService.findLogsByGroup('2')
  }

  @Get('/logs')
  getUserLogs(): any {
    return this.logsService.findUserLogs('2')
  }

}

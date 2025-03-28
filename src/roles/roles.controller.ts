import { Controller, Inject, Logger, LoggerService } from '@nestjs/common';

@Controller('roles')
export class RolesController {
  constructor(
    @Inject(Logger)
    private readonly logger: LoggerService,
  ) {
    this.logger.log('roles controller init');
  }
}

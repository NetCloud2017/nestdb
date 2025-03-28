import { Controller, Get, Inject, Logger, LoggerService } from '@nestjs/common';

@Controller('roles')
export class RolesController {
  constructor(private readonly logger: Logger) {
    this.logger.log('roles controller init');
  }
  @Get('/userRoles')
  findUserRoles(id: string) {
    this.logger.log('log find user roles');
    this.logger.warn('warn find user roles');
    this.logger.debug('debug find user roles');
    this.logger.error('error find user roles');
    this.logger.verbose('verbose find user roles');
  }
}

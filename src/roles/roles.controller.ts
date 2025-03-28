import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Logger,
  LoggerService,
  UnauthorizedException,
} from '@nestjs/common';

@Controller('roles')
export class RolesController {
  constructor(private readonly logger: Logger) {
    this.logger.log('roles controller init');
  }
  @Get('/userRoles')
  findUserRoles(id: string) {
    // 处理报错 过滤器
    const user = { isAdmin: false };
    if (!user.isAdmin) {
      throw new UnauthorizedException('当前用户没有权限');
      // throw new HttpException(
      //   'you is not admin forbidden to access getAllUsers',
      //   HttpStatus.FORBIDDEN,
      // );
    }
    this.logger.log('log find user roles');
    this.logger.warn('warn find user roles');
    this.logger.debug('debug find user roles');
    this.logger.error('error find user roles');
    this.logger.verbose('verbose find user roles');
  }
}

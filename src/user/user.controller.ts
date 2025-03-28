import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { User } from './user.entity';
import { Logger } from 'nestjs-pino';

@Controller('user')
export class UserController {
  // private logger = new Logger(UserController.name);
  constructor(
    private userService: UserService,
    private configService: ConfigService,
    private logger: Logger,
  ) {
    this.logger.log('UserController init');
  }

  @Get()
  getUsers(): any {
    return this.userService.findAll();
  }

  @Post()
  addUser(): any {
    const user = { username: 'tomic', password: '12345' } as User;
    return this.userService.create(user);
  }

  @Patch()
  updateUser(): any {
    const user = { username: 'dashax' } as User;
    return this.userService.update('1', user);
  }

  @Delete()
  deleteUser(): any {
    return this.userService.remove('1');
  }

  @Get('/profile')
  getUserProfile(id: string): any {
    // this.logger.log('user controller logger logs');
    return this.userService.fineProfile('1');
  }
}

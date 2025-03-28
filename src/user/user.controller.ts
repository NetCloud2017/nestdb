import { Controller, Delete, Get, Logger, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  private logger = new Logger(UserController.name);
  constructor(
    private userService: UserService,
    private configService: ConfigService,
  ) {}

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
    this.logger.log('user controller logger logs');
    return this.userService.fineProfile('1');
  }
}

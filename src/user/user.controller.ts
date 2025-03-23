import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { User } from './user.entity';

@Controller('user')
export class UserController {
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
  getUserProfile(): any {
    return this.userService.fineProfile('2');
  }
}

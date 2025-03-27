import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './profile.entity';
import { User } from '../user/user.entity';
@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(User)
    private readonly userRepostory: Repository<User>,
  ) {}
}

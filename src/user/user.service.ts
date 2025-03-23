import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepostory: Repository<User>,
  ) {}

  findAll() {
    return this.userRepostory.find();
  }
  find(username: string) {
    return this.userRepostory.findOne({
      where: { username },
    });
  }
  async create(user: User) {
    const userTmp = await this.userRepostory.create(user);
    return this.userRepostory.save(userTmp);
  }
  async update(id: string, user: Partial<User>) {
    return this.userRepostory.update(id, user);
  }
  remove(id: string) {
    return this.userRepostory.delete(id);
  }

  fineProfile(id: string) {
    return this.userRepostory.findOne({
      where: {
        id,
      },
      relations: {
        profile: true,
      },
    });
  }
}

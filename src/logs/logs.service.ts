import { Logs } from "./logs.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "../user/user.entity";

@Injectable()
export class LogsService {
  constructor (
    @InjectRepository(Logs) 
    private readonly logsRepository: Repository<Logs>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}
  findOne (id: string) {
    return this.userRepository.findOne({
      where: {
        id,
      }
    })
  }
 async findUserLogs(id: string) {
    const user = await this.findOne(id) 
    return this.logsRepository.find({
      where: {
        id,
      },
      relations: {
        user: true,
      }
    })
  }

  findLogsByGroup(id: string) {
    return this.logsRepository.query(
      'SELECT logs.result as rest, COUNT(logs.result) as count from logs, user WHERE user.id = logs.userId AND user.id = 2 GROUP BY logs.result'
    )
    // return this.logsRepository
    //   .createQueryBuilder('logs')
    //   .select('logs.result', 'result')
    //   .addSelect('COUNT("logs.result")', 'count')
    //   .leftJoinAndSelect('logs.user', 'user')
    //   .where('user.id =:id', {id})
    //   .groupBy('logs.result')
    //   .orderBy('count', 'DESC')
    //   .addOrderBy('result', 'DESC')
    //   .offset(2)
    //   .limit(3)
    //   .getRawMany()
    //
  }
}

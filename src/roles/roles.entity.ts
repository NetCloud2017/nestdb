import { User } from 'src/user/user.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Roles {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  path: string;

  @Column()
  method: string;
  @Column()
  data: string;

  @Column()
  result: number;

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}

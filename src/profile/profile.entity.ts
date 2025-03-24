import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  gender: number;
  @Column()
  photo: string;
  @Column()
  address: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}

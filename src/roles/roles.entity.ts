import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
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
}

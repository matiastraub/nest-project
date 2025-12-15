import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  constructor(user?: Partial<User>) {
    Object.assign(this, user);
  }
}

import { PrimaryGeneratedColumn, Entity, Column } from 'typeorm';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;
}

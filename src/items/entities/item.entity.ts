import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name: string;

  @Column({ default: true })
  public: boolean;

  constructor(item: Partial<Item>) {
    if (item) {
      Object.assign(this, item);
    }
  }
}

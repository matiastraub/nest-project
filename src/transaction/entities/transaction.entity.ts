import { Column, ManyToOne } from 'typeorm';
import { Account } from '../../account/entities/account.entity';

export class Transaction {
  @Column()
  name!: string;

  @Column()
  category!: string;

  @ManyToOne(() => Account, (account) => account.transaction)
  account: Account;
}

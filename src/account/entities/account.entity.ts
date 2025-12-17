import { AbstractEntity } from 'src/database/abstract.entity';
import { Entity, Column, OneToMany } from 'typeorm';

import { AccountType } from 'src/common/enums/account-type.enum';
import { Transaction } from 'src/transaction/entities/transaction.entity';

@Entity()
export class Account extends AbstractEntity<Account> {
  @Column()
  number: string;

  @Column({
    type: 'enum',
    enum: AccountType,
    default: AccountType.DEBIT,
  })
  type: AccountType;

  @OneToMany(() => Transaction, (transaction) => transaction.account, {
    cascade: true,
  })
  transaction: Transaction;
}

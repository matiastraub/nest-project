import { AbstractEntity } from 'src/database/abstract.entity';
import { Column, OneToMany } from 'typeorm';
import { AccountType } from 'src/common/enums/account-type.enum';
import { Transaction } from 'src/transaction/entities/transaction.entity';

export class Account extends AbstractEntity<Account> {
  @Column()
  accountNumber: string;

  @Column({
    type: 'enum',
    enum: AccountType,
    default: AccountType.DEBIT,
  })
  type: AccountType;

  @Column({ type: 'decimal' })
  amount: number;

  @Column()
  category!: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => Transaction, (transaction) => transaction.account, {
    cascade: true,
  })
  transaction: Transaction;
}

import { AbstractEntity } from 'src/database/abstract.entity';

import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Account } from '../../account/entities/account.entity';
import { TransactionType } from 'src/common/enums/transaction-type.enum';
@Entity()
export class Transaction extends AbstractEntity<Transaction> {
  @Column()
  name!: string;

  @Column({
    type: 'enum',
    enum: TransactionType,
    default: TransactionType.DEBIT,
  })
  type: TransactionType;

  @Column()
  category!: string;

  @Column({
    type: 'decimal',
    precision: 12,
    scale: 2,
  })
  amount!: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Account, (account) => account.transaction, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'accountId' })
  account!: Account;
}

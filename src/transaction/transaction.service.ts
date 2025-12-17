import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './entities/transaction.entity';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
//import { EventEmitter } from 'stream';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Account } from 'src/account/entities/account.entity';
import { TransactionQueryDto } from './dto/transaction-query.dto';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    private readonly entityManager: EntityManager,
    private eventEmitter: EventEmitter2,
  ) {}

  async create(accountId: number, createTransactionDto: CreateTransactionDto) {
    const account = await this.accountRepository.findOneBy({ id: accountId });

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    const tx = this.transactionRepository.create({
      ...createTransactionDto,
      account,
    });

    await this.transactionRepository.save(tx);

    this.eventEmitter.emit('transaction.created', tx);

    return tx;
  }

  findAll(accountId: number, query: TransactionQueryDto) {
    const qb = this.transactionRepository
      .createQueryBuilder('tx')
      .where('tx.accountId = :accountId', { accountId });

    if (query.type) qb.andWhere('tx.type = :type', { type: query.type });
    if (query.from) qb.andWhere('tx.createdAt >= :from', { from: query.from });
    if (query.to) qb.andWhere('tx.createdAt <= :to', { to: query.to });

    return qb.getMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}

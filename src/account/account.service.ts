import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult } from 'typeorm/browser';
import { AccountQueryDto } from './dto/account-query-dto';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(createAccountDto: CreateAccountDto) {
    const account = this.entityManager.create(Account, {
      number: createAccountDto.number,
      type: createAccountDto.type,
    });
    return this.entityManager.save(account);
  }

  async findAll(query: AccountQueryDto) {
    const qb = this.accountRepository.createQueryBuilder('account');
    if (query.type) {
      qb.andWhere('account.type = :type', { type: query.type });
    }
    return qb.getMany();
  }

  async findOne(id: number) {
    return this.accountRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateAccountDto: UpdateAccountDto,
  ): Promise<Account | undefined> {
    const account = await this.accountRepository.findOneBy({ id });
    if (account) {
      return this.accountRepository.save({ id, ...updateAccountDto });
    }
  }

  remove(id: number): Promise<DeleteResult | undefined> {
    return this.accountRepository.delete(id);
  }
}

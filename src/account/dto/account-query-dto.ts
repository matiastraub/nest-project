// account/dto/account-query.dto.ts
import { IsEnum, IsOptional } from 'class-validator';
import { AccountType } from '../../common/enums/account-type.enum';

export class AccountQueryDto {
  @IsOptional()
  @IsEnum(AccountType)
  type?: AccountType;
}

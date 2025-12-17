import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { AccountType } from 'src/common/enums/account-type.enum';

export class CreateAccountDto {
  @IsString()
  @IsNotEmpty()
  number!: string;

  @IsEnum(AccountType)
  type!: AccountType;
}

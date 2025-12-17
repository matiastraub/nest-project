import {
  IsString,
  IsNumber,
  IsEnum,
  IsNotEmpty,
  IsPositive,
  IsDateString,
} from 'class-validator';
import { TransactionType } from 'src/common/enums/transaction-type.enum';

export class CreateTransactionDto {
  @IsString()
  @IsNotEmpty()
  name!: string;
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  amount!: number;

  @IsEnum(TransactionType)
  type!: TransactionType;

  @IsString()
  @IsNotEmpty()
  category!: string;

  @IsDateString()
  date!: Date;
}

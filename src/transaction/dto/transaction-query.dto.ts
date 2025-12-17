import { IsDateString, IsOptional } from 'class-validator';

export class TransactionQueryDto {
  @IsOptional()
  @IsDateString()
  from?: string;

  @IsOptional()
  @IsDateString()
  to?: string;

  @IsOptional()
  type?: 'credit' | 'debit';
}

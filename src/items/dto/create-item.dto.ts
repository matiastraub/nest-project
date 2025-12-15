import { IsNotEmpty, IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateItemDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsBoolean()
  @IsOptional()
  public?: boolean;
}

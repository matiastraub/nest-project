import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateItemDto {
  @IsBoolean()
  @IsNotEmpty()
  public: boolean;
}

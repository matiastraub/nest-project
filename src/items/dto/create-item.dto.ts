import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateListingDto } from './create-listing.dto';

export class CreateItemDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsBoolean()
  @IsOptional()
  public?: boolean;

  @ValidateNested()
  @Type(() => CreateListingDto)
  listing: CreateListingDto;
}

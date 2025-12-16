import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsOptional,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateListingDto } from './create-listing.dto';
import { CreateTagDto } from './create-tag.dto';

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

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTagDto)
  tags?: CreateTagDto[];
}

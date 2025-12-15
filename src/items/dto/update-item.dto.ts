import {
  IsBoolean,
  IsNotEmpty,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { CreateCommentDto } from './create-comment.dto';
import { Type } from 'class-transformer';
export class UpdateItemDto {
  @IsBoolean()
  @IsNotEmpty()
  public: boolean;

  @ValidateNested({ each: true })
  @Type(() => CreateCommentDto)
  @IsOptional()
  comments?: CreateCommentDto[];
}

import { Transform, Type } from 'class-transformer';
import { IsOptional, IsString, IsArray } from 'class-validator';

export class GetPromoFilterDto {
  @IsOptional()
  @Type(() => String)
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => {
    return value.split(',');
  })
  branch_ids: string[];

  @IsOptional()
  @IsString()
  to: Date;

  @IsOptional()
  @IsString()
  active: string;
}

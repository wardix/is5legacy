import { Transform, Type } from 'class-transformer';
import { IsOptional, IsString, IsArray } from 'class-validator';

export class GetServiceFilterDto {
  @IsOptional()
  @Type(() => String)
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => {
    return value.split(',');
  })
  branch_ids: string[];
}

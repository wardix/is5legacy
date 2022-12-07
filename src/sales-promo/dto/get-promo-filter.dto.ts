import { IsOptional, IsString } from 'class-validator';

export class GetPromoFilterDto {
  @IsOptional()
  @IsString()
  branchId: string;

  @IsOptional()
  @IsString()
  to: Date;

  @IsOptional()
  @IsString()
  active: string;
}

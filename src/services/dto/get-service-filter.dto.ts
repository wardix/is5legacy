import { IsOptional, IsString } from 'class-validator';

export class GetServiceFilterDto {
  @IsOptional()
  @IsString()
  branchId: string;
}

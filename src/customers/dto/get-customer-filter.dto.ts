import { IsOptional, IsString } from 'class-validator';

export class GetCustomerFilterDto {
  @IsOptional()
  @IsString()
  cid: string;
}

import {
  Controller,
  Get,
  HttpCode,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CustomersService } from './customers.service';
import { Query } from '@nestjs/common';
import { GetCustomerFilterDto } from './dto/get-customer-filter.dto';

@UseGuards(AuthGuard('api-key'))
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  @HttpCode(200)
  async getCustomerDetail(
    @Query(ValidationPipe) filterCustomerDto: GetCustomerFilterDto,
  ) {
    try {
      const resultAllCustomers =
        await this.customersService.getCustomerServices(filterCustomerDto);
      return resultAllCustomers;
    } catch (error) {
      return {
        message: error.message,
      };
    }
  }
}

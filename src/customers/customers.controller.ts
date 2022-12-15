import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CustomersService } from './customers.service';
import { Query } from '@nestjs/common';
import { GetCustomerFilterDto } from './dto/get-customer-filter.dto';
import { CreateCustomerDto } from './dto/create-customer.dto';

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

  @Post()
  @UsePipes(ValidationPipe)
  async saveDataCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    try {
      const saveDataCustomers =
        await this.customersService.saveDataCustomerService(createCustomerDto);
      return {
        message: saveDataCustomers,
      };
    } catch (error) {
      return {
        message: error.message,
      };
    }
  }
}

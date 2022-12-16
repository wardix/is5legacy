import {
  BadRequestException,
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
      throw new BadRequestException({
        title: 'Failed',
        data: {},
        message:
          'Proses ambil data pelanggan gagal, koneksi jaringan terputus.',
      });
    }
  }

  @Post()
  @UsePipes(ValidationPipe)
  async saveDataCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    try {
      const saveDataCustomers =
        await this.customersService.saveDataCustomerService(createCustomerDto);
      return saveDataCustomers;
    } catch (error) {
      throw new BadRequestException({
        title: 'Failed',
        data: {},
        message:
          'Proses simpan data pelanggan atau data layanan, koneksi jaringan terputus.',
      });
    }
  }
}

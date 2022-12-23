import {
  Body,
  Controller,
  Get,
  HttpCode,
  InternalServerErrorException,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';

@UseGuards(AuthGuard('api-key'))
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get(':customer_id')
  @HttpCode(200)
  async getCustomerDetail(@Param('customer_id') customer_id) {
    try {
      const resultAllCustomers =
        await this.customersService.getCustomerServices(customer_id);
      return {
        data: resultAllCustomers,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        message: error.message,
      });
    }
  }

  @Post()
  @UsePipes(ValidationPipe)
  async saveDataCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    try {
      const saveDataCustomers =
        await this.customersService.saveDataCustomerLogic(createCustomerDto);
      return saveDataCustomers;
    } catch (error) {
      throw new InternalServerErrorException({
        title: 'Failed',
        message:
          'Proses simpan data pelanggan gagal, silahkan coba beberapa saat lagi.',
      });
    }
  }

  @Post(':id/services')
  @UsePipes(ValidationPipe)
  async saveDataCustServices(@Body() createCustomerDto: CreateCustomerDto) {
    try {
      const saveDataCustomerServices =
        await this.customersService.saveDataCustomerServLogic(
          createCustomerDto,
        );
      return saveDataCustomerServices;
    } catch (error) {
      throw new InternalServerErrorException({
        title: 'Failed',
        message:
          'Proses simpan data layanan gagal, silahkan coba beberapa saat lagi.',
      });
    }
  }
}

import {
  Body,
  Controller,
  Get,
  HttpCode,
  InternalServerErrorException,
  Post,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CustomersService } from './customers.service';
import { Query } from '@nestjs/common';
import { GetCustomerFilterDto } from './dto/get-customer-filter.dto';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { OperatorSubscriptionInterceptor } from './interceptors/operator-subscription.interceptor';
import { GetOperatorSubscriptionDto } from './dto/get-operator-subscription.dto';

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
      throw new InternalServerErrorException({
        title: 'Failed',
        message:
          'Proses ambil data pelanggan gagal, silahkan coba beberapa saat lagi.',
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

  @Get('operator-subscriptions')
  @UseInterceptors(OperatorSubscriptionInterceptor)
  async getOperatorSubscription(
    @Query(new ValidationPipe({ transform: true }))
    getOperatorSubscriptionDto: GetOperatorSubscriptionDto,
  ): Promise<any> {
    return this.customersService.getOperatorSubscriptions(
      getOperatorSubscriptionDto,
    );
  }
}

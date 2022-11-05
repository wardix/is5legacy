import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CustomersService } from './customers.service';

@UseGuards(AuthGuard('api-key'))
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get(':id')
  getCustomerDetail(@Param('id') id: any) {
    const customer = this.customersService.getCustomerDetail(id);
    return customer;
  }

  @Get('/rrr')
  async rrr() {
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }
}

import { Injectable } from '@nestjs/common';
import { CustomerRepository } from './customers.repository';
import { GetCustomerFilterDto } from './dto/get-customer-filter.dto';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomersService {
  constructor(private customerRepository: CustomerRepository) {}

  async getCustomerServices(
    filterCustomerDto: GetCustomerFilterDto,
  ): Promise<Customer[]> {
    return await this.customerRepository.getCustomerRepository(
      filterCustomerDto,
    );
  }
}

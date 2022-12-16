import { Injectable } from '@nestjs/common';
import { CustomerRepository } from './customers.repository';
import { GetCustomerFilterDto } from './dto/get-customer-filter.dto';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Injectable()
export class CustomersService {
  constructor(private customerRepository: CustomerRepository) {}

  async getCustomerServices(filterCustomerDto: GetCustomerFilterDto) {
    return await this.customerRepository.getCustomerRepository(
      filterCustomerDto,
    );
  }

  async saveDataCustomerService(createCustomerDto: CreateCustomerDto) {
    return await this.customerRepository.saveCustomerRepository(
      createCustomerDto,
    );
  }
}

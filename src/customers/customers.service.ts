import { Injectable } from '@nestjs/common';
import { CustomerRepository } from './customers.repository';
import { GetCustomerFilterDto } from './dto/get-customer-filter.dto';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Injectable()
export class CustomersService {
  constructor(private customerRepository: CustomerRepository) {}

  async getCustomerServices(customer_id) {
    return await this.customerRepository.getCustomerRepository(customer_id);
  }

  async saveDataCustomerLogic(createCustomerDto: CreateCustomerDto) {
    return await this.customerRepository.saveCustomerRepository(
      createCustomerDto,
    );
  }

  async saveDataCustomerServLogic(createCustomerDto: CreateCustomerDto) {
    return await this.customerRepository.saveCustomerServRepository(
      createCustomerDto,
    );
  }
}

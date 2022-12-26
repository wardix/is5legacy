import { Injectable } from '@nestjs/common';
import { CustomerRepository } from './customers.repository';
import { CreateNewCustomerDto } from './dto/create-customer.dto';
import { CreateNewServiceCustomersDto } from './dto/create-service-customer.dto';

@Injectable()
export class CustomersService {
  constructor(private customerRepository: CustomerRepository) {}

  async getCustomerServices(customer_id) {
    return await this.customerRepository.getCustomerRepository(customer_id);
  }

  async saveNewCustomerServices(createNewCustomerDto: CreateNewCustomerDto) {
    return await this.customerRepository.saveCustomerRepository(
      createNewCustomerDto,
    );
  }

  async saveDataCustomerServLogic(
    createNewServiceCustomersDto: CreateNewServiceCustomersDto,
    customer_id,
  ) {
    return await this.customerRepository.saveCustomerServiceRepository(
      createNewServiceCustomersDto,
      customer_id,
    );
  }
}

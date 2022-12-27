import { Injectable } from '@nestjs/common';
import { CustomerRepository } from './repositories/customers.repository';
import { GetCustomerFilterDto } from './dto/get-customer-filter.dto';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { GetOperatorSubscriptionDto } from './dto/get-operator-subscription.dto';
import { NOCFiberRepository } from 'src/customers/repositories/noc-fiber.repository';
import { OperatorSubscriptionRepository } from './repositories/operator-subscription.repository';

@Injectable()
export class CustomersService {
  constructor(
    private customerRepository: CustomerRepository,
    private operatorSubscription: OperatorSubscriptionRepository,
    private nocFiberRepository: NOCFiberRepository,
  ) {}

  async getCustomerServices(filterCustomerDto: GetCustomerFilterDto) {
    return await this.customerRepository.getCustomerRepository(
      filterCustomerDto,
    );
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

  async getOperatorSubscriptions(
    getOperatorSubscriptionDto: GetOperatorSubscriptionDto,
  ): Promise<any> {
    const { branchIds, status, vendorIds } = getOperatorSubscriptionDto;
    const NocFiberIds = await this.nocFiberRepository.getNocFiberId(
      branchIds,
      vendorIds,
    );
    const ArrayNocFiberIds = NocFiberIds.map((item) => item.id);
    return this.operatorSubscription.getOperatorSubscription(
      ArrayNocFiberIds,
      status,
    );
  }
}

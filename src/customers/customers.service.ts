import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './customers.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async getCustomerDetail(customerId: string) {
    return await Customer.GetAllCustomers(customerId);
    // if (queryResult.length === 0) {
    //   return {};
    // }

    // return this.transformCustomerQuery(queryResult[0]);
  }

  private transformCustomerQuery(obj) {
    return {
      name: obj.CustName,
      address: (obj.CustResAdd1 + ' ' + obj.CustResAdd2).trim(),
      email: obj.CustEmail,
      identityNumber: obj.CustIdNumber,
      phoneNumber: obj.CustHP,
      companyAddress: (obj.CustOfficeAdd1 + ' ' + obj.CustOfficeAdd2).trim(),
      companyPhoneNumber: obj.CustOfficePhone,
      billingName: obj.CustBillCP,
      billingContact: obj.CustBillCPPhone,
      billingEmail: obj.CustBillCPEmail,
      technicalName: obj.CustTechCP,
      technicalContact: obj.CustTechCPPhone,
      technicalEmail: obj.CustTechCPEmail,
    };
  }
}

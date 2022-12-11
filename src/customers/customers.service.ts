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

  async getCustomerDetail(customersId: string) {
    let queryResult;
    try {
      queryResult = await this.customerRepository.findOneBy({
        CustId: customersId,
      });
    } catch (error) {
      queryResult = null;
      console.log(error);
    }

    if (queryResult) {
      const expArray: any = [];
      expArray.push(this.transformCustomerQuery(queryResult));
      return expArray;
    }
  }

  private transformCustomerQuery(obj) {
    return {
      id: obj.CustId,
      name: obj.CustName,
      gender: obj.CustGender,
      place_of_birth: obj.CustPOB,
      date_of_birth: obj.CustDOB,
      address: (obj.CustResAdd1 + ' ' + obj.CustResAdd2).trim(),
      email: obj.CustEmail,
      identityType: obj.CustIdType != 0 ? 'Paspor' : 'KTP',
      identityNumber: obj.CustIdNumber,
      phoneNumber: obj.CustHP,
      companyName: obj.CustCompany,
      companyAddress: (obj.CustOfficeAdd1 + ' ' + obj.CustOfficeAdd2).trim(),
      companyPhoneNumber: obj.CustOfficePhone,
      billingName: obj.CustBillCP,
      billingContact: obj.CustBillCPPhone,
      billingEmail: obj.CustBillCPEmail,
      technicalName: obj.CustTechCP,
      technicalContact: obj.CustTechCPPhone,
      technicalEmail: obj.CustTechCPEmail,
      reference_id: obj.SalesId,
    };
  }
}

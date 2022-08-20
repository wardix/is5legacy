import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class CustomersService {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}


  async getCustomerDetail(customerId: string) {
    const query = `
      SELECT CustName, CustResAdd1, CustResAdd2, CustEmail, CustIdNumber,
             CustHP, CustCompany, CustOfficeAdd1, CustOfficeAdd2,
             CustOfficePhone, CustBillCP, CustBillCPPhone, CustBillCPEmail,
             CustTechCP, CustTechCPPhone, CustTechCPEmail
      FROM Customer
      WHERE CustId = ${customerId}`

    const queryResult = await this.dataSource.query(query);

    if (queryResult.length === 0) {
      return {};
    }

    return this.transformCustomerQuery(queryResult[0]);
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
      technicalEmail: obj.CustTechCPEmail
    }
  }
}

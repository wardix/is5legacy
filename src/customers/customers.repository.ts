import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { GetCustomerFilterDto } from './dto/get-customer-filter.dto';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomerRepository extends Repository<Customer> {
  constructor(private dataSource: DataSource) {
    super(Customer, dataSource.createEntityManager());
  }

  async getCustomerRepository(filterCustomerDto: GetCustomerFilterDto) {
    const { cid } = filterCustomerDto;
    let resultObject = {};

    // Step 1 : Ambil Data Customer
    const queryBuilderOne = this.createQueryBuilder('c')
      .select([
        "c.BranchId AS 'branch_id'",
        "c.DisplayBranchId AS 'display_branch_id'",
        "c.CustName AS 'full_name'",
        "c.CustGender AS 'gender'",
        "c.CustPOB AS 'place_of_birth'",
        "c.CustDOB AS 'date_of_birth'",
        "c.CustBillCPEmail AS 'email_address'",
        "c.CustHP AS 'phone_number'",
        "CONCAT(c.CustResAdd1, ', ', c.CustResAdd2, ', ', c.CustResCity) AS 'address'",
        "c.CustIdType AS 'identity_type'",
        "c.CustIdNumber AS 'identity_number'",
        "c.CustCompany AS 'company_name'",
        "CONCAT(c.CustOfficeAdd1, ', ', c.CustOfficeAdd2, ', ', c.CustOfficeCity) AS 'company_address'",
        "c.CustOfficePhone AS 'company_phone_number'",
        "c.CustBillCP AS 'billing_name'",
        "c.CustBillCPEmail AS 'billing_email'",
        "c.CustTechCP AS 'technical_name'",
        "c.CustTechCPEmail AS 'technical_email'",
      ])
      .where('c.CustId = :id', { id: cid });
    const getDataCustomerByID = await queryBuilderOne.getRawMany();
    resultObject = getDataCustomerByID[0];

    // Step 2 : Ambil Data CustomerService dan InvoiceTypeMonth
    const queryBuilderTwo = await this.dataSource.query(`
      SELECT 
      cs.ServiceId 'package_code',
      cs.Subscription 'package_price',
      itm.Month 'package_top'
      FROM CustomerServices cs
      LEFT JOIN InvoiceTypeMonth itm ON itm.InvoiceType = cs.InvoiceType 
      WHERE cs.CustId = '${cid}'
    `);
    resultObject['list_of_services'] = queryBuilderTwo;

    // Step 3 : Ambil SMS Phonebook
    const queryBuilderThree = await this.dataSource.query(
      `SELECT sp.phone FROM sms_phonebook sp WHERE sp.custId = '${cid}' AND sp.name LIKE '%${resultObject['billing_name']}%'`,
    );
    const queryBuilderFour = await this.dataSource.query(
      `SELECT sp.phone FROM sms_phonebook sp WHERE sp.custId = '${cid}' AND sp.name LIKE '%${resultObject['technical_name']}%'`,
    );
    resultObject['billing_phone'] =
      queryBuilderThree[0]?.phone !== undefined
        ? queryBuilderThree[0].phone
        : '';
    resultObject['technical_phone'] =
      queryBuilderFour[0]?.phone !== undefined ? queryBuilderFour[0].phone : '';

    return resultObject;
  }
}

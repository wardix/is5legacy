import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Customer } from './customer.entity';
import { GetCustomerFilterDto } from './dto/get-customer-filter.dto';

@Injectable()
export class CustomerRepository extends Repository<Customer> {
  constructor(private dataSource: DataSource) {
    super(Customer, dataSource.createEntityManager());
  }

  async getCustomerRepository(
    filterCustomerDto: GetCustomerFilterDto,
  ): Promise<Customer[]> {
    const { cid } = filterCustomerDto;
    const queryBuilder = this.createQueryBuilder('c')
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
        "nc.NPWP AS 'npwp_number'",
        "c.CustOfficePhone AS 'company_phone_number'",
        "c.CustBillCP AS 'billing_name'",
        "GROUP_CONCAT((CASE WHEN sp.billing = 1 THEN sp.phone ELSE '' END) SEPARATOR '') AS 'billing_phone'",
        "c.CustBillCPEmail AS 'billing_email'",
        "c.CustTechCP AS 'technical_name'",
        "GROUP_CONCAT((CASE WHEN sp.technical = 1 THEN sp.phone ELSE '' END) SEPARATOR '') AS 'technical_phone'",
        "c.CustTechCPEmail AS 'technical_email'",
        "cs.ServiceId AS 'package_init'",
        "itm.`Month` AS 'top_count'",
        "cs.promo_id AS 'promo_id'",
      ])
      .leftJoin('CustomerServices', 'cs', 'cs.CustId = c.CustId')
      .leftJoin('NPWP_Customer', 'nc', 'nc.CustId = c.CustId')
      .leftJoin('sms_phonebook', 'sp', 'sp.custId = c.CustId')
      .leftJoin('InvoiceTypeMonth', 'itm', 'itm.InvoiceType = cs.InvoiceType')
      .where('c.CustId = :id', { id: cid })
      .groupBy('c.CustId');

    const getDataCustomerByID = await queryBuilder.getRawMany();

    return getDataCustomerByID;
  }
}

import { BaseEntity, Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'Customer', synchronize: false })
export class Customer extends BaseEntity {
  @PrimaryColumn()
  CustId: string;

  @Column()
  CustName: string;

  @Column()
  CustResAdd1: string;

  @Column()
  CustResAdd2: string;

  @Column()
  CustEmail: string;

  @Column()
  CustIdNumber: string;

  @Column()
  CustHP: string;

  @Column()
  CustOfficeAdd1: string;

  @Column()
  CustOfficeAdd2: string;

  @Column()
  CustOfficePhone: string;

  @Column()
  CustBillCP: string;

  @Column()
  CustBillCPPhone: string;

  @Column()
  CustBillCPEmail: string;

  @Column()
  CustTechCP: string;

  @Column()
  CustTechCPPhone: string;

  @Column()
  CustTechCPEmail: string;

  static GetAllCustomers(customerId: string) {
    return this.createQueryBuilder('Customer')
      .where('Customer.CustId = :customerId', { customerId: customerId })
      .getOne();
  }
}

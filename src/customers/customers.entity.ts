import { BaseEntity, Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'Customer', synchronize: false })
export class Customer extends BaseEntity {
  @PrimaryColumn()
  CustId: string;

  @Column()
  CustPass: string;

  @Column()
  BranchId: string;

  @Column()
  DisplayBranchId: string;

  @Column()
  FormId: string;

  @Column()
  CustName: string;

  @Column()
  CustGender: string;

  @Column()
  CustPOB: string;

  @Column()
  CustDOB: string;

  @Column()
  CustIdType: string;

  @Column()
  CustIdNumber: string;

  @Column()
  CustCompany: string;

  @Column()
  CustBusName: string;

  @Column()
  BusId: string;

  @Column()
  CustJobTitle: string;

  @Column()
  CustResAdd1: string;

  @Column()
  CustResAdd2: string;

  @Column()
  CustResCity: string;

  @Column()
  CustResZC: string;

  @Column()
  CustResPhone: string;

  @Column()
  CustOfficeAdd1: string;

  @Column()
  CustOfficeAdd2: string;

  @Column()
  CustOfficeCity: string;

  @Column()
  CustOfficeZC: string;

  @Column()
  CustOfficePhone: string;

  @Column()
  CustBillingAdd: string;

  @Column()
  CustHP: string;

  @Column()
  CustFax: string;

  @Column()
  CustEducation: string;

  @Column()
  CustTaxNumber: string;

  @Column()
  CustWebSite: string;

  @Column()
  CustEmail: string;

  @Column()
  CustInCharge: string;

  @Column()
  CustTechCP: string;

  @Column()
  CustTechCPPosition: string;

  @Column()
  CustTechCPPhone: string;

  @Column()
  CustTechCPEmail: string;

  @Column()
  CustBillCP: string;

  @Column()
  CustBillMethodLetter: string;

  @Column()
  CustBillMethodEmail: string;

  @Column()
  CustBillCPPosition: string;

  @Column()
  CustBillCPPhone: string;

  @Column()
  CustBillCPEmail: string;

  @Column()
  CustPPn: string;

  @Column()
  CustDiscount: string;

  @Column()
  CustBalance: string;

  @Column()
  CustBalanceVB: string;

  @Column()
  CustBalanceWireless: string;

  @Column()
  CustBalanceCB: string;

  @Column()
  CustRegDate: string;

  @Column()
  CustNotes: string;

  @Column()
  EmpApproval: string;

  @Column()
  CustFlag: string;

  @Column()
  CustStatus: string;

  @Column()
  CustLastUpdated: string;

  @Column()
  CustOprUpdated: string;

  @Column()
  Temp_Cust_ID: string;

  @Column()
  SalesId: string;

  @Column()
  Surveyor: string;

  @Column()
  RefererId: string;

  @Column()
  LBWL: string;

  @Column()
  LBCB: string;

  @Column()
  LBVB: string;

  @Column()
  LBDP: string;

  @Column()
  LBWH: string;

  @Column()
  LBWD: string;

  @Column()
  LBCM: string;

  @Column()
  LBDO: string;

  @Column()
  BalanceDP1: string;

  @Column()
  BalanceDP2: string;

  @Column()
  BalanceWL1: string;

  @Column()
  BalanceWL2: string;

  @Column()
  BalanceVB1: string;

  @Column()
  BalanceVB2: string;

  @Column()
  BalanceCB1: string;

  @Column()
  BalanceCB2: string;

  @Column()
  EBalanceDP1: string;

  @Column()
  EBalanceDP2: string;

  @Column()
  EBalanceWL1: string;

  @Column()
  EBalanceWL2: string;

  @Column()
  EBalanceVB1: string;

  @Column()
  EBalanceVB2: string;

  @Column()
  EBalanceCB1: string;

  @Column()
  EBalanceCB2: string;

  @Column()
  ECustBalance: string;

  @Column()
  ECustBalanceWireless: string;

  @Column()
  ECustBalanceCB: string;

  @Column()
  ECustBalanceVB: string;

  @Column()
  EmpIdEdit: string;

  @Column()
  CustBalanceWH: string;

  @Column()
  CustBalanceWD: string;

  @Column()
  CustBalanceDO: string;

  @Column()
  CustBalanceCM: string;

  @Column()
  Saldo: string;

  @Column()
  Description: string;

  @Column()
  AI: string;

  @Column()
  InsertEmpId: string;

  @Column()
  InsertDateTime: string;

  @Column()
  UpdateDateTime: string;

  @Column()
  RekType: string;

  @Column()
  TaxType: string;

  @Column()
  Blacklisted: string;

  @Column()
  Greylisted: string;

  @Column()
  CetakDuluan: string;

  @Column()
  ResellerId: string;

  @Column()
  ManagerSalesId: string;

  @Column()
  CustCountry: string;

  @Column()
  CustCurrency: string;

  static GetAllCustomers(customerId: string) {
    return this.createQueryBuilder('Customer')
      .where('Customer.CustId = :customerId', { customerId: customerId })
      .getOne();
  }
}

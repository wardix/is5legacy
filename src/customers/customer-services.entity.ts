import { BaseEntity, Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'CustomerServices', synchronize: false })
export class CustomerServices extends BaseEntity {
  @PrimaryColumn()
  CustServId: string;

  @Column()
  CustId: string;

  @Column()
  ServiceId: string;

  @Column()
  ServiceType: string;

  @Column()
  EmpId: string;

  @Column()
  PayId: string;

  @Column()
  CustAccountNumber: string;

  @Column()
  CustStatus: string;

  @Column()
  CustRegDate: string;

  @Column()
  CustActivationDate: string;

  @Column()
  CustUpdateDate: string;

  @Column()
  CustBlockDate: string;

  @Column()
  CustBlockUntilDate: string;

  @Column()
  CustBlockFrom: string;

  @Column()
  CustUnblockDate: string;

  @Column()
  CustUnregDate: string;

  @Column()
  CustAccName: string;

  @Column()
  CustDomainReg: string;

  @Column()
  CustDomainPeriod: string;

  @Column()
  CustDomain: string;

  @Column()
  ServExpDate: string;

  @Column()
  CustNotes: string;

  @Column()
  CustCloseReason: string;

  @Column()
  IPNetwork: string;

  @Column()
  IPRouter: string;

  @Column()
  IPServer: string;

  @Column()
  IPWAN: string;

  @Column()
  PPN: string;

  @Column()
  Flag: string;

  @Column()
  Discount: string;

  @Column()
  DiscountStartDate: string;

  @Column()
  DiscountEndDate: string;

  @Column()
  Notes: string;

  @Column()
  LastCP: string;

  @Column()
  PPN1: string;

  @Column()
  Discount1: string;

  @Column()
  EPPN: string;

  @Column()
  EDiscount: string;

  @Column()
  EPPN1: string;

  @Column()
  EDiscount1: string;

  @Column()
  EmpIdEdit: string;

  @Column()
  Opsi: string;

  @Column()
  StartTrial: string;

  @Column()
  EndTrial: string;

  @Column()
  StatusPerangkat: string;

  @Column()
  KeteranganPerangkat: string;

  @Column()
  Gabung: string;

  @Column()
  Tampil: string;

  @Column()
  TglHarga: string;

  @Column()
  MacAddress: string;

  @Column()
  Subscription: string;

  @Column()
  CustBlockReason: string;

  @Column()
  IPPOP: string;

  @Column()
  InvoiceType: string;

  @Column()
  InvoicePeriod: string;

  @Column()
  InvoiceDate1: string;

  @Column()
  AddEmail: string;

  @Column()
  AddEmailCharge: string;

  @Column()
  AccessLog: string;

  @Column()
  Description: string;

  @Column()
  DomainExpireDate: string;

  @Column()
  RealDomainExpireDate: string;

  @Column()
  IPExpireDate: string;

  @Column()
  EmailUsage: string;

  @Column()
  EmailOverUsage: string;

  @Column()
  EmailInvoice: string;

  @Column()
  SmsOverUsage: string;

  @Column()
  AddVolume: string;

  @Column()
  HadCharged: string;

  @Column()
  DueDate: string;

  @Column()
  bw_id: string;

  @Column()
  installation_address: string;

  @Column()
  Surveyor: string;

  @Column()
  SARG: string;

  @Column()
  CustStatusExpDate: string;

  @Column()
  CustStatusReason: string;

  @Column()
  ContractUntil: string;

  @Column()
  Type: string;

  @Column()
  HomeId: string;

  @Column()
  CloseCategory: string;

  @Column()
  closeCategoryDetail: string;

  @Column()
  contactIdT2T: string;

  @Column()
  ReviewTime: string;

  @Column()
  ReviewBy: string;

  @Column()
  promo_id: string;

  @Column()
  BlockTypeId: string;

  @Column()
  BlockTypeDate: string;

  @Column()
  PrevStatus: string;

  @Column()
  CustBlockFromMenu: string;

  @Column()
  PoinKunjungan: string;

  @Column()
  HideAddress: string;

  @Column()
  CreateInvoice: string;

  @Column()
  komplek_id: string;
}

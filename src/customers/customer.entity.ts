import {
  BaseEntity,
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'Customer', synchronize: false })
export class Customer extends BaseEntity {
  @PrimaryColumn()
  CustId: string;

  @Column()
  CustName: string;

  @Column()
  CustPass: string;

  @Column()
  BranchId: string;

  @Column()
  DisplayBranchId: string;

  @Column()
  FormId: string;

  @Column()
  CustGender: string;

  @Column()
  custPOB: string;

  @Column({ type: 'date' })
  custDOB: string;

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
  CustResCity: string;

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
  CustOfficeCity: string;

  @Column()
  CustIdType: string;

  @Column()
  BusId: string;

  @Column()
  CustCompany: string;

  @Column()
  CustBillCPEmail: string;

  @Column()
  CustTechCP: string;

  @Column()
  CustTechCPPhone: string;

  @Column()
  CustTechCPEmail: string;

  @Column()
  SalesId: string;

  @Column()
  ManagerSalesId: string;

  @CreateDateColumn()
  InsertDateTime: Date;

  @Column()
  CustStatus: string;

  @Column()
  CustBillMethodLetter: boolean;

  @Column()
  CustBillMethodEmail: boolean;
}

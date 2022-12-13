import { BaseEntity, Entity, Column, PrimaryColumn } from 'typeorm';

// Task :
// 1. Pengerjaan Relation Untuk Customer dan Customer Service
// 2. Lengkapi Entity Customer Service
@Entity({ name: 'CustomerServices', synchronize: false })
export class CustomerServices extends BaseEntity {
  @PrimaryColumn()
  CustServId: string;

  @Column()
  CustId: string;
}

import { BaseEntity, Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'NPWP_Customer', synchronize: false })
export class NPWPCustomer extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  Id: string;

  @Column()
  Name: string;

  @Column()
  Address: string;

  @Column()
  NPWP: string;

  @Column()
  CustId: string;

  @Column()
  Selected: boolean;
}

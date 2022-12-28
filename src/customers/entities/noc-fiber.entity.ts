import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'noc_fiber', synchronize: false })
export class NOCFiber extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  branchId: string;

  @Column()
  vendorId: string;
}

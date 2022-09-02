import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'Employee', synchronize: false })
export class Employee {
  @PrimaryColumn()
  EmpId: string;

  @Column()
  EmpFName: string;

  @Column()
  EmpLName: string;

  @Column()
  EmpEmail: string;

  @Column()
  EmpJoinStatus: string;
}

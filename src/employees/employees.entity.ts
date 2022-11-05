import { BaseEntity, Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'Employee', synchronize: false })
export class Employees extends BaseEntity {
  @PrimaryColumn()
  EmpId: string;

  @Column()
  EmpFName: string;

  @Column()
  EmpLName: string;

  @Column()
  EmpEmail: string;

  // @Column()
  // EmpJoinStatus: string;

  static GetAllEmployee() {
    return this.createQueryBuilder('Employee')
      .where('Employee.DeptId IN (:...deptIds)', { deptIds: ['01', '17'] })
      .andWhere('Employee.BranchId = :branchId', { branchId: '020' })
      .andWhere('Employee.EmpId != :empId', { empId: 'HDMEDAN' })
      .getMany();
  }
}

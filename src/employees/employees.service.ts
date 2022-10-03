import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Employee } from './employee.entity';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    private readonly dataSource: DataSource,
  ) {}

  async findOne(id: string) {
    const employee = await this.employeeRepository.findOneBy({ EmpId: id });
    return this.transformEmployee(employee);
  }

  async GetAllEmployee() {
    const query = `SELECT EmpId, EmpFName, EmpLName, EmpEmail FROM Employee
    WHERE DeptId IN ('01', '17')
    AND BranchId = '020'
    AND EmpId != 'HDMEDAN'`;

    const queryResult = await this.dataSource.query(query);

    if (queryResult.length === 0) {
      return {};
    }

    return this.transformEmployee(queryResult);
  }

  transformEmployee(employee: Employee) {
    if (employee === null) {
      return {};
    }
    return employee;
  }
}

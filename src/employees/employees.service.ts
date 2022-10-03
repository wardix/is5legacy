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
    const resultJson = [];

    if (queryResult.length === 0) {
      return {};
    } else {
      for (const i in queryResult) {
        resultJson.push(this.transformEmployee(queryResult[i]));
      }
    }

    return resultJson;
  }

  private transformEmployee(obj) {
    return {
      id: obj.EmpId,
      name: (obj.EmpFName + ' ' + obj.EmpLName).trim(),
      email: obj.EmpEmail,
    };
  }

  //   transformEmployee(employee: Employee) {
  //     if (employee === null) {
  //       return {};
  //     }

  //     return employee;
  //   }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Employee } from './employees.entity';

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

  async mapEmp() {
    const employee = await Employee.GetAllEmployee();
    const empMap = [];
    empMap.push({ '0200306': 'wardi' });
    for (const i of employee) {
      empMap.push({ [i.EmpId]: `${i.EmpFName} ${i.EmpLName}` });
    }
    return empMap;
  }

  private transformEmployee(obj) {
    return {
      id: obj.EmpId,
      name: (obj.EmpFName + ' ' + obj.EmpLName).trim(),
      email: obj.EmpEmail,
    };
  }
}

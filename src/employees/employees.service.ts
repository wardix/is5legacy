import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Employee } from './employee.entity';

@Injectable()
export class EmployeesService {
  constructor(@InjectRepository(Employee) private readonly employeeRepository: Repository<Employee>) { }

  async findOne(id: string) {
    const employee = await this.employeeRepository.findOneBy({ EmpId: id });
    return this.transformEmployee(employee);
  }

  transformEmployee(employee: Employee) {
    return {
      id: employee.EmpId,
      name: (employee.EmpFName + ' ' + employee.EmpLName).trim(),
      email: employee.EmpEmail
    }
  }
}

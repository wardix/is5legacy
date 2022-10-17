import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Employees } from './employees.entity';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employees)
    private readonly employeeRepository: Repository<Employees>,
    private readonly dataSource: DataSource,
  ) {}

  async findOne(id: string) {
    const employee = await this.employeeRepository.findOneBy({ EmpId: id });
    return this.transformEmployee(employee);
  }

  async empMap() {
    const employee = await Employees.GetAllEmployee();
    let empMap: any = {};
    empMap['0200306'] = 'wardi';
    for (const i of employee) {
      empMap[i.EmpId] = `${i.EmpFName} ${i.EmpLName}`;
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

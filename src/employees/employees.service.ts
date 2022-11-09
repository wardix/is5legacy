import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';

import { Employees } from './employees.entity';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employees)
    private readonly employeeRepository: Repository<Employees>,
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async findOne(id: string) {
    const employee = await this.employeeRepository.findOneBy({ EmpId: id });
    return this.transformEmployee(employee);
  }

  async findAll() {
    const employees = await this.employeeRepository.find();
    return employees.map((e) => this.transformEmployee(e));
  }

  async authenticate(username: string, password: string) {
    const query = `
      SELECT EmpId, EmpFName, EmpLName, EmpEmail
      FROM Employee
      WHERE EmpId = '${username}' AND PASSWORD('${password}') = EmpPassword`;
    const queryResult = await this.dataSource.query(query);

    if (queryResult.length === 0) {
      return null;
    }

    return this.transformEmployee(queryResult[0]);
  }

  // employee mapping dari divisi helpdesk '01' -> 'Helpdesk Shift', '17' -> 'Helpdesk Reguler'
  // '020' -> Cabang Medan
  async empMap() {
    const employee = await Employees.GetAllEmployee();
    const empMap: any[] = [];

    // jika ada employee yang pindah keluar dari divisi helpdesk harus diset manual
    // empObj['empId'] = '0200306';
    // empObj['empName'] = 'wardi';

    for (const i of employee) {
      const empObj: any = {};
      empObj['empId'] = i.EmpId;
      empObj['empName'] = i.EmpFName + ' ' + i.EmpLName;
      empMap.push(empObj);
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

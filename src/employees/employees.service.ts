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

  // employee mapping dari divisi helpdesk '01' -> 'Helpdesk Shift', '17' -> 'Helpdesk Reguler'
  // '020' -> Cabang Medan
  async empMap() {
    const employee = await Employees.GetAllEmployee();
    const empMap: any[] = [];

    // jika ada employee yang pindah keluar dari divisi helpdesk harus diset manual
    empMap['0200306'] = 'wardi';
    for (const i of employee) {
      const empObj: any = {};
      empObj['employeeId'] = i.EmpId.toString();
      empObj['employeeName'] = `${i.EmpFName} ${i.EmpLName}`;
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

import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { Connection } from 'mysql2';
import { GetServiceFilterDto } from './dto/get-service-filter.dto';

@Injectable()
export class ServicesService {
  constructor(@InjectDataSource() private readonly connection: Connection) {}

  async getAllServicesService(filterServiceDto: GetServiceFilterDto) {
    const { branchId } = filterServiceDto;

    if (branchId) {
      return await this.connection.query(`
        SELECT s.ServiceId, s.ServiceType, s.ServiceLevel, ss.NormalDownCeil, ss.NormalDownRate, ss.NormalUpCeil, ss.NormalUpRate, s.MaxDownTime / 3600 'DownTime', s.ServiceCharge, IFNULL(sd.discontinue, 0) discontinue from Services s
        LEFT JOIN ServiceShaping ss ON s.ServiceId = ss.ServiceId 
        LEFT JOIN ServiceDiscontinue sd ON s.ServiceId = sd.ServiceId AND sd.BranchId = ${branchId} 
        LEFT JOIN ServiceGroup sg ON s.ServiceGroup = sg.ServiceGroup 
        LEFT JOIN ServiceGroupType sgt ON sg.ServiceGroupTypeId = sgt.id where sg.ServiceGroupTypeId = 1 and (s.ServiceGroup != 'WR') 
        HAVING discontinue = 0 order by ServiceType;
      `);
    } else {
      return await this.connection.query(`
        SELECT s.ServiceId, s.ServiceType, s.ServiceLevel, ss.NormalDownCeil, ss.NormalDownRate, ss.NormalUpCeil, ss.NormalUpRate, s.MaxDownTime / 3600 'DownTime', s.ServiceCharge, IFNULL(sd.discontinue, 0) discontinue from Services s
        LEFT JOIN ServiceShaping ss ON s.ServiceId = ss.ServiceId 
        LEFT JOIN ServiceDiscontinue sd ON s.ServiceId = sd.ServiceId
        LEFT JOIN ServiceGroup sg ON s.ServiceGroup = sg.ServiceGroup 
        LEFT JOIN ServiceGroupType sgt ON sg.ServiceGroupTypeId = sgt.id where sg.ServiceGroupTypeId = 1 and (s.ServiceGroup != 'WR') 
        HAVING discontinue = 0 order by ServiceType;
      `);
    }
  }
}

import { Injectable } from '@nestjs/common';
import { GetServiceFilterDto } from './dto/get-service-filter.dto';
import { Services } from './entities/service.entity';

@Injectable()
export class ServicesService {
  async getAllServicesService(
    filterServiceDto: GetServiceFilterDto,
  ): Promise<any> {
    const { branch_ids } = filterServiceDto;

    if (branch_ids) {
      return Services.createQueryBuilder('s')
        .select([
          's.ServiceId',
          's.ServiceType',
          's.ServiceLevel',
          'ss.NormalDownCeil',
          'ss.NormalDownRate',
          'ss.NormalUpCeil',
          'ss.NormalUpRate',
          '(s.MaxDownTime / 3600) DownTime',
          's.ServiceCharge',
          'IFNULL(sd.discontinue, 0) discontinue',
        ])
        .leftJoin('ServiceShaping', 'ss', 's.ServiceId = ss.ServiceId')
        .leftJoin('ServiceDiscontinue', 'sd', 's.ServiceId = sd.ServiceId')
        .leftJoin('ServiceGroup', 'sg', 's.ServiceGroup = sg.ServiceGroup')
        .leftJoin('ServiceGroupType', 'sgt', 'sg.ServiceGroupTypeId = sgt.id')
        .where('sg.ServiceGroupTypeId = 1')
        .andWhere("s.ServiceGroup != 'WR'")
        .andWhere('sd.BranchId IN (:...branchIds)', { branchIds: branch_ids })
        .andWhere('discontinue != 1')
        .orderBy('s.ServiceType')
        .getRawMany();
    } else {
      return Services.createQueryBuilder('s')
        .select([
          's.ServiceId',
          's.ServiceType',
          's.ServiceLevel',
          'ss.NormalDownCeil',
          'ss.NormalDownRate',
          'ss.NormalUpCeil',
          'ss.NormalUpRate',
          '(s.MaxDownTime / 3600) DownTime',
          's.ServiceCharge',
          'IFNULL(sd.discontinue, 0) discontinue',
        ])
        .leftJoin('ServiceShaping', 'ss', 's.ServiceId = ss.ServiceId')
        .leftJoin('ServiceDiscontinue', 'sd', 's.ServiceId = sd.ServiceId')
        .leftJoin('ServiceGroup', 'sg', 's.ServiceGroup = sg.ServiceGroup')
        .leftJoin('ServiceGroupType', 'sgt', 'sg.ServiceGroupTypeId = sgt.id')
        .where('sg.ServiceGroupTypeId = 1')
        .andWhere("s.ServiceGroup != 'WR'")
        .andWhere('sd.BranchId IS NOT NULL')
        .andWhere('discontinue != 1')
        .orderBy('s.ServiceType')
        .getRawMany();
    }
  }
}

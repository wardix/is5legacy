import { Injectable, BadRequestException } from '@nestjs/common';
import { GetServiceFilterDto } from './dto/get-service-filter.dto';
import { Services } from './entities/service.entity';

@Injectable()
export class ServicesService {
  async getAllServicesService(
    filterServiceDto: GetServiceFilterDto,
  ): Promise<any> {
    const { branch_ids } = filterServiceDto;

    if (branch_ids) {
      return await Services.createQueryBuilder('s')
        .select([
          's.ServiceId service_id',
          's.ServiceType service_type',
          's.ServiceLevel service_level',
          'ss.NormalDownCeil normal_down_ceil',
          'ss.NormalDownRate normal_down_rate',
          'ss.NormalUpCeil normal_up_ceil',
          'ss.NormalUpRate normal_up_rate',
          '(s.MaxDownTime / 3600) down_time',
          's.ServiceCharge service_charge',
          'IFNULL(sd.discontinue, 0) discontinue',
        ])
        .leftJoin(
          'ServiceDiscontinue',
          'sd',
          's.ServiceId = sd.ServiceId AND sd.BranchId IN (:...branchIds)',
          { branchIds: branch_ids },
        )
        .leftJoin('ServiceGroup', 'sg', 's.ServiceGroup = sg.ServiceGroup')
        .leftJoin('ServiceGroupType', 'sgt', 'sg.ServiceGroupTypeId = sgt.id')
        .leftJoin('ServiceShaping', 'ss', 's.ServiceId = ss.ServiceId')
        .where(
          "(sd.discontinue IS NULL or sd.discontinue = 0) AND sg.ServiceGroupTypeId = 1 AND s.ServiceGroup != 'WR'",
        )
        .orderBy('s.ServiceType')
        .getRawMany();
    } else {
      return await Services.createQueryBuilder('s')
        .select([
          's.ServiceId service_id',
          's.ServiceType service_type',
          's.ServiceLevel service_level',
          'ss.NormalDownCeil normal_down_ceil',
          'ss.NormalDownRate normal_down_rate',
          'ss.NormalUpCeil normal_up_ceil',
          'ss.NormalUpRate normal_up_rate',
          '(s.MaxDownTime / 3600) down_time',
          's.ServiceCharge service_charge',
          'IFNULL(sd.discontinue, 0) discontinue',
        ])
        .leftJoin('ServiceDiscontinue', 'sd', 's.ServiceId = sd.ServiceId')
        .leftJoin('ServiceGroup', 'sg', 's.ServiceGroup = sg.ServiceGroup')
        .leftJoin('ServiceGroupType', 'sgt', 'sg.ServiceGroupTypeId = sgt.id')
        .leftJoin('ServiceShaping', 'ss', 's.ServiceId = ss.ServiceId')
        .where(
          "(sd.discontinue IS NULL or sd.discontinue = 0) AND sg.ServiceGroupTypeId = 1 AND s.ServiceGroup != 'WR'",
        )
        .orderBy('s.ServiceType')
        .getRawMany();
    }
  }

  async getServicesByIDService(service_id: string) {
    return await Services.createQueryBuilder('s')
      .select([
        's.ServiceId service_id',
        's.ServiceType service_type',
        's.ServiceLevel service_level',
        'ss.NormalDownCeil normal_down_ceil',
        'ss.NormalDownRate normal_down_rate',
        'ss.NormalUpCeil normal_up_ceil',
        'ss.NormalUpRate normal_up_rate',
        '(s.MaxDownTime / 3600) down_time',
        's.ServiceCharge service_charge',
        'IFNULL(sd.discontinue, 0) discontinue',
      ])
      .leftJoin('ServiceDiscontinue', 'sd', 's.ServiceId = sd.ServiceId')
      .leftJoin('ServiceGroup', 'sg', 's.ServiceGroup = sg.ServiceGroup')
      .leftJoin('ServiceGroupType', 'sgt', 'sg.ServiceGroupTypeId = sgt.id')
      .leftJoin('ServiceShaping', 'ss', 's.ServiceId = ss.ServiceId')
      .where(
        "(sd.discontinue IS NULL or sd.discontinue = 0) AND sg.ServiceGroupTypeId = 1 AND s.ServiceGroup != 'WR'",
      )
      .andWhere('s.ServiceId = :service_id', { service_id: service_id })
      .getRawOne();
  }
}

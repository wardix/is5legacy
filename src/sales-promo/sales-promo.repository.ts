import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { GetPromoFilterDto } from './dto/get-promo-filter.dto';
import { SalesPromo } from './sales-promo.entity';

@Injectable()
export class SalesPromoRepository extends Repository<SalesPromo> {
  constructor(private dataSource: DataSource) {
    super(SalesPromo, dataSource.createEntityManager());
  }

  async getAllPromoRepository(
    filterPromoDto: GetPromoFilterDto,
  ): Promise<SalesPromo[]> {
    const { branch_ids, to, active } = filterPromoDto;
    const queryBuilder = this.createQueryBuilder('SalesPromo');

    if (branch_ids) {
      queryBuilder.andWhere('SalesPromo.branchId IN (:...branchIds)', {
        branchIds: branch_ids,
      });
    }

    if (to) {
      queryBuilder.andWhere('(SalesPromo.to >= :to)', { to });
    }

    if (active) {
      queryBuilder.andWhere('(SalesPromo.active = :active)', { active });
    }

    const promos = await queryBuilder.getMany();

    return promos;
  }
}

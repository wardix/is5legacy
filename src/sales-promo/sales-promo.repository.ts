import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { GetPromoFilterDto } from './dto/get-promo-filter.dto';
import { SalesPromo } from './sales-promo.entity';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class SalesPromoRepository extends Repository<SalesPromo> {
  constructor(private dataSource: DataSource) {
    super(SalesPromo, dataSource.createEntityManager());
  }

  async getAllPromoRepository(
    options: IPaginationOptions,
    filterPromoDto: GetPromoFilterDto,
  ): Promise<Pagination<SalesPromo>> {
    const { branchId, to, active } = filterPromoDto;
    const queryBuilder = this.createQueryBuilder('SalesPromo');

    if (branchId) {
      queryBuilder.andWhere('SalesPromo.branchId = :branchId', { branchId });
    }

    if (to) {
      queryBuilder.andWhere('(SalesPromo.to LIKE :to)', { to: `%${to}%` });
    }

    if (active) {
      queryBuilder.andWhere('(SalesPromo.active = :active)', { active });
    }

    queryBuilder.getMany();

    return paginate<SalesPromo>(queryBuilder, options);
  }
}

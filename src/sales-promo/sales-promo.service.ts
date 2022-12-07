import { Injectable, NotFoundException } from '@nestjs/common';
import { GetPromoFilterDto } from './dto/get-promo-filter.dto';
import { SalesPromoRepository } from './sales-promo.repository';
import { SalesPromo } from './sales-promo.entity';
import { Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';

@Injectable()
export class SalesPromoService {
  constructor(private salesPromoRepository: SalesPromoRepository) {}

  async getAllPromoService(
    filterPromoDto: GetPromoFilterDto,
    options: IPaginationOptions,
  ): Promise<Pagination<SalesPromo>> {
    return this.salesPromoRepository.getAllPromoRepository(
      options,
      filterPromoDto,
    );
  }

  async getDataPromoByIDService(id: number): Promise<SalesPromo> {
    const found = await this.salesPromoRepository.findOne({
      where: { id },
    });

    if (!found) {
      throw new NotFoundException(`Promo dengan ID ${id} tidak ditemukan`);
    }

    return found;
  }
}

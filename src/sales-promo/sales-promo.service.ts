import { Injectable } from '@nestjs/common';
import { GetPromoFilterDto } from './dto/get-promo-filter.dto';
import { SalesPromoRepository } from './sales-promo.repository';
import { SalesPromo } from './sales-promo.entity';

@Injectable()
export class SalesPromoService {
  constructor(private salesPromoRepository: SalesPromoRepository) {}

  async getAllPromoService(
    filterPromoDto: GetPromoFilterDto,
  ): Promise<SalesPromo[]> {
    return await this.salesPromoRepository.getAllPromoRepository(
      filterPromoDto,
    );
  }

  async getPromoByIDService(promo_id: string) {
    return await this.salesPromoRepository.getPromoByIDRepository(promo_id);
  }
}

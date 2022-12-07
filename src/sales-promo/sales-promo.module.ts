import { Module } from '@nestjs/common';
import { SalesPromoController } from './sales-promo.controller';
import { SalesPromoService } from './sales-promo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalesPromo } from './sales-promo.entity';
import { SalesPromoRepository } from './sales-promo.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SalesPromo])],
  controllers: [SalesPromoController],
  exports: [SalesPromoService],
  providers: [SalesPromoService, SalesPromoRepository],
})
export class SalesPromoModule {}

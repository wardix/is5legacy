import {
  Controller,
  DefaultValuePipe,
  Get,
  HttpCode,
  ParseIntPipe,
  Query,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { GetPromoFilterDto } from './dto/get-promo-filter.dto';
import { SalesPromoService } from './sales-promo.service';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('api-key'))
@Controller('promo')
export class SalesPromoController {
  constructor(private salesPromoService: SalesPromoService) {}

  @Get()
  @HttpCode(200)
  async getAllDataPromo(
    @Query(ValidationPipe) filterPromoDto: GetPromoFilterDto,
  ) {
    try {
      const resultAllPromo = await this.salesPromoService.getAllPromoService(
        filterPromoDto,
      );

      return resultAllPromo;
    } catch (error) {
      return {
        message: error.message,
      };
    }
  }
}

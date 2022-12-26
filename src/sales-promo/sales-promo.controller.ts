import {
  Controller,
  Get,
  HttpCode,
  InternalServerErrorException,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { GetPromoFilterDto } from './dto/get-promo-filter.dto';
import { SalesPromoService } from './sales-promo.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('api-key'))
@Controller('promos')
export class SalesPromoController {
  constructor(private salesPromoService: SalesPromoService) {}

  @Get()
  @HttpCode(200)
  async getAllDataPromo(
    @Query(new ValidationPipe({ transform: true }))
    filterPromoDto: GetPromoFilterDto,
  ) {
    try {
      const resultAllPromo = await this.salesPromoService.getAllPromoService(
        filterPromoDto,
      );
      return {
        data: resultAllPromo,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        title: 'Internal Server Error',
        message: 'Failed to load resource. please try again later',
      });
    }
  }
}

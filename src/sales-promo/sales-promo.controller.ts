import {
  Controller,
  DefaultValuePipe,
  Get,
  HttpStatus,
  ParseIntPipe,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { GetPromoFilterDto } from './dto/get-promo-filter.dto';
import { SalesPromoService } from './sales-promo.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('api-key'))
@Controller('promo')
export class SalesPromoController {
  constructor(private salesPromoService: SalesPromoService) {}

  @Get()
  async getAllDataPromo(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query(ValidationPipe) filterPromoDto: GetPromoFilterDto,
  ) {
    try {
      limit = limit > 100 ? 100 : limit;
      const resultAllPromo = await this.salesPromoService.getAllPromoService(
        filterPromoDto,
        {
          page,
          limit,
          route: 'http://127.0.0.1:3000/api/v1/promo/testpage',
        },
      );

      return {
        statusCode: HttpStatus.OK,
        message: resultAllPromo,
        error: '',
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.BAD_GATEWAY,
        message: {},
        error: error,
      };
    }
  }
}

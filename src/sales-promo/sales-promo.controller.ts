import {
  Controller,
  DefaultValuePipe,
  Get,
  HttpStatus,
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
  async getAllDataPromo(
    @Req() req: Request,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query(ValidationPipe) filterPromoDto: GetPromoFilterDto,
  ) {
    try {
      const url_api = `${req.protocol}://${req.get('Host')}${req.originalUrl}`;

      limit = limit > 100 ? 100 : limit;
      const resultAllPromo = await this.salesPromoService.getAllPromoService(
        filterPromoDto,
        {
          page,
          limit,
          route: url_api,
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
        error: error.message,
      };
    }
  }
}

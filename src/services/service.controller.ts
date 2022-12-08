import {
  Controller,
  Get,
  HttpCode,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetServiceFilterDto } from './dto/get-service-filter.dto';
import { LayananService } from './service.service';

@UseGuards(AuthGuard('api-key'))
@Controller('service')
export class LayananController {
  constructor(private layananService: LayananService) {}

  @Get()
  @HttpCode(200)
  async getAllDataLayanan(
    @Query(ValidationPipe) filterServiceDto: GetServiceFilterDto,
  ) {
    try {
      const resultAllServices = await this.layananService.getAllLayananService(
        filterServiceDto,
      );
      return resultAllServices;
    } catch (error) {
      return {
        message: error.message,
      };
    }
  }
}

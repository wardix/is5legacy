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
import { ServicesService } from './services.service';

@UseGuards(AuthGuard('api-key'))
@Controller('service')
export class ServicesController {
  constructor(private servicesService: ServicesService) {}

  @Get()
  @HttpCode(200)
  async getAllServices(
    @Query(ValidationPipe) filterServiceDto: GetServiceFilterDto,
  ) {
    try {
      const resultAllServices =
        await this.servicesService.getAllServicesService(filterServiceDto);
      return resultAllServices;
    } catch (error) {
      return {
        message: error.message,
      };
    }
  }
}

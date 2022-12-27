import {
  Controller,
  Get,
  HttpCode,
  InternalServerErrorException,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetServiceFilterDto } from './dto/get-service-filter.dto';
import { ServicesService } from './services.service';

@UseGuards(AuthGuard('api-key'))
@Controller('services')
export class ServicesController {
  constructor(private servicesService: ServicesService) {}

  @Get()
  @HttpCode(200)
  async getAllServices(
    @Query(new ValidationPipe({ transform: true }))
    filterServiceDto: GetServiceFilterDto,
  ) {
    try {
      const resultAllServices =
        await this.servicesService.getAllServicesService(filterServiceDto);
      return {
        data: resultAllServices,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        title: 'Internal Server Error',
        message: 'Failed to load resource. please try again later',
      });
    }
  }
}

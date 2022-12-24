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
import { UseInterceptors } from '@nestjs/common';
import { ErrorsInterceptor } from 'src/interceptors/errors.interceptor';

@UseGuards(AuthGuard('api-key'))
@Controller('service')
@UseInterceptors(ErrorsInterceptor)
export class ServicesController {
  constructor(private servicesService: ServicesService) {}

  @Get()
  @HttpCode(200)
  async getAllServices(
    @Query(new ValidationPipe({ transform: true }))
    filterServiceDto: GetServiceFilterDto,
  ) {
    const resultAllServices = await this.servicesService.getAllServicesService(
      filterServiceDto,
    );
    return resultAllServices;
  }
}

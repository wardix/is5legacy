import { Controller, Get, UseInterceptors, UseGuards, Query, UsePipes, ValidationPipe, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetCustomerCIDDto } from './dto/get-customer-cid.dto';

import { SubscriptionInterceptor } from './subscription.interceptor';
import { SubscriptionService } from './subscription.service';

@UseGuards(AuthGuard('api-key'))
@Controller('subscriptions')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Get('get-customer-cid')
  @UseInterceptors(SubscriptionInterceptor)
  async getCustomerCID(@Query(ValidationPipe) getCustomerCIDDto: GetCustomerCIDDto): Promise<any> {
    return await this.subscriptionService.getCustomerCID(getCustomerCIDDto)
  }

}

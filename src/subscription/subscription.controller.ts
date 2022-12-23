import {
  Controller,
  Get,
  UseInterceptors,
  UseGuards,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetFoLinkDto } from './dto/get-fo-link.dto';
import { SubscriptionInterceptor } from './subscription.interceptor';
import { SubscriptionService } from './subscription.service';

@UseGuards(AuthGuard('api-key'))
@Controller('subscriptions')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Get('fo-links')
  @UseInterceptors(SubscriptionInterceptor)
  async getFoLinks(
    @Query(new ValidationPipe({ transform: true }))
    getFoLinkDto: GetFoLinkDto,
  ): Promise<any> {
    return this.subscriptionService.getFoLinks(getFoLinkDto);
  }
}

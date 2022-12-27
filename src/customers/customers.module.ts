import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { CustomerRepository } from './repositories/customers.repository';
import { NOCFiberRepository } from './repositories/noc-fiber.repository';
import { OperatorSubscriptionRepository } from './repositories/operator-subscription.repository';

@Module({
  controllers: [CustomersController],
  exports: [CustomersService],
  providers: [
    CustomersService,
    CustomerRepository,
    OperatorSubscriptionRepository,
    NOCFiberRepository,
  ],
})
export class CustomersModule {}

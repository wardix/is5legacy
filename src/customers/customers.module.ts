import { Module } from '@nestjs/common';

import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { Customer } from './customers.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerServices } from './customer-services.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Customer, CustomerServices])],
  providers: [CustomersService],
  controllers: [CustomersController],
})
export class CustomersModule {}

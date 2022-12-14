import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerRepository } from './customers.repository';
import { Customer } from './entities/customer.entity';
import { SMSPhonebook } from './entities/sms-phonebook.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Customer, SMSPhonebook])],
  controllers: [CustomersController],
  exports: [CustomersService],
  providers: [CustomersService, CustomerRepository],
})
export class CustomersModule {}

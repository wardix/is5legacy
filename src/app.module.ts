import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { IndexModule } from './index/index.module';
import { CustomersModule } from './customers/customers.module';
import { EmployeesModule } from './employees/employees.module';
import { Employee } from './employees/employee.entity';
import { Tts, TtsPIC, TtsChange, Ttschange } from './tickets/tickets.entity';
import { TtsModule } from './tickets/tickets.module';
import { SalesPromoModule } from './sales-promo/sales-promo.module';
import { SalesPromo } from './sales-promo/sales-promo.entity';
import { ServicesModule } from './services/services.module';
import { Customer } from './customers/entities/customer.entity';
import { SMSPhonebook } from './customers/entities/sms-phonebook.entity';
import { Subscription } from './customers/entities/subscriber.entity';
import { NPWPCustomer } from './customers/entities/customer-npwp.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as 'mysql' | 'mariadb' | 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DBNAME,
      entities: [
        Employee,
        Tts,
        Customer,
        Subscription,
        SMSPhonebook,
        NPWPCustomer,
        TtsPIC,
        TtsChange,
        Ttschange,
        SalesPromo,
      ],
      synchronize: true,
    }),
    AuthModule,
    IndexModule,
    CustomersModule,
    EmployeesModule,
    TtsModule,
    SalesPromoModule,
    ServicesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

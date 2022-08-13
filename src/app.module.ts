import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { HelloModule } from './hello/hello.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    HelloModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { TtsService } from './tickets.service';
import { TtsController } from './tickets.controller';
import { Tts } from './tickets.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeesModule } from 'src/employees/employees.module';

@Module({
  imports: [TypeOrmModule.forFeature([Tts]), EmployeesModule],
  providers: [TtsService],
  controllers: [TtsController],
})
export class TtsModule {}

import { Module } from '@nestjs/common';
import { TtsService } from './tts.service';
import { TtsController } from './tts.controller';
import { Tts } from './tts.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeesModule } from 'src/employees/employees.module';

@Module({
  imports: [TypeOrmModule.forFeature([Tts]), EmployeesModule],
  providers: [TtsService],
  controllers: [TtsController],
})
export class TtsModule {}

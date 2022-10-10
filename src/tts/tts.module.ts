import { Module } from '@nestjs/common';
import { TtsService } from './tts.service';
import { TtsController } from './tts.controller';
import { Tts } from './tts.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Tts])],
  providers: [TtsService],
  controllers: [TtsController],
})
export class TtsModule {}

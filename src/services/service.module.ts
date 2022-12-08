import { Module } from '@nestjs/common';
import { LayananController } from './service.controller';
import { LayananService } from './service.service';

@Module({
  controllers: [LayananController],
  providers: [LayananService],
})
export class LayananModule {}

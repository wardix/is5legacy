import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tts } from './tts.entity';

@Injectable()
export class TtsService {
  constructor(
    @InjectRepository(Tts)
    private readonly ttsRepository: Repository<Tts>,
  ) {}

  async getTts(periodStart: string, periodEnd: string) {
    return await Tts.getAllTts(periodStart, periodEnd);
  }

  private transformTtsQuery(obj) {
    return {
      TtsId: obj.TtsId,
      EmpId: obj.EmpId,
    };
  }
}

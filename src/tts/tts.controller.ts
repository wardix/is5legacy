import { Query, Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TtsService } from './tts.service';

@UseGuards(AuthGuard('api-key'))
@Controller('tts')
export class TtsController {
  constructor(private readonly ttsService: TtsService) {}

  @Get('/')
  getTts(
    @Query('id') id: string,
    @Query('priodStart') priodStart: string,
    @Query('priodEnd') priodEnd: string,
  ) {
    return this.ttsService.getTts(id, priodStart, priodEnd);
  }
}

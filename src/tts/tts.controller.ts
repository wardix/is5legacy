import { Query, Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TtsService } from './tts.service';

@UseGuards(AuthGuard('api-key'))
@Controller('tts')
export class TtsController {
  constructor(private readonly ttsService: TtsService) {}

  @Get('/')
  getTts(
    @Query('periodStart') periodStart: string,
    @Query('periodEnd') periodEnd: string,
  ) {
    return this.ttsService.getTtsIncident(periodStart, periodEnd);
  }

  @Get('/Assign')
  getTtsAssign(
    @Query('periodStart') periodStart: string,
    @Query('periodEnd') periodEnd: string,
  ) {
    return this.ttsService.getTtsAssign(periodStart, periodEnd);
  }

  @Get('/Reopen')
  getTtsReopen(
    @Query('periodStart') periodStart: string,
    @Query('periodEnd') periodEnd: string,
  ) {
    return this.ttsService.getTtsReopen(periodStart, periodEnd);
  }

  @Get('/Solve')
  getTtsSolve(
    @Query('periodStart') periodStart: string,
    @Query('periodEnd') periodEnd: string,
  ) {
    return this.ttsService.getTtsSolve(periodStart, periodEnd);
  }
}

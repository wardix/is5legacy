import { Query, Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TtsService } from './tickets.service';

@UseGuards(AuthGuard('api-key'))
@Controller('tts')
export class TtsController {
  constructor(private readonly ttsService: TtsService) {}

  @Get('/')
  getResultReport(
    @Query('periodStart') periodStart: string,
    @Query('periodEnd') periodEnd: string,
  ) {
    return this.ttsService.resultReport(periodStart, periodEnd);
  }

  @Get('/incident')
  getTts(
    @Query('periodStart') periodStart: string,
    @Query('periodEnd') periodEnd: string,
  ) {
    return this.ttsService.getTtsIncident(periodStart, periodEnd);
  }

  @Get('/assign')
  getTtsAssign(
    @Query('periodStart') periodStart: string,
    @Query('periodEnd') periodEnd: string,
  ) {
    return this.ttsService.getTtsAssign(periodStart, periodEnd);
  }

  @Get('/reopen')
  getTtsReopen(
    @Query('periodStart') periodStart: string,
    @Query('periodEnd') periodEnd: string,
  ) {
    return this.ttsService.getTtsReopen(periodStart, periodEnd);
  }

  @Get('/solve')
  getTtsSolve(
    @Query('periodStart') periodStart: string,
    @Query('periodEnd') periodEnd: string,
  ) {
    return this.ttsService.getTtsSolve(periodStart, periodEnd);
  }
}

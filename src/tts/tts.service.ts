import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tts, TtsPIC, TtsChange } from './tts.entity';
import { EmployeesService } from '../employees/employees.service';

@Injectable()
export class TtsService {
  constructor(
    @InjectRepository(Tts)
    private readonly ttsRepository: Repository<Tts>,
    private readonly employeeServices: EmployeesService,
  ) {}

  async getTtsReopen(periodStart: string, periodEnd: string) {
    return await TtsChange.getAllTtsReopen(periodStart, periodEnd);
  }

  async getTtsAssign(periodStart: string, periodEnd: string) {
    const tts = await TtsPIC.getAllTtsAssign(periodStart, periodEnd);
    const open = {};
    const assigned = [];
    const empMap = await this.employeeServices.empMap();
    for (const i of tts) {
      if (!typeof empMap[i.EmpId] !== undefined) {
        continue;
      }
      if (!typeof open['detail'][i.EmpId]) {
        open['detail'][i.EmpId] = [];
        open['count'][i.EmpId] = 0;
      }
      if ((i.TtsId, open['detail'][i.EmpId] !== undefined)) {
        continue;
      }
      if (!typeof assigned['count'][i.EmpId]) {
        assigned['count'][i.EmpId]++;
        assigned['detail'][i.EmpId] = [i.TtsId];
      }
    }
    return tts;
  }

  async getTts(periodStart: string, periodEnd: string) {
    const tts = await Tts.getAllTtsIncident(periodStart, periodEnd);
    const ttsPeriod = {};
    const open = {};
    // const takeOver = [['detail'], ['count']];
    const empMap = await this.employeeServices.empMap();
    for (const i of tts) {
      ttsPeriod[i.TtsId];
      if (!typeof empMap[i.EmpId] !== undefined) {
        continue;
      }
      if (typeof open['count'][i.EmpId] !== undefined) {
        open['count'][i.EmpId]++;
        open['detail'][i.EmpId] = i.TtsId;
      } else {
        open['count'][i.EmpId] = 1;
        open['detail'][i.EmpId] = [i.TtsId];
      }
    }
    return tts;
  }

  private transformTtsQuery(obj) {
    return {
      TtsId: obj.TtsId,
      EmpId: obj.EmpId,
    };
  }
}

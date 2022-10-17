import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tts, TtsPIC, TtsChange, Ttschange } from './tts.entity';
import { EmployeesService } from '../employees/employees.service';

@Injectable()
export class TtsService {
  constructor(
    @InjectRepository(Tts)
    private readonly ttsRepository: Repository<Tts>,
    private readonly employeeServices: EmployeesService,
  ) {}

  async getTtsSolve(periodStart: string, periodEnd: string) {
    const tts = await Ttschange.getAllTtsSolve(periodStart, periodEnd);
    var open: any = {};
    var empMap: any = {};
    var reOpen: any = {};
    var solved: any = {};
    var assigned: any = {};
    var takeOver: any = {};
    var ttsPeriod: any = {};
    open =
      solved =
      assigned =
      takeOver =
        {
          detail: [],
          count: [],
        };
    // // open['count'].forEach(empId: count) => {
    // //   report[empId] = {
    // //     open: count,
    // //     assigned: 0,
    // //     takeover: 0,
    // //     solved: 0,
    // //   };
    // };
    for (const i of tts) {
      var empId = i.EmpId;
      var ttsId = i.TtsId;
      var updatedTime = i.UpdatedTime;

      //   // abaikan jika yang mensolvekan bukan helpdesk
      if (!typeof empMap[empId] !== undefined) {
        continue;
      }

      //   // abaikan jika tiket ternyata direopen kemudian
      if (typeof reOpen[ttsId] && reOpen[ttsId] > updatedTime) {
        continue;
      }

      //   // perhitungkan sebagai solved untuk masing-masing employee
      if (typeof solved['count'][empId] !== undefined) {
        solved['count'][empId]++;
        solved['detail'][empId][''] = ttsId;
      } else {
        solved['count'][empId] = 1;
        solved['detail'][empId] = [ttsId];
      }
      console.log(solved['detail'][i.EmpId]);

      function inArray(needle, haystack) {
        var length = haystack.length;
        for (var i = 0; i < length; i++) {
          if (haystack[i] == needle) return true;
        }
        return false;
      }

      //   // perihtungan take over
      //   // abaikan perhitungan take over jika ticket dicreate di periode sebelumnya
      if (inArray([ttsId], ttsPeriod)) {
        continue;
      }

      // bukan take over jika sudah diassign ke employee yang bersangkutan
      if (
        typeof assigned['detail'][empId] &&
        inArray([ttsId], open['detail'][empId]) !== undefined
      ) {
        continue;
      }

      // bukan take over jika yang create adalah employee yang bersangkutan
      if (
        typeof open['detail'][empId] &&
        inArray([ttsId], open['detail'][empId]) !== undefined
      ) {
        continue;
      }

      // perhitungkan take over
      if (typeof takeOver['count'][empId] !== undefined) {
        takeOver['count'][empId]++;
        takeOver['detail'][empId][''] = ttsId;
      } else {
        takeOver['count'][empId] = 1;
        takeOver['detail'][empId] = [ttsId];
      }
    }
    return tts;
  }

  async getTtsReopen(periodStart: string, periodEnd: string) {
    const tts = await TtsChange.getAllTtsReopen(periodStart, periodEnd);
    var reOpen: any = {};
    for (const i of tts) {
      var ttsId = i.TtsId;
      var updatedTime = i.UpdatedTime;
      reOpen[ttsId] = updatedTime;
    }
    return reOpen; // // open['count'].forEach(empId: count) => {
    // //   report[empId] = {
    // //     open: count,
    // //     assigned: 0,
    // //     takeover: 0,
    // //     solved: 0,
    // //   };
    // };
  }

  async getTtsAssign(periodStart: string, periodEnd: string) {
    const tts = await TtsPIC.getAllTtsAssign(periodStart, periodEnd);
    var open: string[];
    var assigned = {};

    const empMap = await this.employeeServices.empMap();
    for (const i of tts) {
      var empId = i.EmpId;
      var ttsId = i.TtsId;
      // abaikan jika yang diassign selain helpdesk
      if (!typeof empMap[empId] !== undefined) {
        continue;
      }
      // helpdesk belum pernah open, tapi sudah diassign
      // opennya diset ke 0
      if (!typeof open['detail'][empId]) {
        open['detail'][empId] = [];
        open['count'][empId] = 0;
      }

      // fungsi pengecekan
      function inArray(needle, haystack) {
        var length = haystack.length;
        for (var i = 0; i < length; i++) {
          if (haystack[i] == needle) return true;
        }
        return false;
      }

      // abaikan perhitungan assigned jika yang open orang yang sama
      if (inArray([ttsId], open['detail'][empId])) {
        continue;
      }

      // tambahkan perihtungan assign untuk employee yang sesuai
      if (!typeof assigned['count'][empId]) {
        assigned['count'][empId]++;
        assigned['detail'][empId][''] = [ttsId];
      } else {
        assigned['count'][empId] = 1;
        assigned['detail'][empId] = [ttsId];
      }
    }
    return tts;
  }

  async getTtsIncident(periodStart: string, periodEnd: string) {
    const tts = await Tts.getAllTtsIncident(periodStart, periodEnd);
    var ttsPeriod = {};
    var open = {};
    const empMap = await this.employeeServices.empMap();
    for (const i of tts) {
      var ttsId = i.TtsId;
      ttsPeriod[ttsId];
      var empId = i.EmpId;

      //    diopen oleh employee yang tidak ada di map [bukan helpdesk], abaikan
      if (!typeof empMap[empId] !== undefined) {
        continue;
      }
      if (typeof open['count'][empId] !== undefined) {
        open['count'][empId]++;
        open['detail'][empId][''] = ttsId;
      } else {
        open['count'][empId] = 1;
        open['detail'][empId] = [ttsId];
      }
    }
    return tts;
  }

  async Result() {
    let report: string[] = [];
    let count: any = [];
    // // open['count'].forEach(empId: count) => {
    // //   report[empId] = {
    // //     open: count,
    // //     assigned: 0,
    // //     takeover: 0,
    // //     solved: 0,
    // //   };
    // };
  }

  private transformTtsQuery(obj) {
    return {
      TtsId: obj.TtsId,
      EmpId: obj.EmpId,
    };
  }
}

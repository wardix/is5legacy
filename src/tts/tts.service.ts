import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tts, TtsPIC, TtsChange, Ttschange } from './tts.entity';
import { EmployeesService } from '../employees/employees.service';

@Injectable()
export class TtsService {
  protected solved = {
    count: [],
    detail: [],
  };
  protected assigned = {
    count: [],
    detail: [],
  };
  protected takeOver = {
    count: [],
    detail: [],
  };
  protected open = {
    count: [],
    detail: [],
  };
  protected ttsPeriod = {};
  protected empMap;
  protected report = {};

  constructor(
    @InjectRepository(Tts)
    private readonly ttsRepository: Repository<Tts>,
    private readonly employeeServices: EmployeesService,
  ) {
    this.setEmpMap();
  }

  async setEmpMap() {
    this.empMap = await this.employeeServices.empMap();
  }

  // ambil setiap ticket yang solve pada waktu sesuai dengan periode yang ditentukan
  async getTtsSolve(periodStart: string, periodEnd: string) {
    const tts = await Ttschange.getAllTtsSolve(periodStart, periodEnd);
    // console.log(this.empMap['0200306']);
    for (const i of tts) {
      const empId = i.EmpId;
      const ttsId = i.TtsId;
      const updatedTime = i.UpdatedTime;
      const reOpen: any = {};

      // abaikan jika yang mensolvekan bukan helpdesk
      if (typeof this.empMap[empId] === 'undefined') {
        continue;
      }

      // abaikan jika tiket ternyata direopen kemudian
      if (
        typeof (reOpen[ttsId] && reOpen[ttsId] > updatedTime) !== 'undefined'
      ) {
        continue;
      }

      // perhitungkan sebagai solved untuk masing-masing employee
      if (typeof this.solved['count'][empId] !== 'undefined') {
        this.solved['count'][empId]++;
        this.solved['detail'][empId].push(ttsId);
      } else {
        this.solved['count'][empId] = 1;
        this.solved['detail'][empId] = [ttsId];
      }

      // fungsi pengecekan array
      function inArray(needle, haystack) {
        const length = haystack.length;
        for (let i = 0; i < length; i++) {
          if (haystack[i] == needle) return true;
        }
        return false;
      }

      // perihtungan take over
      // abaikan perhitungan take over jika ticket dicreate di periode sebelumnya
      if (!inArray([ttsId], this.ttsPeriod)) {
        continue;
      }

      // bukan take over jika sudah diassign ke employee yang bersangkutan
      if (
        typeof this.assigned['detail'][empId] &&
        inArray(ttsId, this.assigned['detail'][empId] !== 'undefined')
      ) {
        continue;
      }

      // bukan take over jika yang create adalah employee yang bersangkutan
      if (
        typeof (
          this.open['detail'][empId] &&
          inArray([ttsId], this.open['detail'][empId])
        ) !== 'undefined'
      ) {
        continue;
      }

      // perhitungkan take over
      if (typeof this.takeOver['count'][empId] !== 'undefined') {
        this.takeOver['count'][empId]++;
        this.takeOver['detail'][empId] = [ttsId];
      } else {
        this.takeOver['count'][empId] = 1;
        this.takeOver['detail'][empId].push(ttsId);
      }
    }
    return tts;
  }

  // ambil setiap ticket yang reopen pada waktu sesuai dengan periode yang ditentukan
  async getTtsReopen(periodStart: string, periodEnd: string) {
    const tts = await TtsChange.getAllTtsReopen(periodStart, periodEnd);
    const reOpen: any = {};
    for (const i of tts) {
      const ttsId = i.TtsId;
      const updatedTime = i.UpdatedTime;
      reOpen[ttsId] = updatedTime;
    }
    return reOpen;
  }

  // ambil semua ticket yang diassign pada waktu sesuai dengan periode yang ditentukan
  async getTtsAssign(periodStart: string, periodEnd: string) {
    const tts = await TtsPIC.getAllTtsAssign(periodStart, periodEnd);
    // perhitungkan sebagai solved untuk masing-masing employee
    for (const i of tts) {
      const ttsId = i.TtsId;
      const empId = i.EmpId;

      // abaikan jika yang diassign selain helpdesk
      if (typeof this.empMap[empId] === 'undefined') {
        continue;
      }

      // helpdesk belum pernah open, tapi sudah diassign
      // opennya diset ke 0
      if (typeof this.open['detail'][empId] === 'undefined') {
        this.open['detail'][empId] = [];
        this.open['count'][empId] = 0;
      }

      // fungsi pengecekan array
      function inArray(needle, haystack) {
        const length = haystack.length;
        for (let i = 0; i < length; i++) {
          if (haystack[i] == needle) return true;
        }
        return false;
      }
      // abaikan perhitungan assigned jika yang open orang yang sama
      if (inArray(ttsId, this.open['detail'][empId])) {
        continue;
      }

      // tambahkan perihtungan assign untuk employee yang sesuai
      if (typeof this.assigned['count'][empId] === 'undefined') {
        this.assigned['count'][empId] = 1;
        this.assigned['detail'][empId] = [ttsId];
      } else {
        this.assigned['count'][empId]++;
        this.assigned['detail'][empId].push(ttsId);
      }

      for (const [empId, count] of Object.entries(this.open['count'])) {
        this.report[empId] = {
          open: count,
          assigned: 0,
          takeOver: 0,
          solved: 0,
        };
      }

      for (const [empId, count] of Object.entries(this.assigned['count'])) {
        if (typeof this.report[empId] !== 'undefined') {
          this.report[empId]['assigned'] = count;
          continue;
        }
        this.report[empId] = {
          open: 0,
          assigned: count,
          takeover: 0,
          solved: 0,
        };
      }

      for (const [empId, count] of Object.entries(this.takeOver['count'])) {
        if (typeof this.report[empId] !== 'undefined') {
          this.report[empId]['takeOver'] = count;
          continue;
        }
        this.report[empId] = {
          open: 0,
          assigned: 0,
          takeover: count,
          solved: 0,
        };
      }

      for (const [empId, count] of Object.entries(this.solved['count'])) {
        if (typeof this.report[empId] !== 'undefined') {
          this.report[empId]['solved'] = count;
          continue;
        }
        this.report[empId] = {
          open: 0,
          assigned: 0,
          takeover: 0,
          solved: count,
        };
      }

      for (const [empId, performance] of Object.entries(this.report)) {
        var employee = this.empMap[empId];
        var devided =
          performance['open'] +
          performance['assigned'] +
          performance['takeOver'];
        var final: any;
        if (devided == 0) {
          final = '';
        } else {
          final = (performance['assigned'] / devided) * 100;
        }
        console.log(performance);
        console.log(
          employee,
          performance['open'],
          performance['assigned'],
          performance['takeOver'],
          performance['solved'],
          final,
        );
      }
    }

    return tts;
  }

  // ambil semua ticket insiden (TtsTypeId = 2)
  // disemua branch yang ditangani helpdesk medan [medan dan bali] ('020', '025', '026', '062')
  // yang diopen pada waktu sesuai dengan periode yang ditentukan
  async getTtsIncident(periodStart: string, periodEnd: string) {
    const tts = await Tts.getAllTtsIncident(periodStart, periodEnd);
    for (const i of tts) {
      const ttsId = i.TtsId;
      const empId = i.EmpId;
      this.ttsPeriod = [ttsId];

      // diopen oleh employee yang tidak ada di map [bukan helpdesk], abaikan
      if (typeof this.empMap[empId] !== 'undefined') {
        continue;
      }

      if (typeof this.open['count'][empId] === 'undefined') {
        this.open['count'][empId] = 1;
        this.open['detail'][empId] = [ttsId];
      } else {
        this.open['count'][empId]++;
        this.open['detail'][empId].push(ttsId);
      }
    }

    return tts;
  }
}

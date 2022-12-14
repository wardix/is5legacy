import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tts, TtsPIC, TtsChange, Ttschange } from './tickets.entity';
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
  protected data = {};
  protected ttsPeriod = [];
  protected empMap;
  protected report = {};
  protected reOpen = {};
  constructor(
    @InjectRepository(Tts)
    private readonly ttsRepository: Repository<Tts>,
    private readonly employeeServices: EmployeesService,
  ) {
    this.setEmpMap();
  }

  async setEmpMap() {
    this.empMap = await this.employeeServices.empMap();
    // this.empMap = {};
  }

  // ambil setiap ticket yang reopen pada waktu sesuai dengan periode yang ditentukan
  async getTtsReopen(periodStart: string, periodEnd: string) {
    const tts = await TtsChange.getAllTtsReopen(periodStart, periodEnd);
    const temp = [];
    const reOpen: any = {};
    for (const i of tts) {
      const ttsId = i.TtsId;
      const updatedTime = i.UpdatedTime;
      reOpen[ttsId] = updatedTime;
    }
    return tts;
  }

  // ambil semua ticket insiden (TtsTypeId = 2)
  // disemua branch yang ditangani helpdesk medan [medan dan bali] ('020', '025', '026', '062')
  // yang diopen pada waktu sesuai dengan periode yang ditentukan
  async getTtsIncident(periodStart: string, periodEnd: string) {
    const tts = await Tts.getAllTtsIncident(periodStart, periodEnd);

    const expArray = [];
    for (const i of tts) {
      const ttsId = i.TtsId;
      const empId = i.EmpId;
      this.ttsPeriod = [ttsId];

      expArray.push(ttsId);
      // diopen oleh employee yang tidak ada di map [bukan helpdesk], abaikan
      if (!typeof (this.getEmployee(empId) !== 'undefined')) {
        continue;
      }

      if (typeof this.open['count'][empId] !== 'undefined') {
        this.open['count'][empId]++;
        this.open['detail'][empId];
        this.open['ttsId'] = ttsId;
      } else {
        this.open['count'][empId] = 1;
        this.open['detail'][empId] = expArray;
      }
    }
    return tts;
  }

  // ambil setiap ticket yang solve pada waktu sesuai dengan periode yang ditentukan
  async getTtsSolve(periodStart: string, periodEnd: string) {
    const tts = await Ttschange.getAllTtsSolve(periodStart, periodEnd);
    // console.log(this.empMap['0200306']);
    let expArray = [];

    for (let i = 0; i < tts.length; i++) {
      const ttsId = tts[i]['TtsId'];
      const empId = tts[i]['EmpId'];
      const updatedTime = tts[i]['UpdatedTime'];

      expArray.push(ttsId);
      // abaikan jika yang mensolvekan bukan helpdesk
      if (!typeof (this.getEmployee(empId) !== 'undefined')) {
        continue;
      }

      // abaikan jika tiket ternyata direopen kemudian
      if (
        typeof (this.reOpen[ttsId] && this.reOpen[ttsId] > updatedTime) !==
        'undefined'
      ) {
        continue;
      }

      // perhitungkan sebagai solved untuk masing-masing employee
      if (typeof this.solved['count'][empId] !== 'undefined') {
        this.solved['count'][empId]++;
        this.solved['detail'][empId];
        this.solved['ttsId'] = ttsId;
      } else {
        this.solved['count'][empId] = 1;
        this.solved['detail'][empId] = expArray;
      }

      // perihtungan take over
      // abaikan perhitungan take over jika ticket dicreate di periode sebelumnya
      if (!this.inArray(ttsId, this.ttsPeriod)) {
        continue;
      }

      // bukan take over jika sudah diassign ke employee yang bersangkutan
      if (
        typeof this.assigned['detail'][empId] &&
        this.inArray(ttsId, this.assigned['detail'][empId] !== 'undefined')
      ) {
        continue;
      }

      // bukan take over jika yang create adalah employee yang bersangkutan
      if (
        typeof (
          this.open['detail'][empId] &&
          this.inArray(ttsId, this.open['detail'][empId])
        ) !== 'undefined'
      ) {
        continue;
      }

      // console.log('6');
      // perhitungkan take over
      if (typeof this.takeOver['count'][empId] !== 'undefined') {
        this.takeOver['count'][empId]++;
        this.takeOver['detail'][empId];
        this.takeOver['ttsId'] = ttsId;
      } else {
        this.takeOver['count'][empId] = 1;
        this.takeOver['detail'][empId] = expArray;
      }
    }

    return tts;
  }

  // ambil semua ticket yang diassign pada waktu sesuai dengan periode yang ditentukan
  async getTtsAssign(periodStart: string, periodEnd: string) {
    const tts = await TtsPIC.getAllTtsAssign(periodStart, periodEnd);
    // perhitungkan sebagai solved untuk masing-masing employee

    const expArray = [];
    for (let i = 0; i < tts.length; i++) {
      const ttsId = tts[i]['TtsId'];
      const empId = tts[i]['EmpId'];

      expArray.push(ttsId);

      // abaikan jika yang diassign selain helpdesk
      if (!typeof (this.getEmployee(empId) !== 'undefined')) {
        continue;
      }

      // helpdesk belum pernah open, tapi sudah diassign
      // opennya diset ke 0
      if (!typeof (this.open['detail'][empId] !== 'undefined')) {
        this.open['detail'][empId] = [];
        this.open['count'][empId] = 0;
      }

      // abaikan perhitungan assigned jika yang open orang yang sama
      if (this.inArray(ttsId, this.open['detail'][empId])) {
        continue;
      }

      // tambahkan perihtungan assign untuk employee yang sesuai
      if (typeof this.assigned['count'][empId] !== 'undefined') {
        this.assigned['count'][empId]++;
        this.assigned['detail'][empId];
        this.assigned['ttsId'] = ttsId;
      } else {
        this.assigned['count'][empId] = 1;
        this.assigned['detail'][empId] = expArray;
      }
    }
    return tts;
  }

  // fungsi menghitung total
  getAllReport() {
    const dataReturn = [];
    for (const [empId, count] of Object.entries(this.open['count'])) {
      this.report[empId] = {
        open: count,
        assigned: 0,
        takeover: 0,
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
        this.report[empId]['takeover'] = count;
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
      var employee = this.getEmployee(empId);

      var devided =
        performance['open'] + performance['assigned'] + performance['takeover'];
      var final: any;
      if (devided === 0) {
        final = '';
      } else {
        final = ((performance['solved'] / devided) * 100).toFixed(2);
      }
      if (typeof employee !== 'undefined')
        dataReturn.push({
          name: employee['empName'],
          open: performance['open'],
          assigned: performance['assigned'],
          takeover: performance['takeover'],
          solved: performance['solved'],
          final: final,
        });
    }
    this.data = dataReturn;
  }

  // fungsi empMap
  getEmployee(empId) {
    return this.empMap.find((em) => empId === em.empId);
  }

  // fungsi pengecekan array
  inArray(needle, ...haystack) {
    const length = haystack.length;
    for (let i = 0; i < length; i++) {
      if (haystack[i] == needle) return true;
    }
    return false;
  }

  // mengambil semua hasil dari semua fungsi
  async resultReport(periodStart: string, periodEnd: string) {
    await this.getTtsAssign(periodStart, periodEnd);
    await this.getTtsReopen(periodStart, periodEnd);
    await this.getTtsIncident(periodStart, periodEnd);
    await this.getTtsSolve(periodStart, periodEnd);
    this.getAllReport();
    return this.data;
  }
}

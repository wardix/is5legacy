import { BaseEntity, Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'Tts', synchronize: false })
export class Tts extends BaseEntity {
  @PrimaryColumn()
  TtsId: string;

  @Column()
  EmpId: string;

  // ambil semua ticket insiden (TtsTypeId = 2)
  // disemua branch yang ditangani helpdesk medan [medan dan bali] ('020', '025', '026', '062')
  // yang diopen pada waktu sesuai dengan periode yang ditentukan
  static getAllTtsIncident(periodStart, periodEnd) {
    return this.createQueryBuilder('Tts')
      .leftJoin('Customer', 'b', 'b.CustId = Tts.CustId')
      .where('Tts.TtsTypeId = :typeId', { typeId: '2' })
      .andWhere(
        'IFNULL(b.DisplayBranchId, b.BranchId) IN ("020","025","026", "062")',
      )
      .andWhere(`Tts.PostedTime BETWEEN '${periodStart}' AND '${periodEnd}'`)
      .orderBy('Tts.TtsId')
      .getMany();
  }
}

@Entity({ name: 'TtsPIC', synchronize: false })
export class TtsPIC extends BaseEntity {
  @PrimaryColumn()
  TtsId: string;

  @Column()
  EmpId: string;

  // ambil semua ticket yang diassign pada waktu sesuai dengan periode yang ditentukan
  static getAllTtsAssign(periodStart, periodEnd) {
    return this.createQueryBuilder('TtsPIC')
      .leftJoin('TtsUpdate', 'b', 'b.TtsUpdateId = TtsPIC.TtsUpdateId')
      .leftJoin('Tts', 'c', 'c.TtsId = TtsPIC.TtsId')
      .where('c.TtsTypeId = :typeId', { typeId: '2' })
      .andWhere(`b.UpdatedTime BETWEEN '${periodStart}' AND '${periodEnd}'`)
      .getMany();
  }
}

@Entity({ name: 'TtsChange', synchronize: false })
export class TtsChange extends BaseEntity {
  @PrimaryColumn({ name: 'TtsUpdate' })
  TtsId: string;

  @Column({ name: 'TtsUpdate' })
  UpdatedTime: string;

  // ambil setiap ticket yang reopen pada waktu sesuai dengan periode yang ditentukan
  static getAllTtsReopen(periodStart, periodEnd) {
    return this.createQueryBuilder('TtsChange')
      .select(['tu.TtsId', 'tu.UpdatedTime'])
      .leftJoin('TtsUpdate', 'tu', 'TtsChange.TtsUpdateId = tu.TtsUpdateId')
      .leftJoin('Tts', 't', 'tu.TtsId = t.TtsId')
      .where('t.TtsTypeId = 2')
      .andWhere('TtsChange.field = "Status"')
      .andWhere('TtsChange.OldValue != "Open"')
      .andWhere('TtsChange.NewValue = "Open"')
      .andWhere(`tu.UpdatedTime BETWEEN '${periodStart}' AND '${periodEnd}'`)
      .orderBy('tu.UpdatedTime')
      .getRawMany();
  }
}

@Entity({ name: 'TtsChange', synchronize: false })
export class Ttschange extends BaseEntity {
  @PrimaryColumn({ name: 'TtsUpdate' })
  TtsId: string;

  @Column({ name: 'TtsUpdate' })
  UpdatedTime: string;

  @Column({ name: 'TtsUpdate' })
  EmpId: string;

  // ambil setiap ticket yang solve pada waktu sesuai dengan periode yang ditentukan
  static getAllTtsSolve(periodStart, periodEnd) {
    return this.createQueryBuilder('TtsChange')
      .select(['b.TtsId', 'b.EmpId', 'b.UpdatedTime'])
      .leftJoin('TtsUpdate', 'b', 'TtsChange.TtsUpdateId = b.TtsUpdateId')
      .leftJoin('Tts', 'c', 'b.TtsId = c.TtsId')
      .where('c.TtsTypeId = 2')
      .andWhere('TtsChange.field = "Status"')
      .andWhere('TtsChange.OldValue != "Call"')
      .andWhere('TtsChange.NewValue = "Call"')
      .andWhere(`b.UpdatedTime BETWEEN '${periodStart}' AND '${periodEnd}'`)
      .getRawMany();
    // .getSql()
  }
}

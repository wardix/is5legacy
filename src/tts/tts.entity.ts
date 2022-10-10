import { BaseEntity, Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'Tts', synchronize: false })
export class Tts extends BaseEntity {
  @PrimaryColumn()
  TtsId: string;

  @Column()
  EmpId: string;

  static getAllTts(periodStart, periodEnd) {
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

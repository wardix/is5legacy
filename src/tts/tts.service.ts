import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class TtsService {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async getTts(id: string, priodStart: string, priodEnd: string) {
    const query = `SELECT a.TtsId, a.EmpId FROM Tts a
                   LEFT JOIN Customer b ON a.CustId = b.CustId
                   WHERE a.TtsTypeId = ${id}
                   AND IFNULL(b.DisplayBranchId, b.BranchId) IN ('020', '025', '026', '062')
                   AND a.PostedTime BETWEEN "${priodStart} 00:00:00" AND "${priodEnd} 23:59:59"
                   ORDER BY a.TtsId`;

    const queryResult = await this.dataSource.query(query);
    const resultJson = [];

    if (queryResult.length === 0) {
      return {};
    } else {
      for (const i in queryResult) {
        resultJson.push(this.transformTtsQuery(queryResult[i]));
      }
    }

    return resultJson;
  }
  private transformTtsQuery(obj) {
    return {
      TtsId: obj.TtsId,
      EmpId: obj.EmpId,
    };
  }
}

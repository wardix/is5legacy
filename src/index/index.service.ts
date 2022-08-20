import { Injectable } from '@nestjs/common';

@Injectable()
export class IndexService {
  getIndex(): string {
    return 'OK';
  }
}

import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { NOCFiber } from './entities/noc-fiber.entity';
import { Tagihan } from './entities/tagihan.entity';

@Injectable()
export class TagihanService {
  get() {
    return `This action returns all tagihan`;
  }

  async getNocFiberId(branchIds: string[], vendorIds: number[]) {
    return await NOCFiber.getNocFiberId(branchIds, vendorIds)
  }

  async getVendorCIDByFiberId(NocFiberIds) {
    return await Tagihan.getVendorCIDByFiberId(NocFiberIds);
  }
}

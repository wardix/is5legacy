import { Repository } from 'typeorm';
import { NOCFiber } from '../entities/noc-fiber.entity';

export class NOCFiberRepository extends Repository<NOCFiber> {
  static getNocFiberId(branchIds: string[], vendorIds: number[]) {
    return NOCFiber.createQueryBuilder('f')
      .select(['f.id'])
      .where('f.branchId IN (:...branchIds)', { branchIds: branchIds })
      .andWhere('f.vendorId IN (:...vendorIds)', { vendorIds: vendorIds })
      .getMany();
  }
}

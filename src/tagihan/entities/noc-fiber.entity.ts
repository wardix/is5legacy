import { BaseEntity, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: 'noc_fiber', synchronize: false })
export class NOCFiber extends BaseEntity {
    @PrimaryColumn()
    id: number;

    static getNocFiberId(branchIds: string[], vendorIds : number[]) {
      return this.createQueryBuilder('f')
        .where('f.branchId IN (:...branchIds)', { branchIds: branchIds })
        .andWhere('f.vendorId IN (:...vendorIds)', { vendorIds: vendorIds })
        .getMany();
    }
}

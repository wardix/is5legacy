import { BaseEntity, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: 'CustomerServiceTechnicalCustom', synchronize: false })
export class Tagihan extends BaseEntity {
    @PrimaryColumn()
    id: number;

    static async getVendorCIDByFiberId(NocFiberId: number[]) {
      return this.createQueryBuilder('a')
        .select([
            "c.custServId",
            "c.CustAccName",
            "a.value CID",
            "c.CustStatus",
        ])
        .leftJoin('CustomerServiceTechnicalLink', 'b', 'b.id = a.technicalTypeId')
        .leftJoin('CustomerServices', 'c', 'c.custServId = b.custServId')
        .where('a.attribute = :attribute', { attribute: 'Vendor CID' })
        .andWhere('c.CustStatus IN (:...custStatus)', { custStatus: ['AC', 'BL', 'FR', 'NA'] })
        .andWhere('b.foVendorId IN (:...foVendorId)', { foVendorId: NocFiberId })
        .getRawMany();
    }
}

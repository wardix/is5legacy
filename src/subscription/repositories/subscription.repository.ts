import { Repository } from "typeorm"
import { CustomerServiceTechnicalCustom } from "../entities/customer-service-technical-custom.entity"

export class SubscriptionRepository  extends Repository<CustomerServiceTechnicalCustom> {  
  static getCustomerCID(NocFiberId: number[], status: string[]) {
    return CustomerServiceTechnicalCustom.createQueryBuilder('a')
        .select([
            "c.custServId id",
            "c.CustAccName acc",
            "a.value CID",
            "c.CustStatus status",
        ])
        .leftJoin('CustomerServiceTechnicalLink', 'b', 'b.id = a.technicalTypeId')
        .leftJoin('CustomerServices', 'c', 'c.custServId = b.custServId')
        .where('a.attribute = :attribute', { attribute: 'Vendor CID' })
        .andWhere('c.CustStatus IN (:...custStatus)', { custStatus: status })
        .andWhere('b.foVendorId IN (:...foVendorId)', { foVendorId: NocFiberId })
        .getRawMany();
  }
}
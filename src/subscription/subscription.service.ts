import { Injectable } from '@nestjs/common';
import { GetCustomerCIDDto } from './dto/get-customer-cid.dto';
import { NOCFiberRepository } from './repositories/noc-fiber.repository';
import { SubscriptionRepository } from './repositories/subscription.repository';

@Injectable()
export class SubscriptionService {

  async getCustomerCID(getCustomerCIDDto: GetCustomerCIDDto): Promise<any> {
    let {branchIds, status, vendorIds} = getCustomerCIDDto
    let NocFiberIds = await NOCFiberRepository.getNocFiberId(branchIds, vendorIds)
    let ArrayNocFiberIds = NocFiberIds.map((item)=> item.id)
    
    return SubscriptionRepository.getCustomerCID(ArrayNocFiberIds, status)
  }
}

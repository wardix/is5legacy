import { Injectable } from '@nestjs/common';
import { GetFoLinkDto } from './dto/get-fo-link.dto';
import { NOCFiberRepository } from './repositories/noc-fiber.repository';
import { SubscriptionRepository } from './repositories/subscription.repository';

@Injectable()
export class SubscriptionService {
  async getFoLinks(getFoLinkDto: GetFoLinkDto): Promise<any> {
    const { branchIds, status, vendorIds } = getFoLinkDto;
    const NocFiberIds = await NOCFiberRepository.getNocFiberId(
      branchIds,
      vendorIds,
    );
    const ArrayNocFiberIds = NocFiberIds.map((item) => item.id);
    return SubscriptionRepository.getFoLinks(ArrayNocFiberIds, status);
  }
}

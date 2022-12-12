import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { TagihanVendorInterceptor } from './tagihan-vendor.interceptor';
import { TagihanService } from './tagihan.service';

@Controller('tagihan')
export class TagihanController {
  constructor(private readonly tagihanService: TagihanService) {}

  @Get('vendor')
  @UseInterceptors(TagihanVendorInterceptor)
  async getTagihanByVendorID() {
    let branchIds = ['020'] // medan
    let vendorIds = [1] // fiberstar id
    let NocFiberIds = await this.tagihanService.getNocFiberId(branchIds, vendorIds)
    let ArrayNocFiberIds = NocFiberIds.map((item)=> item.id)
    return this.tagihanService.getVendorCIDByFiberId(ArrayNocFiberIds)
  }

  @Get('noc-fiber')
  async getNocFiberIds() {
    return await this.tagihanService.getNocFiberId(['020'], [1])
  }
}

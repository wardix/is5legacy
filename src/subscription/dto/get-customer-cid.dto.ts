import { IsArray, IsNotEmpty } from "class-validator";

export class GetCustomerCIDDto {
    @IsNotEmpty()
    @IsArray()
    branchIds: string[]

    @IsNotEmpty()
    @IsArray()
    status: string[]

    @IsNotEmpty()
    @IsArray()
    vendorIds: number[]
}

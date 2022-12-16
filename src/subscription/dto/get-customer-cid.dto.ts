import { Exclude, Expose, Transform, Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class GetCustomerCIDDto {
    @IsNotEmpty()
    @Type(() => String)
    @IsArray()
    @IsString({each : true})
    @Transform(({value})=> {return value.split(',')})
    branchIds: string[]

    @IsNotEmpty()
    @Type(() => String)
    @IsArray()
    @IsString({each : true})
    @Transform(({value})=> {return value.split(',')})
    status: string[]

    @IsNotEmpty()
    @Type(() => String)
    @IsArray()
    @Transform(({value})=> {return value.split(',').map((i)=> parseInt(i.trim()))})
    vendorIds: number[]
}

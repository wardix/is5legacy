import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";

@Injectable()
export class TagihanVendorInterceptor<T> implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next
            .handle()
            .pipe((map(function (data) {
                return data.reduce((obj, i) => {
                    // const { ['CID']: id, ...data } = v;
                    let newData = {}
                    newData = {
                        "id": i.custServId,
                        "acc": i.CustAccName,
                        "status": i.CustStatus
                    }
                    obj[i.CID] = newData;
                    return obj;
                  }, {});
            })))
    }
}
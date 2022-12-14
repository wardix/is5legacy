import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";

@Injectable()
export class SubscriptionInterceptor<T> implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next
            .handle()
            .pipe((map(function (data) {
                return data.reduce((obj, i) => {
                    obj[i.CID] = {
                        "id": i.id,
                        "acc": i.acc,
                        "status": i.status
                    };
                    return obj;
                  }, {});
            })))
    }
}
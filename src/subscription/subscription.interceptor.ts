import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Any } from 'typeorm';

@Injectable()
export class SubscriptionInterceptor<T> implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => ({
        data: data.reduce((obj, i) => {
          if (obj[i.CID] == undefined) {
            obj[i.CID] = [i];
          } else {
            obj[i.CID] = obj[i.CID].push(i);
          }
          return obj;
        }, {}),
      })),
    );
  }
}

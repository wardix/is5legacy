import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorCustomExceptionHandler } from 'src/exceptions/bad-request.exception';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        // List Condition of Error
        if (err instanceof Error) {
          return throwError(() => new ErrorCustomExceptionHandler());
        }
        return throwError(() => err);
      }),
    );
  }
}

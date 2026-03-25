import { Injectable, NestInterceptor, ExecutionContext, CallHandler, InternalServerErrorException } from '@nestjs/common';
import { catchError } from 'rxjs/operators';
import { QueryFailedError } from 'typeorm';

@Injectable()
export class DbErrorInterceptor implements NestInterceptor {
    intercept(_: ExecutionContext, next: CallHandler) {
        return next.handle().pipe(
            catchError(err => {
                if (err instanceof QueryFailedError && err.message.includes('Connection terminated')) {
                    throw new InternalServerErrorException('Database temporarily unavailable – retrying...');
                }
                throw err;
            }),
        );
    }
}
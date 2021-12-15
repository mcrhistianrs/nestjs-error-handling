import {
    BadRequestException,
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
    UnauthorizedException,
  } from '@nestjs/common';
  import { catchError, Observable } from 'rxjs';
  import { isPrismaError } from '../utils/is-prisma-error.util';
  import { handleDatabaseErrors } from '../utils/handle-database-errors.util';
  import { DatabaseError } from '../errors/DatabaseError';
import { UniqueConstraintError } from 'src/errors/UniqueConstraintError';
  
  @Injectable()
  export class DatabaseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      return next.handle().pipe(
        catchError((error) => {

          if (isPrismaError(error)) {
            error = handleDatabaseErrors(error);
          }
  
          console.log(error)
          if (error instanceof UniqueConstraintError) {
            throw new BadRequestException(error.message);
          } else {
            console.log(error)
            throw error;
          }
        }),
      );
    }
  }
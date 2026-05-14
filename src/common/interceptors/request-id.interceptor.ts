import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { Request } from 'express';

@Injectable()
export class RequestIdInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();

    // Check if x-request-id header exists
    const existingRequestId = request.headers['x-request-id'];

    // If not exists, create a new UUID
    if (!existingRequestId) {
      request.headers['x-request-id'] = uuidv4();
    }

    return next.handle();
  }
}

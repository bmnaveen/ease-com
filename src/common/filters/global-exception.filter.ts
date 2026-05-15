import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { AppError } from '../errors/app-error';
import { ErrorCode } from '../errors/error-codes';
import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const requestId = request.headers['x-request-id'] || null;

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let code: string = ErrorCode.INTERNAL_ERROR;
    let message = 'Internal server error';
    let details: unknown = undefined;

    if (exception instanceof AppError) {
      status = exception.httpStatus;
      code = exception.code;
      message = exception.message;
      details = exception.details;
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();
      if (typeof res === 'string') {
        message = res;
      } else if (typeof res === 'object' && res != null && res['message']) {
        const r = res as Record<string, any>;
        message = r.message || exception.message;
        details = r.message && Array.isArray(r.message) ? r.message : r.details;
        if (status === HttpStatus.BAD_REQUEST)
          code = ErrorCode.VALIDATION_ERROR;
      }
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    this.logger.error(
      {
        requestId,
        path: request.url,
        method: request.method,
        code,
        status,
        err:
          exception instanceof Error
            ? { name: exception.name, stack: exception.stack }
            : exception,
      },
      message,
    );

    response.status(status).json({
      success: false,
      error: {
        code,
        message,
        request_id: requestId,
        details,
      },
    });
  }
}

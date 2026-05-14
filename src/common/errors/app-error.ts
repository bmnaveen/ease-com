import { HttpStatus } from "@nestjs/common";
import { ErrorCode } from "./error-codes";

export class AppError extends Error {
    constructor(
        public readonly code: ErrorCode,
        public readonly httpStatus: HttpStatus,
        public readonly message: string,
        public readonly details?: any
    ){
        super(message);
        this.name = this.constructor.name;
    }
}

export class UnknownCourierError extends AppError {
    constructor(courier: string, supported: string[]){
        super(
            ErrorCode.UNKNOW_ERROR,
            HttpStatus.BAD_REQUEST,
            `Unknow courier partner: ${courier}`,
            { supported }
        );
    }
}

export class OrderNotFoundError extends AppError {
    constructor(id: string){
        super(
            ErrorCode.ORDER_NOT_FOUND,
            HttpStatus.NOT_FOUND,
            `Order not found: ${id}`
        );
    }
}

export class BatchNotFoundError extends AppError {
    constructor(id: string){
        super(
            ErrorCode.BATCH_NOT_FOUND,
            HttpStatus.NOT_FOUND,
            `Batch not found: ${id}`
        );
    }
}

export class DuplicateOrderError extends AppError {
    constructor(externalOrderId: string){
        super(
            ErrorCode.DUPLICATE_ORDER,
            HttpStatus.CONFLICT,
            `Order with externalOrderId ${externalOrderId} already exists`
        );
    }
}

export class CourierClientError extends AppError {
    constructor( message: string, details?: any){
        super(
            ErrorCode.COURIER_CLIENT_ERROR,
            HttpStatus.UNPROCESSABLE_ENTITY,
            message,
            details
        );
    }
}

export class CourierUnavailableError extends AppError {
    constructor(message: string, details?: unknown){
        super(
            ErrorCode.COURIER_UNAVAILABLE,
            HttpStatus.BAD_GATEWAY,
            message,
            details
        );
    }
}

export class CourierAuthFailedError extends AppError {
    constructor(message: string = 'Courier authentication failed'){
        super(
            ErrorCode.COURIER_AUTH_FAILED,
            HttpStatus.UNAUTHORIZED,
            `Authentication failed: ${message}`
        );
    }
}
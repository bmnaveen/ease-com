import { Logger } from "@nestjs/common";
import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import axios from "axios";
import { CourierAuthFailedError, CourierClientError, CourierUnavailableError } from "src/common/errors/app-error";
import { CourierCtx, ICourierAdapter } from "../courier.interface";
import axiosRetry from "axios-retry";
import config from "src/config/config";


export abstract class BaseCourierAdapter implements ICourierAdapter {
    abstract readonly key: string;
    protected readonly logger: Logger;
    protected readonly axiosRetryConfig: any;

    constructor(){
        this.logger = new Logger(this.constructor.name);
        axiosRetry(axios, {
            retries: config.retryConfig.retries,
            retryDelay: (retryCount: number) => retryCount * config.retryConfig.retryDelay
        })
    }

    abstract createOrder(input: any, ctx: CourierCtx): Promise<any>;

    abstract getOrder(courierOrderId: string, ctx: CourierCtx): Promise<any>;

    abstract cancelOrder(courierOrderId: string, ctx: CourierCtx): Promise<any>;

    protected abstract getAuthToken(forceRefresh?: boolean): Promise<string>;

    protected async makeRequest<T>(config: AxiosRequestConfig, ctx: CourierCtx): Promise<AxiosResponse<T>> {
        // Implement retry logic with exponential backoff
       try {
        return await axios.request(config);
       } catch (error) {
        throw error;
       }      
}
}
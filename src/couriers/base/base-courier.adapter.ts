import { Logger } from '@nestjs/common';
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'axios';
import {
  CourierAuthFailedError,
  CourierClientError,
  CourierUnavailableError,
} from 'src/common/errors/app-error';
import { CourierCtx, ICourierAdapter } from '../courier.interface';
import axiosRetry from 'axios-retry';
import config from 'src/config/config';

export abstract class BaseCourierAdapter implements ICourierAdapter {
  abstract readonly key: string;
  protected readonly logger: Logger;
  private readonly httpClient: AxiosInstance;
  constructor() {
    this.logger = new Logger(this.constructor.name);
    this.httpClient = axios.create();
    axiosRetry(this.httpClient, {
      retries: config.retryConfig.retries,
      retryDelay: (retryCount: number) =>
        retryCount * config.retryConfig.retryDelay,
      retryCondition: (error) => {
        const status = error.response?.status;
        return typeof status === 'number' && status >= 500;
      },
    });
  }

  abstract createOrder(input: any, ctx: CourierCtx): Promise<any>;

  abstract getOrder(courierOrderId: string, ctx: CourierCtx): Promise<any>;

  abstract cancelOrder(courierOrderId: string, ctx: CourierCtx): Promise<any>;

  protected abstract getAuthToken(forceRefresh?: boolean): Promise<string>;

  protected async makeRequest<T>(
    config: AxiosRequestConfig,
    ctx: CourierCtx,
  ): Promise<AxiosResponse<T>> {
    // Implement retry logic with exponential backoff
    try {
      return await this.httpClient.request(config);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const statusCode = error.response?.status;

        if (statusCode === 401) {
          throw new CourierAuthFailedError(this.key);
        } else if (statusCode && statusCode >= 500) {
          throw new CourierUnavailableError(this.key);
        } else if (statusCode && statusCode >= 400) {
          throw new CourierClientError(
            `Courier ${this.key} returned status code ${statusCode}`,
            {
              statusCode,
              response: error.response?.data,
            },
          );
        }
      }
      throw error;
    }
  }
}

import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { CourierAuthFailedError } from 'src/common/errors/app-error';
import { Logger } from '@nestjs/common';
import config from 'src/config/config';
import axiosRetry from 'axios-retry';

interface TokenCache {
  token: string;
  expiresAt: number;
}

@Injectable()
export class UrbanBoltAuthService {
  private readonly logger = new Logger(UrbanBoltAuthService.name);
  private cache: TokenCache | null = null;
  private inflight: Promise<string> | null = null;
  private readonly httpClient: AxiosInstance;

  constructor() {
    this.httpClient = axios.create();

    axiosRetry(this.httpClient, {
      retries: config.retryConfig.authRetries,
      retryCondition: (error) => true,
      onRetry: (retryCount, error, requestConfig) => {
      this.logger.warn(`Retry attempt #${retryCount} for URL: ${requestConfig.url}`);
  }
    });
  }

  async getToken(forceRefresh: boolean = false): Promise<string> {
    const now = Date.now();
    if (!forceRefresh && this.cache && this.cache?.expiresAt > now) {
      return this.cache.token;
    }
    if (this.inflight) return this.inflight;

    this.inflight = this.fetchToken().finally(() => (this.inflight = null));
    return this.inflight;
  }

  private async fetchToken(): Promise<string> {
    const baseConfig = config.urbanebolt;
    const baseUrl = baseConfig.apiUrl;
    const clientId = baseConfig.clientId;
    const clientSecret = baseConfig.clientSecret;

    try {
      let res = await this.httpClient.post(
        `${baseUrl}/api/v1/auth/getToken/`,
        {
          username: clientId,
          password: clientSecret,
        },
        {
          withCredentials: true,
        },
      );

      const data = res.data as { access_token: string; expires_in: number };

      this.cache = {
        token: data.access_token,
        expiresAt: Date.now() + data.expires_in,
      };

      return this.cache.token;
    } catch (error) {
      throw new CourierAuthFailedError('Authentication failed');
    }
  }
}

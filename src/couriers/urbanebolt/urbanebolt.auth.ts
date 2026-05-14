import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios from "axios";
import { CourierAuthFailedError } from "src/common/errors/app-error";
import { Logger } from "@nestjs/common";
import config from "src/config/config";


interface TokenCache {
    token: string;
    expiresAt: number;
}

@Injectable()
export class UrbanBoltAuthService {
    private readonly logger = new Logger(UrbanBoltAuthService.name);
    private cache: TokenCache | null = null;
    private inflight: Promise<string> | null = null;


     constructor() {

     }

     async getToken(forceRefresh: boolean = false): Promise<string> {
       const now = Date.now();
       if(!forceRefresh && this.cache && this.cache?.expiresAt > now){
         return this.cache.token
       }
       if(this.inflight) return this.inflight;

       this.inflight = this.fetchToken().finally(() => (this.inflight = null));
       return this.inflight;
     }

     private async fetchToken(): Promise<string> {

        const urbanBoltConfig = config.urbanebolt;
       const baseUrl  = urbanBoltConfig.apiUrl;
       const clientId = urbanBoltConfig.clientId;
       const clientSecret = urbanBoltConfig.clientSecret;

       try {
        let res = await axios.post(`${baseUrl}/api/v1/auth/getToken/`, {
            username: clientId,
            password: clientSecret,
        },
    {
        withCredentials: true
    });

        const data = res.data as {access_token: string, expires_in: number};

        this.cache = { 
            token: data.access_token,
            expiresAt: Date.now() + data.expires_in
        }

        return this.cache.token;
       } catch (error) {
        this.logger.error({err: (error as Error).message}, 'Failed to fetch UrbanBolt auth token');
        throw new CourierAuthFailedError('UrbanBolt Authentication failed');
       }
     }
}
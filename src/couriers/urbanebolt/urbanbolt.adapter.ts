import { Injectable } from "@nestjs/common";
import { BaseCourierAdapter } from "../base/base-courier.adapter";
import {
    CourierCtx,
    NormalizedCreateOrder,
} from "../courier.interface";
import { UrbanBoltAuthService } from "./urbanebolt.auth";
import { UrbaneBoltMapper } from "./urbanbolt.mapper";
import config from "src/config/config";

@Injectable()
export class UrbanBoltAdapter extends BaseCourierAdapter  {
    readonly key = 'URBANEBOLT';
    private readonly baseUrl: string;

    
    constructor(private readonly authService: UrbanBoltAuthService){
        super();
        this.baseUrl = config.urbanebolt.apiUrl;
    }

    protected async getAuthToken(forceRefresh: boolean = false): Promise<string> {
        return this.authService.getToken(forceRefresh);
    }

    async createOrder(input: NormalizedCreateOrder, ctx: CourierCtx): Promise<any> {
        const payload = UrbaneBoltMapper.toCreatePayload(input);
        const token = await this.getAuthToken();
 
            const response = await this.makeRequest({
                method: 'POST',
                url: `${this.baseUrl}/api/v1/services/manifest/`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                data: [payload]
            }, ctx);

            return response.data;
    
    }

    async getOrder(courierOrderId: string, ctx: CourierCtx): Promise<any> {
        const token = await this.getAuthToken();
        const response = await this.makeRequest({
            method: 'GET',
            url: `${this.baseUrl}/api/v1/services/tracking-pub/?awb=${courierOrderId}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }, ctx);

        return response.data;
    }

    async cancelOrder(courierOrderId: string, ctx: CourierCtx): Promise<any> {
        const token = await this.getAuthToken();
        const response = await this.makeRequest({
            method: 'POST',
            url: `${this.baseUrl}/api/v1/services/cancel/`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                awbs: courierOrderId
            }
        }, ctx);

        return response.data;
    }
}


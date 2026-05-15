import { Injectable } from "@nestjs/common";
import { BaseCourierAdapter } from "../base/base-courier.adapter";
import {
    CourierCtx,
    NormalizedCreateOrder,
} from "../courier.interface";
import { BlueDartAuthService } from "./bluedart.auth";
import { BlueDartMapper } from "./bluedart.mapper";
import config from "src/config/config";

@Injectable()
export class BlueDartAdapter extends BaseCourierAdapter  {
    readonly key = 'BLUEDART';
    private readonly baseUrl: string;

    
    constructor(private readonly authService: BlueDartAuthService){
        super();
        this.baseUrl = config.bluedart.apiUrl;
    }

    protected async getAuthToken(forceRefresh: boolean = false): Promise<string> {
        return this.authService.getToken(forceRefresh);
    }

    async createOrder(input: NormalizedCreateOrder, ctx: CourierCtx): Promise<any> {
        const payload = BlueDartMapper.toCreatePayload(input);
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


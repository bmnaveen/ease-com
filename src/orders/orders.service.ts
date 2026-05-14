import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {ShipmentStatus} from "../common/enums/ShimentStatus.enum";
import { Order } from "./entities/order.entity";
import { TrackingEvent } from "./entities/tracking.entity";
import { ErrorCode } from "src/common/errors/error-codes";
import {CourierRegistryService} from "src/couriers/courier-registery.service";
import { NormalizedCreateOrder } from "src/couriers/courier.interface";
import { CreateOrderDto } from "./dto/create-order.dto";

@Injectable()
export class OrdersService {
    private readonly logger = new Logger(OrdersService.name);

    constructor(
        // @InjectRepository(Order)
        // private readonly orders: Repository<Order>,
        // @InjectRepository(TrackingEvent)
        // private readonly events: Repository<TrackingEvent>,
        private readonly registery: CourierRegistryService
    ) {}

    async create(createOrderDto: CreateOrderDto, requestId: string): Promise<any> {
        const adapter = this.registery.getAdapter(createOrderDto.courier_partner);

        const normalizedInput: NormalizedCreateOrder = {
            client_id: createOrderDto.client_id,
            customer_code: createOrderDto.customer_code,
            order_ref: createOrderDto.order_ref,
            declared_amount: createOrderDto.declared_amount,
            product_description: createOrderDto.product_description,
            collection_amount: createOrderDto.collection_amount,
            item_height: createOrderDto.item_height,
            item_length: createOrderDto.item_length,
            item_width: createOrderDto.item_width,
            unit_count: createOrderDto.unit_count,
            item_weight: createOrderDto.item_weight,
            service_category: createOrderDto.service_category,
            payment_method: createOrderDto.payment_method,
            origin_city: createOrderDto.origin_city,
            origin_state: createOrderDto.origin_state,
            origin_country: createOrderDto.origin_country,
            sender_postal_code: createOrderDto.sender_postal_code,
            sender_address: createOrderDto.sender_address,
            sender_address_category: createOrderDto.sender_address_category,
            sender_name: createOrderDto.sender_name,
            sender_email: createOrderDto.sender_email,
            sender_phone: createOrderDto.sender_phone,
            delivery_city: createOrderDto.delivery_city,
            destination_state: createOrderDto.destination_state,
            destination_country: createOrderDto.destination_country,
            recipient_postal_code: createOrderDto.recipient_postal_code,
            recipient_address: createOrderDto.recipient_address,
            recipient_address_category: createOrderDto.recipient_address_category,
            recipient_name: createOrderDto.recipient_name,
            recipient_email: createOrderDto.recipient_email,
            recipient_phone: createOrderDto.recipient_phone,
            dispatch_city: createOrderDto.dispatch_city,
            dispatch_state: createOrderDto.dispatch_state,
            dispatch_country: createOrderDto.dispatch_country,
            dispatcher_postal_code: createOrderDto.dispatcher_postal_code,
            dispatcher_address: createOrderDto.dispatcher_address,
            dispatcher_address_category: createOrderDto.dispatcher_address_category,
            dispatcher_name: createOrderDto.dispatcher_name,
            dispatcher_email: createOrderDto.dispatcher_email,
            dispatcher_phone: createOrderDto.dispatcher_phone,
            bill_number: createOrderDto.bill_number,
            billing_date: createOrderDto.billing_date,
            bill_amount: createOrderDto.bill_amount,
            total_items: createOrderDto.total_items
        }
        

        try {
            const result = await adapter.createOrder(normalizedInput, {requestId: requestId});
            return result;
        } catch (error) {
            this.logger.error('Error creating order', { error, requestId });
            throw error;
        }

    }

    async get(courierOrderId: string, courierPartner: string, requestId: string): Promise<any> {
        try {
         const adapter = this.registery.getAdapter(courierPartner);
         const result =  await adapter.getOrder(courierOrderId, {requestId: requestId});
         return result;
        } catch (error) {
            this.logger.error('Error creating order', { error, requestId });
            throw error;
        }
         
    }
    async cancel(courierOrderId: string, courierPartner: string, requestId: string): Promise<any> {
        try {
         const adapter = this.registery.getAdapter(courierPartner);
         const result =  await adapter.cancelOrder(courierOrderId, {requestId: requestId});
         return result;
        } catch (error) {
            this.logger.error('Error creating order', { error, requestId });
            throw error;
        }
         
    }
}



import { ShipmentStatus } from "src/common/enums/ShimentStatus.enum";

export interface CourierCtx {
    requestId: string;
    internalOrderId?: string;
}

export interface Address {
    name: string;
    phone: string;
    line: string;
    line2?: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
}

export interface OrderItem {
    name: string;
    quantity: number;
    price: number;
}

export interface NormalizedCreateOrder {
  client_id: string;
  customer_code: string;
  order_ref: string;
  declared_amount: number;
  product_description: string;
  collection_amount?: number;
  item_height: number;
  item_length: number;
  item_width: number;
  unit_count: number;
  item_weight: number;
  service_category: string;
  payment_method: string;
  origin_city: string;
  origin_state: string;
  origin_country: string;
  sender_postal_code: number;
  sender_address: string;
  sender_address_category: string;
  sender_name: string;
  sender_email: string;
  sender_phone: number;
  delivery_city: string;
  destination_state: string;
  destination_country: string;
  recipient_postal_code: number;
  recipient_address: string;
  recipient_address_category: string;
  recipient_name: string;
  recipient_email: string;
  recipient_phone: number;
  dispatch_city?: string;
  dispatch_state?: string;
  dispatch_country?: string;
  dispatcher_postal_code?: number;
  dispatcher_address?: string;
  dispatcher_address_category?: string;
  dispatcher_name?: string;
  dispatcher_email?: string;
  dispatcher_phone?: number;
  bill_number: string;
  billing_date: string;
  bill_amount: number;
  total_items: number;
}

export interface NormalizedCreateOrderResult {
    courierOrderId: string;
    awbNumber?: string;
    status: ShipmentStatus;
    raw: unknown;
}

export interface ICourierAdapter {
    readonly key: string;
    createOrder(input: NormalizedCreateOrder, ctx:CourierCtx): Promise<any>;
    getOrder(courierOrderId: string, ctx:CourierCtx): Promise<any>;
    cancelOrder(courierOrderId: string, ctx:CourierCtx): Promise<any>;
}

export const COURIER_ADAPTERS = Symbol('COURIER_ADAPTERS');
    
import { ShipmentStatus } from "src/common/enums/ShimentStatus.enum";
import { NormalizedCreateOrder, NormalizedCreateOrderResult } from "../courier.interface";
import { from } from "rxjs";


export const BlueDartMapper = {
    toCreatePayload(input: NormalizedCreateOrder) {
      return {
        "customerCode": input.customer_code,
        "orderNumber": input.order_ref,
        "declaredValue": input.declared_amount,
        "itemDescription": input.product_description,
        "collectableValue": input.collection_amount,
        "height": input.item_height,
        "length": input.item_length,
        "pieces": input.unit_count,
        "weight": input.item_weight,
        "breadth": input.item_width,
        "serviceType": input.service_category,
        "payMode": input.payment_method,
        "rtnCity": input.origin_city,
        "rtnName": input.sender_name,
        "consCity": input.delivery_city,
        "consName": input.recipient_name,
        "rtnEmail": input.sender_email,
        "rtnState": input.origin_state,
        "shprCity": input.dispatch_city,
        "shprName": input.sender_name,
        "consEmail": input.recipient_email,
        "consState": input.destination_state,
        "rtnMobile": input.sender_phone,
        "shprEmail": input.sender_email,
        "shprState": input.dispatch_state,
        "consMobile": input.recipient_phone,
        "rtnAddress": input.sender_address,
        "rtnAddressType": input.sender_address_category,
        "rtnCountry": input.origin_country,
        "rtnPincode": input.sender_postal_code,
        "shprMobile": input.sender_phone,
        "consAddress": input.recipient_address,
        "consAddressType": input.recipient_address_category,
        "consCountry": input.destination_country,
        "consPincode": input.recipient_postal_code,
        "invoiceNumber": input.bill_number,
        "invoiceDate": input.billing_date,
        "shprAddress": input.sender_address,
        "shprAddressType": input.sender_address_category,
        "shprCountry": input.dispatch_country,
        "shprPincode": input.dispatcher_postal_code,
        "invoiceValue": input.bill_amount,
        "itemQuantity": input.unit_count,
    }
    },  
}


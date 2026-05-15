
import { Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsEmail,
  IsPhoneNumber,
  IsDateString,
  IsEnum,
  IsOptional,
  IsPositive,
  Min,
  IsArray,
  ArrayMinSize,
  ValidateNested,
  ArrayMaxSize,
} from 'class-validator';

export class CommonDto {
  @IsString()
  courier_partner: string;
}

export class CreateOrderDto extends CommonDto {

  @IsString()
  client_id: string;

  @IsString()
  customer_code: string;

  @IsString()
  order_ref: string;


  @IsNumber()
  @IsPositive()
  declared_amount: number;


  @IsString()
  product_description: string;


  @IsNumber()
  @IsOptional()
  collection_amount?: number;


  @IsNumber()
  @Min(0)
  item_height: number;


  @IsNumber()
  @Min(0)
  item_length: number;


  @IsNumber()
  @Min(0)
  item_width: number;


  @IsNumber()
  @IsPositive()
  unit_count: number;


  @IsNumber()
  @IsPositive()
  item_weight: number;


  @IsString()
  service_category: string;


  @IsEnum(['COD', 'PREPAID', 'CREDIT'])
  payment_method: string;


  @IsString()
  origin_city: string;


  @IsString()
  origin_state: string;


  @IsString()
  origin_country: string;


  @IsNumber()
  sender_postal_code: number;

  @IsString()
  sender_address: string;


  @IsString()
  sender_address_category: string;


  @IsString()
  sender_name: string;


  @IsEmail()
  sender_email: string;


  @IsNumber()
  sender_phone: number;


  @IsString()
  delivery_city: string;


  @IsString()
  destination_state: string;


  @IsString()
  destination_country: string;


  @IsNumber()
  recipient_postal_code: number;


  @IsString()
  recipient_address: string;


  @IsString()
  recipient_address_category: string;


  @IsString()
  recipient_name: string;


  @IsEmail()
  recipient_email: string;


  @IsNumber()
  recipient_phone: number;

  @IsString()
  @IsOptional()
  dispatch_city?: string;


  @IsString()
  @IsOptional()
  dispatch_state?: string;


  @IsString()
  @IsOptional()
  dispatch_country?: string;


  @IsNumber()
  @IsOptional()
  dispatcher_postal_code?: number;


  @IsString()
  @IsOptional()
  dispatcher_address?: string;

  @IsString()
  @IsOptional()
  dispatcher_address_category?: string;


  @IsString()
  @IsOptional()
  dispatcher_name?: string;


  @IsEmail()
  @IsOptional()
  dispatcher_email?: string;



  @IsOptional()
  dispatcher_phone?: number;


  @IsString()
  bill_number: string;


  @IsDateString()
  billing_date: string;


  @IsNumber()
  @IsPositive()
  bill_amount: number;


  @IsNumber()
  @IsPositive()
  total_items: number;
}

export class CancelOrderDto extends CommonDto {
  @IsString()
  awb: string;
}


export class BatchCreateOrderDto {
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(100)
  @ValidateNested({ each: true })
  @Type(() => CreateOrderDto)
  orders: CreateOrderDto[];
}
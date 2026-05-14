import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    ParseUUIDPipe,
    Headers,
    Query
} from '@nestjs/common';
import { CancelOrderDto, CreateOrderDto, CommonDto} from './dto/create-order.dto';
import { OrdersService } from './orders.service';

@Controller({path: 'orders', version: '1'})
export class OrdersController {
    constructor(private readonly service: OrdersService){}

    @Post()
    async create(
        @Body() dto: CreateOrderDto,
        @Headers('x-request-id') requestId: string
    ) : Promise<any> {
       const order = await this.service.create(dto, requestId);
       return {message: 'Order created successfully', data: order};
    }

    @Get()
     async get(
        @Query('awb') id: string,
        @Body() dto: CommonDto,
        @Headers('x-request-id') requestId: string
    ) : Promise<any> {
        const order = await this.service.get(id, dto.courier_partner, requestId);
        return {message: 'Order fetched successfully', data: order};
    }

    @Post("/cancel")
    async cancel(
        @Body() dto: CancelOrderDto,
        @Headers('x-request-id') requestId: string
    ) : Promise<any> {
       const result = await this.service.cancel(dto.awb, dto.courier_partner, requestId);
       return {message: 'Order cancelled successfully', data: result};
    }



    
}

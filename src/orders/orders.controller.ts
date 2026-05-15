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
import { CancelOrderDto, CreateOrderDto, CommonDto, BatchCreateOrderDto} from './dto/create-order.dto';
import { OrdersService } from './orders.service';

@Controller({path: 'orders', version: '1'})
export class OrdersController {
    constructor(private readonly service: OrdersService){}

    @Post()
    async create(
        @Body() dto: CreateOrderDto,
        @Headers('x-request-id') requestId: string
    ) : Promise<any> {
       return await this.service.create(dto, requestId);
    }

    @Get()
     async get(
        @Query('awb') id: string,
        @Body() dto: CommonDto,
        @Headers('x-request-id') requestId: string
    ) : Promise<any> {
        return await this.service.get(id, dto.courier_partner, requestId);
    }

    @Post("/cancel")
    async cancel(
        @Body() dto: CancelOrderDto,
        @Headers('x-request-id') requestId: string
    ) : Promise<any> {
       return await this.service.cancel(dto.awb, dto.courier_partner, requestId);
    }

    @Post("/batch")
    async bulkCreate(
        @Body() dto: BatchCreateOrderDto,
        @Headers('x-request-id') requestId: string
    ) : Promise<any> {
          return await this.service.bulkOrder(dto, requestId);
      
    }
}

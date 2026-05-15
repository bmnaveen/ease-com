import {Module} from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { CouriersModule } from 'src/couriers/couriers.module';
import { TrackingEvent } from './entities/tracking.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Order, TrackingEvent]), CouriersModule],
    providers: [OrdersService],
    controllers: [OrdersController]
})
export class OrdersModule {}
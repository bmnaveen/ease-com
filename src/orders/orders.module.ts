import {Module} from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { CouriersModule } from 'src/couriers/couriers.module';

@Module({
    imports: [CouriersModule],
    providers: [OrdersService],
    controllers: [OrdersController]
})
export class OrdersModule {}
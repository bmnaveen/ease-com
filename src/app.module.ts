import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './config/config';
import { OrdersModule } from './orders/orders.module';
import { Order } from './orders/entities/order.entity';
import { TrackingEvent } from './orders/entities/tracking.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: config.db.host,
      port: config.db.port,
      username: config.db.user,
      password: config.db.password,
      database: config.db.name,
      entities: [Order, TrackingEvent],
      synchronize: true,       //Keep this false at Prod deployment and keep it Configurable
    }),
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order } from './entities/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/database/database.module';
import { ordersProviders } from './orders.providers';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Order])],
  controllers: [OrdersController],
  providers: [...ordersProviders, OrdersService],
})
export class OrdersModule {}

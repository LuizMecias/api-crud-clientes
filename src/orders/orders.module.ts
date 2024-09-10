import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order } from './entities/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/database/database.module';
import { ordersProviders } from './orders.providers';
import { ClientsModule } from 'src/clients/clients.module';
import { OrderProductsModule } from 'src/order-products/order-products.module';

@Module({
  imports: [
    DatabaseModule,
    ClientsModule,
    OrderProductsModule,
    TypeOrmModule.forFeature([Order]),
  ],
  controllers: [OrdersController],
  providers: [...ordersProviders, OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}

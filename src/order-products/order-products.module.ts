import { Module } from '@nestjs/common';
import { orderProductsProviders } from './order-products.providers';
import { OrderProductsService } from './order-products.service';
import { OrderProductsController } from './order-products.controller';
import { OrderProduct } from './entities/order-product.entity';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from 'src/products/products.module';
import { OrdersModule } from 'src/orders/orders.module';

@Module({
  imports: [
    DatabaseModule,
    ProductsModule,
    OrdersModule,
    TypeOrmModule.forFeature([OrderProduct]),
  ],
  controllers: [OrderProductsController],
  providers: [...orderProductsProviders, OrderProductsService],
  exports: [OrderProductsService],
})
export class OrderProductsModule {}

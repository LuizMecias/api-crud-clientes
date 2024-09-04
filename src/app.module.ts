import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { ClientsModule } from './clients/clients.module';
import { AddressesModule } from './addresses/addresses.module';
import { DependentsModule } from './dependents/dependents.module';
import { Client } from './clients/entities/client.entity';
import { Address } from './addresses/entities/address.entity';
import { Dependent } from './dependents/entities/dependent.entity';
import { PhonesModule } from './phones/phones.module';
import { Phone } from './phones/entities/phone.entity';
import { ProductsModule } from './products/products.module';
import { Product } from './products/entities/product.entity';
import { OrdersModule } from './orders/orders.module';
import { Order } from './orders/entities/order.entity';

@Module({
  imports: [
    ClientsModule,
    AddressesModule,
    DependentsModule,
    PhonesModule,
    TypeOrmModule.forFeature([
      Client,
      Address,
      Dependent,
      Phone,
      Product,
      Order,
    ]),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'clientes',
      entities: [Client, Address, Dependent, Phone, Product, Order],
      synchronize: false,
    }),
    ProductsModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

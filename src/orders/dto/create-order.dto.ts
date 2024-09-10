import { Client } from 'src/clients/entities/client.entity';
import { OrderProduct } from 'src/order-products/entities/order-product.entity';

export class CreateOrderDto {
  client: Client;
  orderProducts: OrderProduct[];
}

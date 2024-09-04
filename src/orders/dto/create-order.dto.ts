import { Client } from 'src/clients/entities/client.entity';
import { Product } from 'src/products/entities/product.entity';

export class CreateOrderDto {
  client: Client;
  products: Product[];
}

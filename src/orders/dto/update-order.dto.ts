import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { Client } from 'src/clients/entities/client.entity';
import { Product } from 'src/products/entities/product.entity';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  id: number;
  client: Client;
  products: Product[];
}

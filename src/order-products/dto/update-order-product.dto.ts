import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderProductDto } from './create-order-product.dto';
import { Product } from 'src/products/entities/product.entity';
import { Order } from 'src/orders/entities/order.entity';

export class UpdateOrderProductDto extends PartialType(CreateOrderProductDto) {
  id: number;
  quantity: number;
  price: number;
  order: Order;
  product: Product;
}

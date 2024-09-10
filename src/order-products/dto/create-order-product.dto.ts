import { Order } from 'src/orders/entities/order.entity';
import { Product } from 'src/products/entities/product.entity';

export class CreateOrderProductDto {
  order: Order;
  product: Product;
  price: number;
  quantity: number;
}

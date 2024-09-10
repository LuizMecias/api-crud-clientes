import { Product } from 'src/products/entities/product.entity';

export class CreateOrderProductDto {
  product: Product;
  price: number;
  quantity: number;
}

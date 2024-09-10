import { DataSource } from 'typeorm';
import { OrderProduct } from './entities/order-product.entity';

export const orderProductsProviders = [
  {
    provide: 'ORDER-PRODUCTS_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(OrderProduct),
    inject: ['DATA_SOURCE'],
  },
];

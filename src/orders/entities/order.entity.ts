import { Client } from 'src/clients/entities/client.entity';
import { Product } from 'src/products/entities/product.entity';
import {
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Client, (client) => client.orders)
  client: Client;

  @ManyToMany(() => Product, (product) => product.orders)
  @JoinTable({ name: 'order_product' })
  products: Product[];
}

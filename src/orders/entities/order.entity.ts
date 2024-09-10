import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Client } from 'src/clients/entities/client.entity';
import { OrderProduct } from 'src/order-products/entities/order-product.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateTime: Date;

  @ManyToOne(() => Client, (client) => client.orders, {
    onDelete: 'CASCADE',
  })
  client: Client;

  @OneToMany(() => OrderProduct, (orderProducts) => orderProducts.order)
  orderProducts: OrderProduct[];
}

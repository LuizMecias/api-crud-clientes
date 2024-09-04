import { Column, PrimaryGeneratedColumn, OneToMany, Entity } from 'typeorm';
import { Address } from '../../addresses/entities/address.entity';
import { Dependent } from '../../dependents/entities/dependent.entity';
import { Phone } from 'src/phones/entities/phone.entity';
import { Order } from 'src/orders/entities/order.entity';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100 })
  cpf: string;

  @Column({ length: 200 })
  email: string;

  @OneToMany(() => Phone, (phone) => phone.client, {
    cascade: true,
  })
  phones: Phone[];

  @OneToMany(() => Address, (address) => address.client, {
    cascade: true,
  })
  addresses: Address[];

  @OneToMany(() => Dependent, (dependent) => dependent.client, {
    cascade: true,
  })
  dependents: Dependent[];

  @OneToMany(() => Order, (order) => order.client, {
    cascade: true,
  })
  orders: Order[];
}

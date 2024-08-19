import { Column, PrimaryGeneratedColumn, OneToMany, Entity } from 'typeorm';
import { Address } from '../../addresses/entities/address.entity';
import { Dependent } from '../../dependents/entities/dependent.entity';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100 })
  cpf: string;

  @Column({ length: 100 })
  phone: string;

  @Column({ length: 200 })
  email: string;

  @OneToMany(() => Address, (address) => address.client, {
    cascade: true,
  })
  addresses?: Address[];

  @OneToMany(() => Dependent, (dependent) => dependent.client, {
    cascade: true,
  })
  dependents?: Dependent[];
}

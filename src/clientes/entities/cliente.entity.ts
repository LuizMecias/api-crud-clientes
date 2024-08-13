import { Address } from './../../addresses/entities/address.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Cliente {
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

  @OneToMany(() => Address, (address) => address.cliente)
  addresses?: Address[];
}

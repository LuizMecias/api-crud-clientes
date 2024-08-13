import { Cliente } from 'src/clientes/entities/cliente.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  cep: string;

  @Column({ length: 100 })
  street: string;

  @Column({ length: 100 })
  number: string;

  @Column({ length: 100 })
  complement: string;

  @Column({ length: 100 })
  district: string;

  @Column({ length: 100 })
  city: string;

  @Column({ length: 100 })
  state: string;

  @Column({ length: 100 })
  country: string;

  @Column({ length: 100 })
  reference: string;

  @ManyToOne(() => Cliente, (cliente) => cliente.addresses)
  @JoinColumn({ name: 'id_cliente', referencedColumnName: 'id' })
  cliente?: Cliente;
}

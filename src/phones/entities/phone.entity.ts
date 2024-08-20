import { Column, ManyToOne, PrimaryGeneratedColumn, Entity } from 'typeorm';
import { Client } from '../../clients/entities/client.entity';

@Entity()
export class Phone {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  phoneNumber: string;

  @ManyToOne(() => Client, (client) => client.phones, {
    onDelete: 'CASCADE',
  })
  client: Client;
}

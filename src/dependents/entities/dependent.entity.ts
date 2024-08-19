import { Column, ManyToOne, PrimaryGeneratedColumn, Entity } from 'typeorm';
import { Client } from '../../clients/entities/client.entity';

@Entity()
export class Dependent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @ManyToOne(() => Client, (client) => client.dependents, {
    onDelete: 'CASCADE',
  })
  client?: Client;
}

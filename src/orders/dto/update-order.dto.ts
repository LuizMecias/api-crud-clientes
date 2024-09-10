import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { Client } from 'src/clients/entities/client.entity';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  id: number;
  dateTime: Date;
  client: Client;
}

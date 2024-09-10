import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { ResultadoDto } from 'src/dto/resultado.dto';
import { ClientsService } from 'src/clients/clients.service';
import { Client } from 'src/clients/entities/client.entity';

@Injectable()
export class OrdersService {
  constructor(
    @Inject('ORDERS_REPOSITORY')
    private ordersRepository: Repository<Order>,
    @Inject()
    private clientsService: ClientsService,
  ) {}

  async listAll(): Promise<Order[]> {
    return this.ordersRepository.find();
  }

  async register(data: CreateOrderDto): Promise<ResultadoDto> {
    try {
      const client: Client = await this.clientsService.findOne(data.client.id);

      if (!client) {
        return { status: false, mensagem: 'Client não encontrado' };
      }

      const order: Order = this.ordersRepository.create(data);
      order.client = client;
      await this.ordersRepository.save(order);
      for(const orderProduct of data.orderProducts) {
        order.orderProducts.push(orderProduct);
        await this.ordersRepository.save(order);
      }
      return { status: true, mensagem: 'ordere cadastrado com sucesso' };
    } catch (error) {
      console.log(error);
      return { status: false, mensagem: 'Erro ao cadastrar ordere' };
    }
  }

  async findOne(id: number): Promise<Order> {
    return this.ordersRepository.findOne({ where: { id: id } });
  }
}

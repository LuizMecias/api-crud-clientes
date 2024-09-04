import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { ResultadoDto } from 'src/dto/resultado.dto';

@Injectable()
export class OrdersService {
  constructor(
    @Inject('ORDERS_REPOSITORY')
    private ordersRepository: Repository<Order>,
  ) {}

  async listAll(): Promise<Order[]> {
    return this.ordersRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.products', 'product')
      .getMany();
  }

  async register(data: CreateOrderDto): Promise<ResultadoDto> {
    if (!data) {
      throw new Error('Dados inválidos');
    }

    try {
      const order = this.ordersRepository.create(data);
      await this.ordersRepository.save(order);
      return { status: true, mensagem: 'Produto cadastrado com sucesso' };
    } catch (error) {
      return { status: false, mensagem: 'Erro ao cadastrar producto' };
    }
  }
}

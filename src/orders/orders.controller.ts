import { Controller, Post, Body, Get } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ResultadoDto } from 'src/dto/resultado.dto';
import { Order } from './entities/order.entity';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('list')
  async listAll(): Promise<Order[]> {
    return this.ordersService.listAll();
  }

  @Post('register')
  async register(@Body() data: CreateOrderDto): Promise<ResultadoDto> {
    return this.ordersService.register(data);
  }
}

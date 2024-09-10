import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrderProductsService } from './order-products.service';
import { ResultadoDto } from 'src/dto/resultado.dto';
import { CreateOrderProductDto } from './dto/create-order-product.dto';

@Controller('orders-products')
export class OrderProductsController {
  constructor(private readonly orderProductsService: OrderProductsService) {}

  @Get('list')
  findAll() {
    return this.orderProductsService.findAll();
  }

  @Post('register')
  async register(@Body() data: CreateOrderProductDto): Promise<ResultadoDto> {
    return this.orderProductsService.register(data);
  }
}

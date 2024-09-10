import { ProductsService } from './../products/products.service';
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { OrderProduct } from './entities/order-product.entity';
import { CreateOrderProductDto } from './dto/create-order-product.dto';
import { ResultadoDto } from 'src/dto/resultado.dto';
import { Product } from 'src/products/entities/product.entity';
import { Order } from 'src/orders/entities/order.entity';
import { OrdersService } from 'src/orders/orders.service';

@Injectable()
export class OrderProductsService {
  constructor(
    @Inject('ORDER-PRODUCTS_REPOSITORY')
    private orderProductsRepository: Repository<OrderProduct>,
    @Inject()
    private productsService: ProductsService,
    @Inject()
    private ordersService: OrdersService,
  ) {}

  findAll() {
    return `This action returns all orderProducts`;
  }

  async register(data: CreateOrderProductDto): Promise<ResultadoDto> {
    if (!data) {
      throw new Error('Dados inválidos');
    }
    if (!data.product || !data.product.id) {
      return { status: false, mensagem: 'ID do produto não fornecido' };
    }
    if (!data.order || !data.order.id) {
      return { status: false, mensagem: 'ID do pedido não fornecido' };
    }

    const product: Product = await this.productsService.findOne(
      data.product?.id,
    );
    if (!product) {
      return { status: false, mensagem: 'Produto não encontrado' };
    }
    const order: Order = await this.ordersService.findOne(data.order?.id);
    if (!order) {
      return { status: false, mensagem: 'Pedido não encontrada' };
    }

    // console.log(data);

    try {
      const orderProduct = this.orderProductsRepository.create(data);
      orderProduct.product = product;
      orderProduct.order = order;

      await this.orderProductsRepository.save(orderProduct);
      return { status: true, mensagem: 'Produto cadastrado com sucesso' };
    } catch (error) {
      return { status: false, mensagem: 'Erro ao cadastrar producto' };
    }
  }
}

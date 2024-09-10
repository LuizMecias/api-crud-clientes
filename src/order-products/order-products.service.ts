import { ProductsService } from './../products/products.service';
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { OrderProduct } from './entities/order-product.entity';
import { CreateOrderProductDto } from './dto/create-order-product.dto';
import { ResultadoDto } from 'src/dto/resultado.dto';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class OrderProductsService {
  constructor(
    @Inject('ORDER-PRODUCTS_REPOSITORY')
    private orderProductsRepository: Repository<OrderProduct>,
    @Inject()
    private productsService: ProductsService,
  ) {}

  findAll() {
    return this.orderProductsRepository.find();
  }

  async register(data: CreateOrderProductDto): Promise<ResultadoDto> {
    if (!data) {
      throw new Error('Dados inválidos');
    }
    if (!data.product || !data.product.id) {
      return { status: false, mensagem: 'ID do produto não fornecido' };
    }

    const product: Product = await this.productsService.findOne(
      data.product?.id,
    );
    if (!product) {
      return { status: false, mensagem: 'Produto não encontrado' };
    }

    try {
      const orderProduct = this.orderProductsRepository.create(data);
      orderProduct.product = product;

      await this.orderProductsRepository.save(orderProduct);
      return { status: true, mensagem: 'Produto cadastrado com sucesso' };
    } catch (error) {
      return { status: false, mensagem: 'Erro ao cadastrar producto' };
    }
  }
}

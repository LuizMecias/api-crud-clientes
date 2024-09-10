import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Like, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { ResultadoDto } from 'src/dto/resultado.dto';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('PRODUCTS_REPOSITORY')
    private productsRepository: Repository<Product>,
  ) {}

  async listAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  async register(data: CreateProductDto): Promise<ResultadoDto> {
    if (!data) {
      throw new Error('Dados inválidos');
    }

    try {
      const product = this.productsRepository.create(data);
      await this.productsRepository.save(product);
      return { status: true, mensagem: 'Produto cadastrado com sucesso' };
    } catch (error) {
      return { status: false, mensagem: 'Erro ao cadastrar producto' };
    }
  }

  async update(id: number, data: UpdateProductDto): Promise<ResultadoDto> {
    try {
      const product = await this.productsRepository.findOne({
        where: { id: id },
      });
      if (!product) {
        return { status: false, mensagem: 'Produto não encontrado' };
      }

      await this.productsRepository.update(product, data);
      return { status: true, mensagem: 'Produto alterado com sucesso' };
    } catch (error) {
      return { status: false, mensagem: 'Erro ao alterar producto' };
    }
  }

  async delete(id: number): Promise<ResultadoDto> {
    try {
      const product = await this.productsRepository.findOne({
        where: { id: id },
      });
      if (!product) {
        return { status: false, mensagem: 'Produto não encontrado' };
      }

      await this.productsRepository.remove(product);
      return { status: true, mensagem: 'Produto excluído com sucesso' };
    } catch (error) {
      return { status: false, mensagem: 'Erro ao excluir producto' };
    }
  }

  async search(searchInput: string): Promise<Product[]> {
    return this.productsRepository.find({
      where: [
        {
          name: Like(`%${searchInput}%`),
        },
      ],
    });
  }

  async findOne(id: number): Promise<Product> {
    return this.productsRepository.findOne({ where: { id: id } });
  }
}

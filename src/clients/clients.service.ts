import { Injectable, Inject } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { Client } from './entities/client.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { ResultadoDto } from 'src/dto/resultado.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientsService {
  constructor(
    @Inject('CLIENTS_REPOSITORY')
    private clientsRepository: Repository<Client>,
  ) {}

  async listAll(): Promise<Client[]> {
    return this.clientsRepository.find();
  }

  async register(data: CreateClientDto): Promise<ResultadoDto> {
    if (!data) {
      throw new Error('Dados inválidos');
    }

    try {
      const client = this.clientsRepository.create(data);
      await this.clientsRepository.save(client);
      return { status: true, mensagem: 'Client cadastrado com sucesso' };
    } catch (error) {
      return { status: false, mensagem: 'Erro ao cadastrar client' };
    }
  }

  async update(id: number, data: UpdateClientDto): Promise<ResultadoDto> {
    try {
      const client = await this.clientsRepository.findOne({
        where: { id: id },
      });
      if (!client) {
        return { status: false, mensagem: 'Client não encontrado' };
      }

      await this.clientsRepository.update(client, data);
      return { status: true, mensagem: 'Client alterado com sucesso' };
    } catch (error) {
      return { status: false, mensagem: 'Erro ao alterar client' };
    }
  }

  async delete(id: number): Promise<ResultadoDto> {
    try {
      const client = await this.clientsRepository.findOne({
        where: { id: id },
      });
      if (!client) {
        return { status: false, mensagem: 'Client não encontrado' };
      }

      await this.clientsRepository.remove(client);
      return { status: true, mensagem: 'Client excluído com sucesso' };
    } catch (error) {
      return { status: false, mensagem: 'Erro ao excluir client' };
    }
  }

  async search(searchInput: string): Promise<Client[]> {
    return this.clientsRepository.find({
      where: [
        {
          name: Like(`%${searchInput}%`),
        },
      ],
    });
  }

  async findOne(id: number): Promise<Client> {
    return this.clientsRepository.findOne({ where: { id: id } });
  }

  async getAllClients(): Promise<Client[]> {
    return this.clientsRepository
      .createQueryBuilder('clients')
      .leftJoinAndSelect('clients.phones', 'phones')
      .leftJoinAndSelect('clients.addresses', 'addresses')
      .leftJoinAndSelect('clients.dependents', 'dependents')
      .leftJoinAndSelect('clients.orders', 'orders')
      .leftJoinAndSelect('orders.orderProducts', 'orderProducts')
      .leftJoinAndSelect('orderProducts.product', 'product')
      .getMany();
  }
}

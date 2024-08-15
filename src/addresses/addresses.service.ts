import { Inject, Injectable } from '@nestjs/common';
import { Address } from './entities/address.entity';
import { Like, Repository } from 'typeorm';
import { CreateAddressDto } from './dto/create-address.dto';
import { ResultadoDto } from 'src/dto/resultado.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Client } from 'src/clientes/entities/client.entity';
import { ClientsService } from 'src/clientes/clients.service';

@Injectable()
export class AddressesService {
  constructor(
    @Inject('ADDRESSES_REPOSITORY')
    private addressesRepository: Repository<Address>,
    @Inject()
    private clientsService: ClientsService,
  ) {
    console.log('Connected to the database');
  }

  async listAllById(id: number): Promise<Address[]> {
    return this.addressesRepository.find({ where: { client: { id: id } } });
  }

  async register(data: CreateAddressDto): Promise<ResultadoDto> {
    try {
      const client: Client = await this.clientsService.findOne(data.clientId);
      if (!client) {
        return { status: false, mensagem: 'Client não encontrado' };
      }

      const address: Address = this.addressesRepository.create(data);
      address.client = client;
      await this.addressesRepository.save(address);
      return { status: true, mensagem: 'Endereço cadastrado com sucesso' };
    } catch (error) {
      console.log(error);
      return { status: false, mensagem: 'Erro ao cadastrar Endereço' };
    }
  }

  async update(id: number, data: UpdateAddressDto): Promise<ResultadoDto> {
    try {
      const address = await this.addressesRepository.findOne({
        where: { id: id },
      });
      if (!address) {
        return { status: false, mensagem: 'Endereço não encontrado' };
      }

      await this.addressesRepository.update(address, data);
      return { status: true, mensagem: 'Endereço alterado com sucesso' };
    } catch (error) {
      return { status: false, mensagem: 'Erro ao alterar endereço' };
    }
  }

  async delete(id: number): Promise<ResultadoDto> {
    try {
      const address = await this.addressesRepository.findOne({
        where: { id: id },
      });
      if (!address) {
        return { status: false, mensagem: 'Endereço não encontrado' };
      }

      await this.addressesRepository.remove(address);
      return { status: true, mensagem: 'Endereço excluído com sucesso' };
    } catch (error) {
      return { status: false, mensagem: 'Erro ao excluir endereço' };
    }
  }

  async search(id: number, searchInput: string): Promise<Address[]> {
    return this.addressesRepository.find({
      where: {
        client: { id: id },
        street: Like(`%${searchInput}%`),
      },
    });
  }
}

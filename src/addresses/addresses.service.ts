import { Inject, Injectable } from '@nestjs/common';
import { Address } from './entities/address.entity';
import { Like, Repository } from 'typeorm';
import { CreateAddressDto } from './dto/create-address.dto';
import { ResultadoDto } from 'src/dto/resultado.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Cliente } from 'src/clientes/entities/cliente.entity';
import { ClientesService } from 'src/clientes/clientes.service';

@Injectable()
export class AddressesService {
  constructor(
    @Inject('ADDRESSES_REPOSITORY')
    private addressesRepository: Repository<Address>,
    @Inject()
    private clientesService: ClientesService,
  ) {
    console.log('Connected to the database');
  }

  findAllByCpf(cpf: string): Promise<Address[]> {
    return this.addressesRepository.find({ where: { cliente: { cpf } } });
  }

  async create(data: CreateAddressDto): Promise<ResultadoDto> {
    try {
      const cliente: Cliente = await this.clientesService.findOne(
        data.clienteCpf,
      );
      const address: Address = this.addressesRepository.create(data);
      address.cliente = cliente;
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

  async excluir(id: number): Promise<ResultadoDto> {
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

  async buscar(cpf: string, searchInput: string): Promise<Address[]> {
    console.log(cpf, searchInput);
    return this.addressesRepository.find({
      where: {
        cliente: { cpf: cpf },
        street: Like(`%${searchInput}%`),
      },
    });
  }
}

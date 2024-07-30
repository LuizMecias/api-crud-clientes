import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Cliente } from './entities/cliente.entity';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { ResultadoDto } from 'src/dto/resultado.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Injectable()
export class ClientesService {
  constructor(
    @Inject('CLIENTES_REPOSITORY')
    private clientesRepository: Repository<Cliente>,
  ) {}

  async findAll(): Promise<Cliente[]> {
    return this.clientesRepository.find();
  }

  async cadastrar(data: CreateClienteDto): Promise<ResultadoDto> {
    if (!data) {
      throw new Error('Dados inválidos');
    }

    try {
      const cliente = await this.clientesRepository.create(data);
      await this.clientesRepository.save(cliente);
      return { status: true, mensagem: 'Cliente cadastrado com sucesso' };
    } catch (error) {
      return { status: false, mensagem: 'Erro ao cadastrar cliente' };
    }
  }

  async alterar(cpf: string, data: UpdateClienteDto): Promise<ResultadoDto> {
    try {
      const cliente = await this.clientesRepository.findOne({ where: { cpf } });
      if (!cliente) {
        return { status: false, mensagem: 'Cliente não encontrado' };
      }

      await this.clientesRepository.update(cliente, data);
      return { status: true, mensagem: 'Cliente alterado com sucesso' };
    } catch (error) {
      return { status: false, mensagem: 'Erro ao alterar cliente' };
    }
  }

  async excluir(cpf: string): Promise<ResultadoDto> {
    try {
      const cliente = await this.clientesRepository.findOne({ where: { cpf } });
      if (!cliente) {
        return { status: false, mensagem: 'Cliente não encontrado' };
      }

      await this.clientesRepository.remove(cliente);
      return { status: true, mensagem: 'Cliente excluído com sucesso' };
    } catch (error) {
      return { status: false, mensagem: 'Erro ao excluir cliente' };
    }
  }
}

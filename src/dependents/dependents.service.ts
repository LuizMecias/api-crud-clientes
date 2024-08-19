import { Inject, Injectable } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { CreateDependentDto } from './dto/create-dependent.dto';
import { UpdateDependentDto } from './dto/update-dependent.dto';
import { ResultadoDto } from 'src/dto/resultado.dto';
import { Dependent } from './entities/dependent.entity';
import { ClientsService } from 'src/clients/clients.service';
import { Client } from 'src/clients/entities/client.entity';

@Injectable()
export class DependentsService {
  constructor(
    @Inject('DEPENDENTS_REPOSITORY')
    private dependentsRepository: Repository<Dependent>,
    @Inject()
    private clientsService: ClientsService,
  ) {
    console.log('Connected to the database');
  }

  async listAllById(id: number): Promise<Dependent[]> {
    return this.dependentsRepository.find({ where: { client: { id: id } } });
  }

  async register(data: CreateDependentDto): Promise<ResultadoDto> {
    try {
      const client: Client = await this.clientsService.findOne(data.clientId);
      if (!client) {
        return { status: false, mensagem: 'Client não encontrado' };
      }

      const dependent: Dependent = this.dependentsRepository.create(data);
      dependent.client = client;
      await this.dependentsRepository.save(dependent);
      return { status: true, mensagem: 'Dependente cadastrado com sucesso' };
    } catch (error) {
      console.log(error);
      return { status: false, mensagem: 'Erro ao cadastrar Dependente' };
    }
  }

  async update(id: number, data: UpdateDependentDto): Promise<ResultadoDto> {
    try {
      const dependent = await this.dependentsRepository.findOne({
        where: { id: id },
      });
      if (!dependent) {
        return { status: false, mensagem: 'Dependente não encontrado' };
      }

      await this.dependentsRepository.update(dependent, data);
      return { status: true, mensagem: 'Dependente alterado com sucesso' };
    } catch (error) {
      return { status: false, mensagem: 'Erro ao alterar dependente' };
    }
  }

  async delete(id: number): Promise<ResultadoDto> {
    try {
      const dependent = await this.dependentsRepository.findOne({
        where: { id: id },
      });
      if (!dependent) {
        return { status: false, mensagem: 'Dependente não encontrado' };
      }

      await this.dependentsRepository.remove(dependent);
      return { status: true, mensagem: 'Dependente excluído com sucesso' };
    } catch (error) {
      return { status: false, mensagem: 'Erro ao excluir dependente' };
    }
  }

  async search(id: number, searchInput: string): Promise<Dependent[]> {
    return this.dependentsRepository.find({
      where: {
        client: { id: id },
        name: Like(`%${searchInput}%`),
      },
    });
  }
}

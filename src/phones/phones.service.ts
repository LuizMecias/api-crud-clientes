import { Inject, Injectable } from '@nestjs/common';
import { CreatePhoneDto } from './dto/create-phone.dto';
import { UpdatePhoneDto } from './dto/update-phone.dto';
import { Like, Repository } from 'typeorm';
import { Phone } from './entities/phone.entity';
import { ClientsService } from 'src/clients/clients.service';
import { ResultadoDto } from 'src/dto/resultado.dto';
import { Client } from 'src/clients/entities/client.entity';

@Injectable()
export class PhonesService {
  constructor(
    @Inject('PHONES_REPOSITORY')
    private phonesRepository: Repository<Phone>,
    @Inject()
    private clientsService: ClientsService,
  ) {
    console.log('Connected to the database');
  }

  async listAllById(id: number): Promise<Phone[]> {
    return this.phonesRepository.find({ where: { client: { id: id } } });
  }

  async register(data: CreatePhoneDto): Promise<ResultadoDto> {
    try {
      const client: Client = await this.clientsService.findOne(data.clientId);

      if (!client) {
        return { status: false, mensagem: 'Cliente não encontrado' };
      }

      const phone: Phone = this.phonesRepository.create(data);
      phone.client = client;
      await this.phonesRepository.save(phone);
      return { status: true, mensagem: 'Telefone cadastrado com sucesso' };
    } catch (error) {
      console.log(error);
      return { status: false, mensagem: 'Erro ao cadastrar Telefone' };
    }
  }

  async update(id: number, data: UpdatePhoneDto): Promise<ResultadoDto> {
    try {
      const phone = await this.phonesRepository.findOne({
        where: { id: id },
      });
      const client: Client = await this.clientsService.findOne(data.clientId);

      if (!client) {
        return { status: false, mensagem: 'Cliente não encontrado' };
      }
      if (!phone) {
        return { status: false, mensagem: 'Telefone não encontrado' };
      }

      phone.client = client;
      await this.phonesRepository.update(phone, {
        phoneNumber: data.phoneNumber,
      });
      return { status: true, mensagem: 'Telefone alterado com sucesso' };
    } catch (error) {
      return { status: false, mensagem: 'Erro ao alterar Telefone' };
    }
  }

  async delete(id: number): Promise<ResultadoDto> {
    try {
      const phone = await this.phonesRepository.findOne({
        where: { id: id },
      });
      if (!phone) {
        return { status: false, mensagem: 'Telefone não encontrado' };
      }

      await this.phonesRepository.remove(phone);
      return { status: true, mensagem: 'Telefone excluído com sucesso' };
    } catch (error) {
      return { status: false, mensagem: 'Erro ao excluir Telefone' };
    }
  }

  async search(id: number, searchInput: string): Promise<Phone[]> {
    return this.phonesRepository.find({
      where: {
        client: { id: id },
        phoneNumber: Like(`%${searchInput}%`),
      },
    });
  }
}

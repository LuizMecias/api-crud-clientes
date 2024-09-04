import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { Client } from './entities/client.entity';
import { ResultadoDto } from 'src/dto/resultado.dto';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get('list')
  async listAll(): Promise<Client[]> {
    return this.clientsService.listAll();
  }

  @Post('register')
  async register(@Body() data: CreateClientDto): Promise<ResultadoDto> {
    return this.clientsService.register(data);
  }

  @Put('update/:id')
  async update(
    @Param('id') id: number,
    @Body() data: UpdateClientDto,
  ): Promise<ResultadoDto> {
    return this.clientsService.update(id, data);
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: number): Promise<ResultadoDto> {
    return this.clientsService.delete(id);
  }

  @Get('search')
  async search(@Query('searchInput') searchInput: string): Promise<Client[]> {
    return this.clientsService.search(searchInput);
  }

  @Get('report')
  async getAllClients(): Promise<Client[]> {
    return this.clientsService.getAllClients();
  }
}

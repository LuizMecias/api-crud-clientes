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
import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { ResultadoDto } from 'src/dto/resultado.dto';
import { Address } from './entities/address.entity';
import { UpdateAddressDto } from './dto/update-address.dto';

@Controller('addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Get('/listar/:cpf')
  async findAllByCpf(@Param('cpf') cpf: string): Promise<Address[]> {
    return this.addressesService.findAllByCpf(cpf);
  }

  @Post('/cadastrar')
  async create(@Body() data: CreateAddressDto): Promise<ResultadoDto> {
    return this.addressesService.create(data);
  }

  @Put('/atualizar/:id')
  async update(
    @Param('id') id: number,
    @Body() data: UpdateAddressDto,
  ): Promise<ResultadoDto> {
    return this.addressesService.update(id, data);
  }

  @Delete('deletar/:id')
  async excluir(@Param('id') id: number): Promise<ResultadoDto> {
    return this.addressesService.excluir(id);
  }

  @Get('buscar/:cpf')
  async buscar(
    @Param('cpf') cpf: string,
    @Query('searchInput') searchInput: string,
  ): Promise<Address[]> {
    return this.addressesService.buscar(cpf, searchInput);
  }
}

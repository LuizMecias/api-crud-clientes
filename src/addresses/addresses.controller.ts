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

  @Get('list/:id')
  async listAllById(@Param('id') id: number): Promise<Address[]> {
    return this.addressesService.listAllById(id);
  }

  @Post('register')
  async register(@Body() data: CreateAddressDto): Promise<ResultadoDto> {
    return this.addressesService.register(data);
  }

  @Put('update/:id')
  async update(
    @Param('id') id: number,
    @Body() data: UpdateAddressDto,
  ): Promise<ResultadoDto> {
    return this.addressesService.update(id, data);
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: number): Promise<ResultadoDto> {
    return this.addressesService.delete(id);
  }

  @Get('search/:id')
  async search(
    @Param('id') id: number,
    @Query('searchInput') searchInput: string,
  ): Promise<Address[]> {
    return this.addressesService.search(id, searchInput);
  }
}
